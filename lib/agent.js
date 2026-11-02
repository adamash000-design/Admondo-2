// Admondo personal agent: Claude tool-use loop shared by the local server and the Vercel function.
import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.CLAUDE_MODEL || "claude-opus-5-5";
const MAX_HISTORY = 40; // recent chat turns sent each request; older facts live in long-term memory

const client = new Anthropic();

// ---------- Agent tools ----------
const tools = [
  {
    name: "add_task",
    description: "Add a new task to the user's task list.",
    input_schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        due: { type: "string", description: "'today', 'tomorrow', or YYYY-MM-DD" },
        tag: { type: "string", description: "Short category label, e.g. 'עריכת וידאו'" },
        priority: { type: "string", enum: ["low", "medium", "high"] },
        projectId: { type: "string", description: "Optional id of an existing project" },
      },
      required: ["title"],
    },
  },
  {
    name: "complete_task",
    description: "Mark a task as done (or not done) by id.",
    input_schema: {
      type: "object",
      properties: { id: { type: "string" }, done: { type: "boolean" } },
      required: ["id"],
    },
  },
  {
    name: "delete_task",
    description: "Delete a task by id.",
    input_schema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
  },
  {
    name: "add_project",
    description: "Create a new project.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        icon: { type: "string", enum: ["film", "music", "code", "cap", "folder", "book", "briefcase", "heart"], description: "Icon: film=video, music, code=software, cap=learning, book, briefcase=work, heart=personal, folder=other" },
        progress: { type: "number", description: "0-100" },
      },
      required: ["name"],
    },
  },
  {
    name: "update_project",
    description: "Update a project's name, progress (0-100) or status by id.",
    input_schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        progress: { type: "number" },
        status: { type: "string", enum: ["active", "done"] },
      },
      required: ["id"],
    },
  },
  {
    name: "add_idea",
    description: "Save an idea to the user's ideas list.",
    input_schema: { type: "object", properties: { text: { type: "string" } }, required: ["text"] },
  },
  {
    name: "remember",
    description:
      "Save a durable fact about the user to long-term memory (preferences, goals, people, routines, important context). Use whenever the user shares something worth remembering in future conversations.",
    input_schema: { type: "object", properties: { fact: { type: "string" } }, required: ["fact"] },
  },
  {
    name: "forget",
    description: "Remove a fact from long-term memory by its id.",
    input_schema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
  },
];

const uid = () => Math.random().toString(36).slice(2, 10);

function resolveDue(due) {
  const d = new Date();
  if (!due || due === "today") return d.toISOString().slice(0, 10);
  if (due === "tomorrow") {
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }
  return /^\d{4}-\d{2}-\d{2}$/.test(due) ? due : d.toISOString().slice(0, 10);
}

function runTool(name, input, ctx) {
  const { state, memory } = ctx;
  switch (name) {
    case "add_task": {
      if (typeof input.title !== "string" || !input.title.trim()) return "error: title required";
      const task = {
        id: uid(),
        title: input.title.trim(),
        due: resolveDue(input.due),
        tag: input.tag || "",
        priority: input.priority || "medium",
        projectId: input.projectId || null,
        done: false,
        createdAt: Date.now(),
      };
      state.tasks.unshift(task);
      return `added task ${task.id}`;
    }
    case "complete_task": {
      const t = state.tasks.find((x) => x.id === input.id);
      if (!t) return "error: task not found";
      t.done = input.done !== false;
      t.doneAt = t.done ? Date.now() : null;
      return `task ${t.id} done=${t.done}`;
    }
    case "delete_task": {
      const before = state.tasks.length;
      state.tasks = state.tasks.filter((x) => x.id !== input.id);
      return before === state.tasks.length ? "error: task not found" : "deleted";
    }
    case "add_project": {
      const p = {
        id: uid(),
        name: String(input.name || "").trim() || "פרויקט חדש",
        icon: input.icon || "folder",
        progress: Math.max(0, Math.min(100, Number(input.progress) || 0)),
        status: "active",
        updatedAt: Date.now(),
      };
      state.projects.unshift(p);
      return `added project ${p.id}`;
    }
    case "update_project": {
      const p = state.projects.find((x) => x.id === input.id);
      if (!p) return "error: project not found";
      if (input.name) p.name = input.name;
      if (input.progress !== undefined) p.progress = Math.max(0, Math.min(100, Number(input.progress) || 0));
      if (input.status) p.status = input.status;
      if (p.progress >= 100) p.status = "done";
      p.updatedAt = Date.now();
      return `updated project ${p.id}`;
    }
    case "add_idea": {
      state.ideas.unshift({ id: uid(), text: String(input.text || ""), createdAt: Date.now() });
      return "idea saved";
    }
    case "remember": {
      const fact = String(input.fact || "").trim();
      if (!fact) return "error: empty fact";
      memory.push({ id: uid(), fact, createdAt: Date.now() });
      return "remembered";
    }
    case "forget": {
      const i = memory.findIndex((m) => m.id === input.id);
      if (i === -1) return "error: memory not found";
      memory.splice(i, 1);
      return "forgotten";
    }
    default:
      return `error: unknown tool ${name}`;
  }
}

// Stable instructions first (cacheable); per-request snapshot goes in a second block.
const SYSTEM_PROMPT = `You are "אדמונדו", the user's personal productivity agent inside a Hebrew productivity app (tasks, projects, ideas, focus timer).
- Reply in the user's language (usually Hebrew), warm and concise. Plain text with short lists is fine; no markdown tables.
- You can act on the app with your tools: add/complete/delete tasks, create/update projects, save ideas. When the user asks for something actionable, do it, then briefly confirm what you did.
- Memory: you have long-term memory. Whenever the user shares a lasting fact (name, goals, preferences, routines, people, deadlines), call "remember" with a short third-person fact. Don't store trivia or duplicates. Use "forget" if the user asks to forget something or a fact becomes outdated.
- Use the memory and the app snapshot to personalise answers: plan the day, prioritise, suggest next steps, break projects into tasks.
- Refer to tasks/projects by name, never show raw ids to the user.`;

function snapshot(state, memory, now) {
  return `Current date/time: ${now}

Long-term memory about the user:
${memory.length ? memory.map((m) => `- [${m.id}] ${m.fact}`).join("\n") : "(empty)"}

App snapshot (JSON):
${JSON.stringify({
  tasks: state.tasks.map(({ id, title, due, tag, priority, done, projectId }) => ({ id, title, due, tag, priority, done, projectId })),
  projects: state.projects.map(({ id, name, progress, status }) => ({ id, name, progress, status })),
  ideas: state.ideas.slice(0, 20).map(({ text }) => text),
})}`;
}

export async function chat({ messages, state, memory, now }) {
  const ctx = {
    state: {
      tasks: Array.isArray(state?.tasks) ? state.tasks : [],
      projects: Array.isArray(state?.projects) ? state.projects : [],
      ideas: Array.isArray(state?.ideas) ? state.ideas : [],
    },
    memory: Array.isArray(memory) ? memory : [],
  };

  // Rebuild conversation from text-only history (append-only, valid alternation).
  const convo = [];
  for (const m of (messages || []).slice(-MAX_HISTORY)) {
    if (!m || !["user", "assistant"].includes(m.role) || !m.content) continue;
    const last = convo[convo.length - 1];
    if (last && last.role === m.role) last.content += "\n\n" + m.content;
    else convo.push({ role: m.role, content: String(m.content) });
  }
  while (convo.length && convo[0].role !== "user") convo.shift();
  if (!convo.length) throw new Error("no user message");

  const actions = [];
  for (let i = 0; i < 8; i++) {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "medium" },
      system: [
        { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
        { type: "text", text: snapshot(ctx.state, ctx.memory, now || new Date().toString()) },
      ],
      tools,
      messages: convo,
    });

    if (response.stop_reason === "refusal") {
      return { reply: "מצטער, אני לא יכול לעזור עם זה.", ...ctx, actions };
    }

    convo.push({ role: "assistant", content: response.content });

    const toolUses = response.content.filter((b) => b.type === "tool_use");
    if (response.stop_reason === "pause_turn") continue;
    if (!toolUses.length) {
      const reply = response.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();
      return { reply: reply || "בוצע ✅", ...ctx, actions };
    }

    const results = toolUses.map((tu) => {
      let out;
      try {
        out = runTool(tu.name, tu.input || {}, ctx);
      } catch (e) {
        out = `error: ${e.message}`;
      }
      actions.push({ tool: tu.name, input: tu.input, result: out });
      return { type: "tool_result", tool_use_id: tu.id, content: out, is_error: out.startsWith("error") };
    });
    convo.push({ role: "user", content: results });
  }
  return { reply: "עשיתי כמה פעולות, אבל לא סיימתי – נסה לנסח שוב.", ...ctx, actions };
}

// Map SDK errors to an HTTP status + user-facing Hebrew message.
export function errorResponse(err) {
  let status = 500;
  let msg = err.message;
  if (err instanceof Anthropic.AuthenticationError || /authentication method/i.test(msg)) {
    status = 401;
    msg = "חסר מפתח API תקין – הגדר ANTHROPIC_API_KEY בשרת.";
  } else if (err instanceof Anthropic.RateLimitError) {
    status = 429;
    msg = "יותר מדי בקשות, נסה שוב בעוד רגע.";
  } else if (err instanceof Anthropic.APIConnectionError) {
    status = 502;
    msg = "אין חיבור לשרת ה-AI.";
  } else if (err instanceof Anthropic.APIError) {
    status = err.status || 500;
  }
  return { status, msg };
}
