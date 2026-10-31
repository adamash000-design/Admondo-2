"use strict";

/* ================= Storage ================= */
const KEY = "admondo:v1";
const uid = () => Math.random().toString(36).slice(2, 10);
const todayISO = (d = new Date()) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};

function seed() {
  const t = todayISO();
  const tm = todayISO(new Date(Date.now() + 864e5));
  const p1 = uid(), p2 = uid(), p3 = uid(), p4 = uid();
  return {
    user: { name: "אדם", avatar: "🧑" },
    tasks: [
      { id: uid(), title: "עריכת סרטון יום הולדת", due: t, tag: "עריכת וידאו", priority: "high", projectId: p1, done: false, createdAt: Date.now() },
      { id: uid(), title: "ללמוד AI – שיעור 3", due: tm, tag: "למידה", priority: "medium", projectId: p4, done: false, createdAt: Date.now() },
      { id: uid(), title: "להכין מצגת לבית ספר", due: t, tag: "בית ספר", priority: "medium", projectId: null, done: true, doneAt: Date.now(), createdAt: Date.now() },
    ],
    projects: [
      { id: p1, name: "סרטון יום הולדת לאבא", icon: "🎬", progress: 75, status: "active", updatedAt: Date.now() },
      { id: p2, name: "שיר חדש ללהקה", icon: "🎵", progress: 40, status: "active", updatedAt: Date.now() - 864e5 },
      { id: p3, name: "פיתוח אפליקציה", icon: "💻", progress: 20, status: "active", updatedAt: Date.now() - 3 * 864e5 },
      { id: p4, name: "לימוד AI מתקדם", icon: "🎓", progress: 60, status: "active", updatedAt: Date.now() - 5 * 864e5 },
    ],
    ideas: [],
    focusLog: [], // {date, minutes}
    chat: [],     // {role, content, acts?}
    memory: [],   // {id, fact, createdAt}
    settings: { focus: 25, short: 5, long: 15 },
  };
}

let S;
try { S = JSON.parse(localStorage.getItem(KEY)) || seed(); } catch { S = seed(); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
save();

/* ================= Helpers ================= */
const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const view = $("#view");
const tagClass = (tag) => "c" + ([...String(tag)].reduce((a, c) => a + c.charCodeAt(0), 0) % 4);

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "בוקר טוב";
  if (h < 17) return "צהריים טובים";
  if (h < 21) return "ערב טוב";
  return "לילה טוב";
}
function dueLabel(due) {
  if (!due) return "";
  const t = todayISO(), tm = todayISO(new Date(Date.now() + 864e5));
  if (due === t) return "היום";
  if (due === tm) return "מחר";
  if (due < t) return "באיחור";
  const [y, m, d] = due.split("-");
  return `${d}/${m}`;
}
function ago(ts) {
  const days = Math.floor((Date.now() - ts) / 864e5);
  if (days <= 0) return "היום";
  if (days === 1) return "אתמול";
  return `לפני ${days} ימים`;
}

/* ================= Router ================= */
let route = "home";
let tabState = { tasks: "open", projects: "all", stats: "week" };
function go(r) {
  route = r;
  document.querySelectorAll("[data-nav]").forEach((b) => b.classList.toggle("on", b.dataset.nav === r));
  $("#agentFab").classList.toggle("hidden", r === "agent");
  render();
  window.scrollTo(0, 0);
}
function render() {
  view.className = "view" + (route === "agent" ? " chat-view" : "");
  const views = { home, projects, tasks, timer, stats, ideas, settings, agent };
  view.innerHTML = (views[route] || home)();
  if (route === "agent") afterAgent();
  if (route === "timer") paintTimer();
}

/* ================= Components ================= */
function taskRow(t) {
  return `<div class="task ${t.done ? "done" : ""}">
    <button class="check ${t.done ? "on" : ""}" data-act="toggle" data-id="${t.id}">${t.done ? "✓" : ""}</button>
    <div class="task-body">
      <div class="task-title">${esc(t.title)}</div>
      ${t.tag ? `<span class="chip ${tagClass(t.tag)}">${esc(t.tag)}</span>` : ""}
    </div>
    ${t.done ? `<span class="task-meta ok">הושלם ✓</span>` : `<span class="task-meta">📅 ${dueLabel(t.due)}</span>`}
    <button class="del" data-act="delTask" data-id="${t.id}" aria-label="מחק">✕</button>
  </div>`;
}
function projRow(p, big = false) {
  return `<div class="proj ${big ? "big" : ""}" data-act="editProject" data-id="${p.id}">
    <div class="picon">${esc(p.icon)}</div>
    <div class="proj-body">
      <div class="proj-name">${esc(p.name)}</div>
      ${big ? `<div class="proj-sub">עדכון אחרון: ${ago(p.updatedAt)}</div>` : ""}
      <div class="bar"><i style="width:${p.progress}%"></i></div>
    </div>
    <div class="pct">${p.progress}%</div>
  </div>`;
}

/* ================= Views ================= */
function home() {
  const open = S.tasks.filter((t) => !t.done);
  const doneToday = S.tasks.filter((t) => t.done && t.doneAt && todayISO(new Date(t.doneAt)) === todayISO());
  const list = [...open.slice(0, 3), ...doneToday.slice(0, Math.max(0, 3 - open.length))];
  return `
  <div class="hello">
    <div>
      <h1>${greeting()}, ${esc(S.user.name)} 👋</h1>
      <p>מוכן ליצור עוד יום מדהים?</p>
    </div>
    <div class="avatar">${esc(S.user.avatar)}</div>
  </div>

  <div class="card quick">
    <button data-go="timer"><div class="qicon qi-red">🎯</div>טיימר מיקוד</button>
    <button data-go="tasks"><div class="qicon qi-blue">☑️</div>משימות</button>
    <button data-go="projects"><div class="qicon qi-purple">📁</div>פרויקטים</button>
    <button data-go="ideas"><div class="qicon qi-green">💡</div>רעיונות</button>
  </div>

  <button class="agent-card" data-go="agent">
    <div class="qicon">✨</div>
    <div><b>העוזר האישי שלך</b><span>${S.chat.length ? "המשך את השיחה – אני זוכר הכל" : "שאל, תכנן, או בקש ממני להוסיף משימות"}</span></div>
  </button>

  <div class="card">
    <div class="card-head"><h3>המשימות שלי</h3><button class="link" data-go="tasks">הצג הכל</button></div>
    ${list.length ? list.map(taskRow).join("") : `<div class="empty">אין משימות פתוחות 🎉</div>`}
    <button class="add-row" data-act="newTask">＋ הוסף משימה</button>
  </div>

  <div class="card">
    <div class="card-head"><h3>הפרויקטים שלי</h3><button class="link" data-go="projects">הצג הכל</button></div>
    ${S.projects.filter((p) => p.status !== "done").slice(0, 3).map((p) => projRow(p)).join("") || `<div class="empty">אין פרויקטים פעילים</div>`}
  </div>

  <div class="card" data-go="stats" style="cursor:pointer">
    <div class="card-head"><h3>סטטיסטיקות</h3><span class="link">הצג הכל</span></div>
    ${statTiles("week")}
  </div>`;
}

function projects() {
  const f = tabState.projects;
  const list = S.projects.filter((p) => f === "all" || (f === "active" ? p.status !== "done" : p.status === "done"));
  return `
  <div class="topbar">
    <button class="icon-btn" data-go="home">›</button>
    <h2>הפרויקטים שלי</h2>
    <button class="icon-btn link" data-act="newProject">＋</button>
  </div>
  <div class="seg" data-seg="projects">
    ${[["all", "הכל"], ["active", "פעילים"], ["done", "הושלמו"]].map(([k, l]) => `<button data-val="${k}" class="${f === k ? "on" : ""}">${l}</button>`).join("")}
  </div>
  ${list.map((p) => projRow(p, true)).join("") || `<div class="empty">אין פרויקטים כאן</div>`}`;
}

function tasks() {
  const f = tabState.tasks;
  const t = todayISO();
  const list = S.tasks
    .filter((x) => (f === "open" ? !x.done : f === "today" ? x.due === t : x.done))
    .sort((a, b) => (a.due || "").localeCompare(b.due || ""));
  return `
  <div class="topbar">
    <button class="icon-btn" data-go="home">›</button>
    <h2>משימות</h2>
    <button class="icon-btn link" data-act="newTask">＋</button>
  </div>
  <div class="seg" data-seg="tasks">
    ${[["open", "פתוחות"], ["today", "היום"], ["done", "הושלמו"]].map(([k, l]) => `<button data-val="${k}" class="${f === k ? "on" : ""}">${l}</button>`).join("")}
  </div>
  ${list.map(taskRow).join("") || `<div class="empty">אין משימות כאן</div>`}
  <button class="add-row" data-act="newTask">＋ הוסף משימה</button>`;
}

function ideas() {
  return `
  <div class="topbar">
    <button class="icon-btn" data-go="home">›</button>
    <h2>רעיונות</h2>
    <button class="icon-btn link" data-act="newIdea">＋</button>
  </div>
  ${S.ideas.map((i) => `<div class="idea"><span>💡</span><p>${esc(i.text)}</p><button class="del" data-act="delIdea" data-id="${i.id}">✕</button></div>`).join("") || `<div class="empty">עוד אין רעיונות. רשום את הראשון!</div>`}
  <button class="add-row" data-act="newIdea">＋ רעיון חדש</button>`;
}

/* ---------- Stats ---------- */
function rangeDays(kind) { return kind === "week" ? 7 : kind === "month" ? 30 : 365; }
function statsFor(kind) {
  const days = rangeDays(kind);
  const since = Date.now() - days * 864e5;
  const prevSince = since - days * 864e5;
  const done = S.tasks.filter((t) => t.done && t.doneAt >= since).length;
  const donePrev = S.tasks.filter((t) => t.done && t.doneAt >= prevSince && t.doneAt < since).length;
  const sinceISO = todayISO(new Date(since)), prevISO = todayISO(new Date(prevSince));
  const mins = S.focusLog.filter((f) => f.date >= sinceISO).reduce((a, f) => a + f.minutes, 0);
  const minsPrev = S.focusLog.filter((f) => f.date >= prevISO && f.date < sinceISO).reduce((a, f) => a + f.minutes, 0);
  return { done, donePrev, hours: +(mins / 60).toFixed(1), hoursPrev: +(minsPrev / 60).toFixed(1), streak: streak() };
}
function streak() {
  const active = new Set([
    ...S.tasks.filter((t) => t.doneAt).map((t) => todayISO(new Date(t.doneAt))),
    ...S.focusLog.map((f) => f.date),
  ]);
  let n = 0, d = new Date();
  if (!active.has(todayISO(d))) d = new Date(Date.now() - 864e5);
  while (active.has(todayISO(d))) { n++; d = new Date(d.getTime() - 864e5); }
  return n;
}
const delta = (a, b) => (b ? `${a >= b ? "+" : ""}${Math.round(((a - b) / b) * 100)}%` : a ? "חדש" : "—");
function statTiles(kind) {
  const s = statsFor(kind);
  return `<div class="stats">
    <div class="stat">🔥<div class="n">${s.streak}</div><div class="l">ימים ברצף</div></div>
    <div class="stat">⏱️<div class="n">${s.hours}</div><div class="l">שעות מיקוד</div><div class="l" style="color:var(--green)">${delta(s.hours, s.hoursPrev)}</div></div>
    <div class="stat">🎯<div class="n">${s.done}</div><div class="l">משימות הושלמו</div><div class="l" style="color:var(--green)">${delta(s.done, s.donePrev)}</div></div>
  </div>`;
}
function stats() {
  const k = tabState.stats;
  const names = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];
  const cols = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5), iso = todayISO(d);
    const n = S.tasks.filter((t) => t.doneAt && todayISO(new Date(t.doneAt)) === iso).length
      + S.focusLog.filter((f) => f.date === iso).reduce((a, f) => a + f.minutes, 0) / 25;
    cols.push({ label: names[d.getDay()], n });
  }
  const max = Math.max(1, ...cols.map((c) => c.n));
  return `
  <div class="topbar">
    <button class="icon-btn" data-go="home">›</button>
    <h2>סטטיסטיקות</h2>
    <span style="width:38px"></span>
  </div>
  <div class="seg" data-seg="stats">
    ${[["week", "שבוע"], ["month", "חודש"], ["year", "שנה"]].map(([v, l]) => `<button data-val="${v}" class="${k === v ? "on" : ""}">${l}</button>`).join("")}
  </div>
  ${statTiles(k)}
  <div class="card">
    <div class="card-head"><h3>פעילות ב-7 הימים האחרונים</h3></div>
    <div class="chart">${cols.map((c) => `<div class="col"><div class="b" style="height:${(c.n / max) * 100}%"></div><div class="d">${c.label}</div></div>`).join("")}</div>
  </div>`;
}

/* ---------- Focus timer ---------- */
const T = { mode: "focus", left: null, endAt: null, iv: null };
const modeMins = () => S.settings[T.mode];
function timer() {
  if (T.left === null) T.left = modeMins() * 60;
  return `
  <div class="topbar">
    <button class="icon-btn" data-go="stats">📊</button>
    <h2>טיימר מיקוד</h2>
    <button class="icon-btn" data-go="settings">⚙️</button>
  </div>
  <div class="seg" data-seg="timer">
    ${[["focus", "מיקוד"], ["short", "הפסקה קצרה"], ["long", "הפסקה ארוכה"]].map(([v, l]) => `<button data-val="${v}" class="${T.mode === v ? "on" : ""}">${l}</button>`).join("")}
  </div>
  <div class="ring-wrap">
    <svg viewBox="0 0 120 120">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#5b8cff"/></linearGradient></defs>
      <circle cx="60" cy="60" r="54" stroke="#222a44" stroke-width="5" fill="none"/>
      <circle id="ring" cx="60" cy="60" r="54" stroke="url(#g)" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="339.3" stroke-dashoffset="0"/>
    </svg>
    <div class="ring-center"><div><div class="time" id="time"></div><div class="sub" id="tsub"></div></div></div>
  </div>
  <div class="controls">
    <button class="ctrl" data-act="tReset" aria-label="איפוס">↻</button>
    <button class="ctrl play" data-act="tToggle" id="tplay" aria-label="הפעל">▶</button>
    <button class="ctrl" data-act="tStop" aria-label="עצור">■</button>
  </div>`;
}
function paintTimer() {
  const el = $("#time");
  if (!el) return;
  if (T.endAt) T.left = Math.max(0, Math.round((T.endAt - Date.now()) / 1000));
  const m = String(Math.floor(T.left / 60)).padStart(2, "0"), s = String(T.left % 60).padStart(2, "0");
  el.textContent = `${m}:${s}`;
  $("#tsub").textContent = T.endAt ? (T.mode === "focus" ? "🌱 בפוקוס..." : "☕ הפסקה") : (T.mode === "focus" ? "🌱 התחל להתמקד" : "☕ זמן הפסקה");
  $("#tplay").textContent = T.endAt ? "❚❚" : "▶";
  const total = modeMins() * 60;
  $("#ring").setAttribute("stroke-dashoffset", String(339.3 * (1 - T.left / total)));
}
function tick() {
  if (!T.endAt) return;
  T.left = Math.max(0, Math.round((T.endAt - Date.now()) / 1000));
  if (T.left === 0) {
    clearInterval(T.iv); T.endAt = null;
    if (T.mode === "focus") { S.focusLog.push({ date: todayISO(), minutes: S.settings.focus }); save(); }
    try { navigator.vibrate?.(300); } catch {}
    alert(T.mode === "focus" ? "כל הכבוד! סיימת סשן מיקוד 🎉" : "ההפסקה נגמרה – חוזרים לעבודה 💪");
    T.left = modeMins() * 60;
  }
  if (route === "timer") paintTimer();
}

/* ---------- Settings ---------- */
function settings() {
  return `
  <div class="topbar"><span style="width:38px"></span><h2>הגדרות</h2><span style="width:38px"></span></div>
  <div class="card">
    <div class="card-head"><h3>פרופיל</h3></div>
    <div class="field"><label>שם</label><input id="sName" value="${esc(S.user.name)}" /></div>
    <div class="field"><label>אווטאר</label><input id="sAvatar" value="${esc(S.user.avatar)}" maxlength="4" /></div>
  </div>
  <div class="card">
    <div class="card-head"><h3>טיימר (דקות)</h3></div>
    <div class="field"><label>מיקוד</label><input id="sFocus" type="number" min="1" max="180" value="${S.settings.focus}" /></div>
    <div class="field"><label>הפסקה קצרה</label><input id="sShort" type="number" min="1" max="60" value="${S.settings.short}" /></div>
    <div class="field"><label>הפסקה ארוכה</label><input id="sLong" type="number" min="1" max="90" value="${S.settings.long}" /></div>
  </div>
  <button class="btn" data-act="saveSettings">שמור</button>
  <div class="card" style="margin-top:18px">
    <div class="card-head"><h3>🧠 מה העוזר זוכר עליך</h3></div>
    ${S.memory.map((m) => `<div class="memory-item"><span>${esc(m.fact)}</span><button class="del" data-act="forget" data-id="${m.id}">✕</button></div>`).join("") || `<div class="empty">העוזר עדיין לא שמר עליך זיכרונות</div>`}
  </div>
  <div class="row">
    <button class="btn ghost" data-act="clearChat">נקה שיחה</button>
    <button class="btn danger" data-act="resetAll">איפוס כל הנתונים</button>
  </div>`;
}

/* ---------- Agent ---------- */
let sending = false;
function agent() {
  const msgs = S.chat.map((m) => `<div class="msg ${m.role} ${m.err ? "err" : ""}">${esc(m.content)}${m.acts?.length ? `<div class="acts">⚡ ${m.acts.map(esc).join(" · ")}</div>` : ""}</div>`).join("");
  return `
  <div class="topbar">
    <button class="icon-btn" data-go="home">›</button>
    <h2>✨ העוזר האישי</h2>
    <button class="icon-btn" data-go="settings" title="זיכרון">🧠</button>
  </div>
  <div class="messages" id="msgs">
    ${msgs || `<div class="msg assistant">היי ${esc(S.user.name)}! אני העוזר האישי שלך 🤖\nאני זוכר את השיחות שלנו, יכול להוסיף משימות ופרויקטים, לתכנן לך את היום ולעזור עם רעיונות. במה נתחיל?</div>`}
    ${sending ? `<div class="typing">חושב...</div>` : ""}
  </div>
  ${S.chat.length ? "" : `<div class="suggest">
    ${["תכנן לי את היום", "הוסף משימה: להתקשר לסבתא מחר", "מה הכי דחוף עכשיו?", "תפרק לי את פיתוח האפליקציה למשימות"].map((s) => `<button data-act="suggest">${s}</button>`).join("")}
  </div>`}
  <form class="composer" id="composer">
    <textarea id="input" rows="1" placeholder="כתוב הודעה..."></textarea>
    <button class="send" ${sending ? "disabled" : ""} aria-label="שלח">➤</button>
  </form>`;
}
function afterAgent() {
  const box = $("#msgs");
  box.scrollTop = box.scrollHeight;
  const input = $("#input");
  input.addEventListener("input", () => { input.style.height = "auto"; input.style.height = input.scrollHeight + "px"; });
  input.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(input.value); } });
  $("#composer").addEventListener("submit", (e) => { e.preventDefault(); sendMsg(input.value); });
  if (!sending) input.focus();
}
const ACT_LABEL = { add_task: "נוספה משימה", complete_task: "עודכנה משימה", delete_task: "נמחקה משימה", add_project: "נוסף פרויקט", update_project: "עודכן פרויקט", add_idea: "נשמר רעיון", remember: "נשמר בזיכרון", forget: "נמחק מהזיכרון" };
async function sendMsg(text) {
  text = text.trim();
  if (!text || sending) return;
  S.chat.push({ role: "user", content: text });
  sending = true; save(); render();
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: S.chat.filter((m) => !m.err).map(({ role, content }) => ({ role, content })),
        state: { tasks: S.tasks, projects: S.projects, ideas: S.ideas },
        memory: S.memory,
        now: new Date().toLocaleString("he-IL", { dateStyle: "full", timeStyle: "short" }) + ` (ISO date ${todayISO()})`,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "שגיאה");
    S.tasks = data.state.tasks; S.projects = data.state.projects; S.ideas = data.state.ideas; S.memory = data.memory;
    const acts = (data.actions || []).filter((a) => !String(a.result).startsWith("error")).map((a) => ACT_LABEL[a.tool] || a.tool);
    S.chat.push({ role: "assistant", content: data.reply, acts });
  } catch (e) {
    S.chat.push({ role: "assistant", content: "⚠️ " + e.message, err: true });
  }
  sending = false; save();
  if (route === "agent") render();
}

/* ================= Sheets ================= */
const sheet = $("#sheet");
function openSheet(html) { sheet.innerHTML = `<div class="sheet-inner">${html}</div>`; sheet.classList.remove("hidden"); }
function closeSheet() { sheet.classList.add("hidden"); sheet.innerHTML = ""; }
sheet.addEventListener("click", (e) => { if (e.target === sheet) closeSheet(); });

function sheetTask() {
  openSheet(`
  <div class="topbar"><button class="link" data-act="close">ביטול</button><h2>משימה חדשה</h2><button class="link" data-act="saveTask">שמור</button></div>
  <div class="field full"><input id="fTitle" placeholder="מה צריך לעשות?" /></div>
  <div class="field"><label>📁 פרויקט</label><select id="fProj"><option value="">בחר פרויקט</option>${S.projects.map((p) => `<option value="${p.id}">${esc(p.icon)} ${esc(p.name)}</option>`).join("")}</select></div>
  <div class="field"><label>📅 תאריך</label><input id="fDue" type="date" value="${todayISO()}" /></div>
  <div class="field"><label>🚩 עדיפות</label><select id="fPri"><option value="low">נמוכה</option><option value="medium" selected>בינונית</option><option value="high">גבוהה</option></select></div>
  <div class="field"><label>🏷️ תגית</label><input id="fTag" placeholder="למשל: למידה" /></div>
  <div class="field full"><textarea id="fNote" rows="2" placeholder="הוסף הערה (לא חובה)"></textarea></div>`);
  setTimeout(() => $("#fTitle")?.focus(), 50);
}
function sheetProject(p) {
  openSheet(`
  <div class="topbar"><button class="link" data-act="close">ביטול</button><h2>${p ? "עריכת פרויקט" : "פרויקט חדש"}</h2><button class="link" data-act="saveProject" data-id="${p?.id || ""}">שמור</button></div>
  <div class="field"><label>שם</label><input id="pName" value="${esc(p?.name || "")}" placeholder="שם הפרויקט" /></div>
  <div class="field"><label>אייקון</label><input id="pIcon" value="${esc(p?.icon || "📁")}" maxlength="4" /></div>
  <div class="field"><label>התקדמות <b id="pPv">${p?.progress ?? 0}%</b></label><input id="pProg" type="range" min="0" max="100" step="5" value="${p?.progress ?? 0}" oninput="document.getElementById('pPv').textContent=this.value+'%'" /></div>
  ${p ? `<button class="btn danger" data-act="delProject" data-id="${p.id}">מחק פרויקט</button>` : ""}`);
}
function sheetIdea() {
  openSheet(`
  <div class="topbar"><button class="link" data-act="close">ביטול</button><h2>רעיון חדש</h2><button class="link" data-act="saveIdea">שמור</button></div>
  <div class="field full"><textarea id="iText" rows="4" placeholder="מה הרעיון?"></textarea></div>`);
  setTimeout(() => $("#iText")?.focus(), 50);
}
function sheetAdd() {
  openSheet(`
  <div class="topbar"><span style="width:38px"></span><h2>מה להוסיף?</h2><button class="link" data-act="close">סגור</button></div>
  <button class="btn" style="margin-bottom:8px" data-act="newTask">☑️ משימה</button>
  <button class="btn ghost" style="margin-bottom:8px" data-act="newProject">📁 פרויקט</button>
  <button class="btn ghost" style="margin-bottom:8px" data-act="newIdea">💡 רעיון</button>
  <button class="btn ghost" data-act="openAgent">✨ לבקש מהעוזר</button>`);
}

/* ================= Actions ================= */
const actions = {
  toggle(id) { const t = S.tasks.find((x) => x.id === id); if (!t) return; t.done = !t.done; t.doneAt = t.done ? Date.now() : null; },
  delTask(id) { S.tasks = S.tasks.filter((x) => x.id !== id); },
  newTask() { sheetTask(); return false; },
  newProject() { sheetProject(); return false; },
  newIdea() { sheetIdea(); return false; },
  openAgent() { closeSheet(); go("agent"); return false; },
  editProject(id) { sheetProject(S.projects.find((p) => p.id === id)); return false; },
  close() { closeSheet(); return false; },
  saveTask() {
    const title = $("#fTitle").value.trim();
    if (!title) return false;
    S.tasks.unshift({ id: uid(), title, due: $("#fDue").value || todayISO(), tag: $("#fTag").value.trim(), priority: $("#fPri").value, projectId: $("#fProj").value || null, note: $("#fNote").value.trim(), done: false, createdAt: Date.now() });
    closeSheet();
  },
  saveProject(id) {
    const name = $("#pName").value.trim();
    if (!name) return false;
    const progress = Number($("#pProg").value), icon = $("#pIcon").value.trim() || "📁";
    const status = progress >= 100 ? "done" : "active";
    const p = S.projects.find((x) => x.id === id);
    if (p) Object.assign(p, { name, icon, progress, status, updatedAt: Date.now() });
    else S.projects.unshift({ id: uid(), name, icon, progress, status, updatedAt: Date.now() });
    closeSheet();
  },
  delProject(id) { if (!confirm("למחוק את הפרויקט?")) return false; S.projects = S.projects.filter((p) => p.id !== id); closeSheet(); },
  saveIdea() { const text = $("#iText").value.trim(); if (!text) return false; S.ideas.unshift({ id: uid(), text, createdAt: Date.now() }); closeSheet(); },
  delIdea(id) { S.ideas = S.ideas.filter((i) => i.id !== id); },
  forget(id) { S.memory = S.memory.filter((m) => m.id !== id); },
  clearChat() { if (!confirm("לנקות את היסטוריית השיחה? (הזיכרון לטווח ארוך יישמר)")) return false; S.chat = []; },
  resetAll() { if (!confirm("לאפס את כל הנתונים?")) return false; S = seed(); },
  saveSettings() {
    S.user.name = $("#sName").value.trim() || S.user.name;
    S.user.avatar = $("#sAvatar").value.trim() || S.user.avatar;
    S.settings.focus = Math.max(1, +$("#sFocus").value || 25);
    S.settings.short = Math.max(1, +$("#sShort").value || 5);
    S.settings.long = Math.max(1, +$("#sLong").value || 15);
    if (!T.endAt) T.left = null;
    alert("נשמר ✓");
  },
  suggest(_, el) { sendMsg(el.textContent); return false; },
  tToggle() {
    if (T.endAt) { T.left = Math.max(0, Math.round((T.endAt - Date.now()) / 1000)); T.endAt = null; clearInterval(T.iv); }
    else { T.endAt = Date.now() + T.left * 1000; T.iv = setInterval(tick, 250); }
    paintTimer(); return false;
  },
  tReset() { clearInterval(T.iv); T.endAt = null; T.left = modeMins() * 60; paintTimer(); return false; },
  tStop() {
    if (T.endAt && T.mode === "focus") {
      const mins = Math.floor((S.settings.focus * 60 - Math.round((T.endAt - Date.now()) / 1000)) / 60);
      if (mins > 0) S.focusLog.push({ date: todayISO(), minutes: mins });
    }
    clearInterval(T.iv); T.endAt = null; T.left = modeMins() * 60; save(); paintTimer(); return false;
  },
};

document.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-nav]");
  if (nav) return go(nav.dataset.nav);
  const g = e.target.closest("[data-go]");
  if (g && !e.target.closest("[data-act]")) { closeSheet(); return go(g.dataset.go); }
  const segBtn = e.target.closest("[data-seg] button");
  if (segBtn) {
    const seg = segBtn.closest("[data-seg]").dataset.seg;
    if (seg === "timer") {
      if (T.endAt && !confirm("להחליף מצב ולעצור את הטיימר?")) return;
      clearInterval(T.iv); T.endAt = null; T.mode = segBtn.dataset.val; T.left = modeMins() * 60;
    } else tabState[seg] = segBtn.dataset.val;
    return render();
  }
  const a = e.target.closest("[data-act]");
  if (a && actions[a.dataset.act]) {
    e.preventDefault();
    const r = actions[a.dataset.act](a.dataset.id, a);
    if (r !== false) { save(); render(); }
  }
});
$("#addBtn").addEventListener("click", sheetAdd);
$("#agentFab").addEventListener("click", () => go("agent"));

go("home");
