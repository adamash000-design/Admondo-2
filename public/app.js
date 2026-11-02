"use strict";

/* ================= Icons ================= */
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  checkCircle: '<circle cx="12" cy="12" r="9.5"/><path class="nofill" d="m8 12.2 2.8 2.8L16 9.5"/>',
  gear: '<path d="M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.3a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4a2 2 0 0 0 .7 2.7l.2.1a2 2 0 0 1 1 1.7v.5a2 2 0 0 1-1 1.8l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.3a2 2 0 0 1 1 1.7V20a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.3a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.8v-.5a2 2 0 0 1 1-1.7l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.3a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2z"/><circle class="nofill" cx="12" cy="12" r="3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  chev: '<path d="m9 18 6-6-6-6"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01"/>',
  flag: '<path d="M5 21V4M5 4h11.5l-2 4 2 4H5"/>',
  more: '<circle cx="5.5" cy="12" r=".6"/><circle cx="12" cy="12" r=".6"/><circle cx="18.5" cy="12" r=".6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  okCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.2 12.3 2.6 2.6 5-5.4"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  film: '<path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z"/><path d="m6.2 5.3 3.1 3.9M12.4 3.4l3.1 4M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  cap: '<path d="M21.4 10.9a1 1 0 0 0 0-1.8l-8.6-3.9a2 2 0 0 0-1.7 0L2.6 9.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.7 0z"/><path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  briefcase: '<rect x="2.5" y="7" width="19" height="13.5" rx="2.5"/><path d="M16 20.5V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v15.5"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
  bulbLine: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
  sparkles: '<path d="M9.9 15.5a2 2 0 0 0-1.4-1.4L2.4 12.5a.5.5 0 0 1 0-1l6.1-1.6a2 2 0 0 0 1.4-1.4l1.6-6.1a.5.5 0 0 1 1 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-1 0z"/>',
  chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-4M12 17V9M16 17v-6"/>',
  reset: '<path d="M21 12a9 9 0 1 1-2.6-6.4L21 8"/><path d="M21 3v5h-5"/>',
  play: '<path d="M8 5.1v13.8a1 1 0 0 0 1.5.9l11-6.9a1 1 0 0 0 0-1.7l-11-6.9A1 1 0 0 0 8 5.1z"/>',
  pause: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
  fire: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4.1 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="2"/>',
  send: '<path d="M14.5 21.7a.5.5 0 0 0 .9 0L22 2.6a.5.5 0 0 0-.6-.6L2.3 8.6a.5.5 0 0 0 0 .9l7.9 3.2a2 2 0 0 1 1.1 1.1zM21.9 2.1 10.9 13.1"/>',
};
const ic = (name, style = "") => `<svg class="ic" viewBox="0 0 24 24"${style ? ` style="${style}"` : ""}>${ICONS[name] || ""}</svg>`;

/* Colored glossy quick-action glyphs (as in the mockup) */
const Q = {
  target: '<svg viewBox="0 0 34 34"><circle cx="17" cy="17" r="13" fill="#fff"/><circle cx="17" cy="17" r="10" fill="#e8454f"/><circle cx="17" cy="17" r="7" fill="#fff"/><circle cx="17" cy="17" r="4" fill="#e8454f"/><path d="M17 17 27 7" stroke="#2b2f3a" stroke-width="2" stroke-linecap="round"/><path d="m25 5 3 1 1 3-3 1z" fill="#ffc94a"/></svg>',
  check: '<svg viewBox="0 0 34 34"><rect x="7" y="7" width="20" height="20" rx="5" fill="none" stroke="#fff" stroke-width="2.6"/><path d="m12 17.3 3.6 3.6 6.8-7.6" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  folder: '<svg viewBox="0 0 34 34"><path d="M5 10a3 3 0 0 1 3-3h6l3 3h9a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z" fill="#b6a3ff"/><path d="M5 14h24v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z" fill="#cdbfff"/></svg>',
  bulb: '<svg viewBox="0 0 34 34"><path d="M17 4a9.5 9.5 0 0 0-5.6 17.2c.8.6 1.3 1.6 1.3 2.6V25h8.6v-1.2c0-1 .5-2 1.3-2.6A9.5 9.5 0 0 0 17 4z" fill="#8fe3a0"/><rect x="13" y="26.5" width="8" height="2.4" rx="1.2" fill="#d9f7df"/><rect x="14.2" y="30" width="5.6" height="2" rx="1" fill="#d9f7df"/><path d="M14.5 15.5 17 18l2.5-2.5M17 18v6" fill="none" stroke="#1c5a2c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

/* Project icon → tile color */
const PICONS = { film: "purple", music: "red", code: "blue", cap: "orange", folder: "purple", book: "green", briefcase: "blue", heart: "red" };
const EMOJI2ICON = { "🎬": "film", "🎵": "music", "🎶": "music", "💻": "code", "🎓": "cap", "📚": "book", "💼": "briefcase", "❤️": "heart" };
const projIcon = (p) => (PICONS[p.icon] ? ic(p.icon) : `<span>${esc(p.icon || "")}</span>`);
const projColor = (p) => "c-" + (PICONS[p.icon] || "purple");

/* ================= Storage ================= */
const KEY = "admondo:v1";
const uid = () => Math.random().toString(36).slice(2, 10);
const todayISO = (d = new Date()) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

function seed() {
  const t = todayISO(), tm = todayISO(new Date(Date.now() + 864e5));
  const p1 = uid(), p2 = uid(), p3 = uid(), p4 = uid();
  return {
    user: { name: "אדם", avatar: "👦🏻" },
    tasks: [
      { id: uid(), title: "עריכת סרטון יום הולדת", due: t, tag: "עריכת וידאו", priority: "high", projectId: p1, done: false, createdAt: Date.now() },
      { id: uid(), title: "ללמוד AI – שיעור 3", due: tm, tag: "למידה", priority: "medium", projectId: p4, done: false, createdAt: Date.now() },
      { id: uid(), title: "להכין מצגת לבית ספר", due: t, tag: "בית ספר", priority: "medium", projectId: null, done: true, doneAt: Date.now(), createdAt: Date.now() },
    ],
    projects: [
      { id: p1, name: "סרטון יום הולדת לאבא", icon: "film", progress: 75, status: "active", updatedAt: Date.now() },
      { id: p2, name: "שיר חדש ללהקה", icon: "music", progress: 40, status: "active", updatedAt: Date.now() - 864e5 },
      { id: p3, name: "פיתוח אפליקציה", icon: "code", progress: 20, status: "active", updatedAt: Date.now() - 3 * 864e5 },
      { id: p4, name: "לימוד AI מתקדם", icon: "cap", progress: 60, status: "active", updatedAt: Date.now() - 5 * 864e5 },
    ],
    ideas: [],
    focusLog: [],
    chat: [],
    memory: [],
    settings: { focus: 25, short: 5, long: 15 },
  };
}

let S;
try { S = JSON.parse(localStorage.getItem(KEY)) || seed(); } catch { S = seed(); }
S.projects.forEach((p) => { if (EMOJI2ICON[p.icon]) p.icon = EMOJI2ICON[p.icon]; else if (p.icon === "📁") p.icon = "folder"; });
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
save();

/* ================= Helpers ================= */
const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const view = $("#view");
const TAG_COLORS = { "עריכת וידאו": "purple", "למידה": "green", "בית ספר": "orange" };
const tagColor = (tag) => TAG_COLORS[tag] || ["purple", "green", "orange", "blue"][[...String(tag)].reduce((a, c) => a + c.charCodeAt(0), 0) % 4];
const PRI = { low: "נמוכה", medium: "בינונית", high: "גבוהה" };

function greeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "בוקר טוב";
  if (h >= 12 && h < 17) return "צהריים טובים";
  if (h >= 17 && h < 21) return "ערב טוב";
  return "לילה טוב";
}
function dueLabel(due) {
  const t = todayISO(), tm = todayISO(new Date(Date.now() + 864e5));
  if (!due || due === t) return "היום";
  if (due === tm) return "מחר";
  if (due < t) return "באיחור";
  const [, m, d] = due.split("-");
  return `${+d}/${+m}`;
}
function ago(ts) {
  const days = Math.floor((Date.now() - ts) / 864e5);
  if (days <= 0) return "היום";
  if (days === 1) return "אתמול";
  return `לפני ${days} ימים`;
}

/* ================= Router ================= */
let route = "home";
const tabState = { tasks: "open", projects: "all", stats: "year" };
const TAB_OF = { projects: "projects", tasks: "tasks", settings: "settings" };
function go(r) {
  route = r;
  document.querySelectorAll("[data-nav]").forEach((b) => b.classList.toggle("on", b.dataset.nav === (TAB_OF[r] || "home")));
  render();
  view.scrollTop = 0;
}
function render() {
  view.className = "view" + (route === "agent" ? " chat" : "");
  const views = { home, projects, tasks, timer, stats, ideas, settings, agent };
  view.innerHTML = (views[route] || home)();
  if (route === "agent") afterAgent();
  if (route === "timer") paintTimer();
}
const topbar = (left, title, right) => `<div class="topbar">${left || '<span class="spacer"></span>'}<h2>${title}</h2>${right || '<span class="spacer"></span>'}</div>`;
const backBtn = (to = "home") => `<button class="icon-btn" data-go="${to}" aria-label="חזרה">${ic("back")}</button>`;
const seg = (name, items, cur) => `<div class="seg" data-seg="${name}">${items.map(([k, l]) => `<button data-val="${k}" class="${cur === k ? "on" : ""}">${l}</button>`).join("")}</div>`;

/* ================= Components ================= */
function taskRow(t, withDelete = false) {
  const proj = S.projects.find((p) => p.id === t.projectId);
  const chip = t.tag || proj?.name || "";
  const late = !t.done && t.due && t.due < todayISO();
  return `<div class="task ${t.done ? "done" : ""}">
    <button class="check ${t.done ? "on" : ""}" data-act="toggle" data-id="${t.id}" aria-label="סמן">${t.done ? ic("check") : ""}</button>
    <div class="task-body">
      <div class="task-title t">${esc(t.title)}</div>
      ${chip ? `<span class="chip ${tagColor(chip)}">${esc(chip)}</span>` : ""}
    </div>
    ${t.done
      ? `<span class="task-meta ok"><span>הושלם</span>${ic("okCircle")}</span>`
      : `<span class="task-meta ${late ? "late" : ""}"><span>${dueLabel(t.due)}</span>${ic("calendar")}</span>`}
    ${withDelete ? `<button class="del" data-act="delTask" data-id="${t.id}" aria-label="מחק">${ic("x")}</button>` : ""}
  </div>`;
}
const projRow = (p) => `<button class="proj" data-act="editProject" data-id="${p.id}">
    <div class="ptile">${projIcon(p)}</div>
    <div class="proj-body">
      <div class="proj-name t">${esc(p.name)}</div>
      <div class="bar-row"><div class="bar"><i style="width:${p.progress}%"></i></div><span class="pct">${p.progress}%</span></div>
    </div>
  </button>`;
const projCard = (p) => `<div class="pcard">
    <div class="pcard-top">
      <div class="ptile ${projColor(p)}">${projIcon(p)}</div>
      <div class="proj-body">
        <div class="proj-name t">${esc(p.name)}</div>
        <div class="sub">עדכון אחרון: ${ago(p.updatedAt)}</div>
      </div>
      <button class="more" data-act="editProject" data-id="${p.id}" aria-label="אפשרויות">${ic("more")}</button>
    </div>
    <div class="bar-row"><div class="bar"><i style="width:${p.progress}%"></i></div><span class="pct">${p.progress}%</span></div>
  </div>`;

/* ================= Views ================= */
function home() {
  const open = S.tasks.filter((t) => !t.done);
  const doneRecent = S.tasks.filter((t) => t.done).sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));
  const list = open.slice(0, doneRecent.length ? 2 : 3);
  list.push(...doneRecent.slice(0, 3 - list.length));
  return `
  <div class="hello">
    <div>
      <h1><span>${greeting()}, ${esc(S.user.name)}</span><span class="wave">👋</span></h1>
      <p>מוכן ליצור עוד יום מדהים?</p>
    </div>
    <button class="avatar" data-go="agent" aria-label="העוזר האישי">${esc(S.user.avatar)}<span class="spark">${ic("sparkles")}</span></button>
  </div>

  <div class="card quick">
    <button data-go="timer"><div class="qtile qt-red">${Q.target}</div>טיימר מיקוד</button>
    <button data-go="tasks"><div class="qtile qt-blue">${Q.check}</div>משימות</button>
    <button data-go="projects"><div class="qtile qt-purple">${Q.folder}</div>פרויקטים</button>
    <button data-go="ideas"><div class="qtile qt-green">${Q.bulb}</div>רעיונות</button>
  </div>

  <div class="card">
    <div class="card-head"><h3>המשימות שלי</h3><button class="link" data-go="tasks">הצג הכל</button></div>
    ${list.length ? list.map((t) => taskRow(t)).join("") : `<div class="empty">אין משימות 🎉</div>`}
    <button class="add-row" data-act="newTask">${ic("plus")}<span>הוסף משימה</span></button>
  </div>

  <div class="card">
    <div class="card-head"><h3>הפרויקטים שלי</h3><button class="link" data-go="projects">הצג הכל</button></div>
    ${S.projects.filter((p) => p.status !== "done").slice(0, 3).map(projRow).join("") || `<div class="empty">אין פרויקטים פעילים</div>`}
  </div>`;
}

function projects() {
  const f = tabState.projects;
  const list = S.projects.filter((p) => f === "all" || (f === "active" ? p.status !== "done" : p.status === "done"));
  return `
  ${topbar(backBtn(), "הפרויקטים שלי", `<button class="icon-btn plain" data-act="newProject" aria-label="פרויקט חדש">${ic("plus")}</button>`)}
  ${seg("projects", [["all", "הכל"], ["active", "פעילים"], ["done", "הושלמו"]], f)}
  ${list.map(projCard).join("") || `<div class="empty">אין פרויקטים כאן</div>`}`;
}

function tasks() {
  const f = tabState.tasks, t = todayISO();
  const list = S.tasks
    .filter((x) => (f === "open" ? !x.done : f === "today" ? x.due === t : x.done))
    .sort((a, b) => (a.due || "").localeCompare(b.due || ""));
  return `
  ${topbar(backBtn(), "המשימות שלי", `<button class="icon-btn plain" data-act="newTask" aria-label="משימה חדשה">${ic("plus")}</button>`)}
  ${seg("tasks", [["open", "פתוחות"], ["today", "היום"], ["done", "הושלמו"]], f)}
  ${list.map((x) => taskRow(x, true)).join("") || `<div class="empty">אין משימות כאן</div>`}
  <button class="add-row" data-act="newTask">${ic("plus")}<span>הוסף משימה</span></button>`;
}

function ideas() {
  return `
  ${topbar(backBtn(), "רעיונות", `<button class="icon-btn plain" data-act="newIdea" aria-label="רעיון חדש">${ic("plus")}</button>`)}
  ${S.ideas.map((i) => `<div class="idea"><div class="ptile c-green">${ic("bulbLine")}</div><p>${esc(i.text)}</p><button class="del" data-act="delIdea" data-id="${i.id}">${ic("x")}</button></div>`).join("") || `<div class="empty">עוד אין רעיונות. רשום את הראשון!</div>`}
  <button class="add-row" data-act="newIdea">${ic("plus")}<span>רעיון חדש</span></button>`;
}

/* ---------- Stats ---------- */
const rangeDays = (k) => (k === "week" ? 7 : k === "month" ? 30 : 365);
function statsFor(kind) {
  const days = rangeDays(kind), since = Date.now() - days * 864e5, prevSince = since - days * 864e5;
  const done = S.tasks.filter((t) => t.done && t.doneAt >= since).length;
  const donePrev = S.tasks.filter((t) => t.done && t.doneAt >= prevSince && t.doneAt < since).length;
  const sinceISO = todayISO(new Date(since)), prevISO = todayISO(new Date(prevSince));
  const mins = S.focusLog.filter((f) => f.date >= sinceISO).reduce((a, f) => a + f.minutes, 0);
  const minsPrev = S.focusLog.filter((f) => f.date >= prevISO && f.date < sinceISO).reduce((a, f) => a + f.minutes, 0);
  return { done, donePrev, hours: +(mins / 60).toFixed(1), hoursPrev: +(minsPrev / 60).toFixed(1), streak: streak() };
}
function streak() {
  const active = new Set([...S.tasks.filter((t) => t.doneAt).map((t) => todayISO(new Date(t.doneAt))), ...S.focusLog.map((f) => f.date)]);
  let n = 0, d = new Date();
  if (!active.has(todayISO(d))) d = new Date(Date.now() - 864e5);
  while (active.has(todayISO(d))) { n++; d = new Date(d.getTime() - 864e5); }
  return n;
}
const delta = (a, b) => (b ? `${a >= b ? "+" : ""}${Math.round(((a - b) / b) * 100)}%` : a ? "+100%" : "—");
function stats() {
  const k = tabState.stats, s = statsFor(k);
  const names = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];
  // current week Sunday → Saturday
  const start = new Date(); start.setDate(start.getDate() - start.getDay());
  const cols = names.map((label, i) => {
    const iso = todayISO(new Date(start.getTime() + i * 864e5));
    const n = S.tasks.filter((t) => t.doneAt && todayISO(new Date(t.doneAt)) === iso).length
      + S.focusLog.filter((f) => f.date === iso).reduce((a, f) => a + f.minutes, 0) / 25;
    return { label, n };
  });
  const top = Math.max(6, Math.ceil(Math.max(...cols.map((c) => c.n)) / 2) * 2);
  return `
  ${topbar("", "סטטיסטיקות", `<button class="txt-btn end" data-done-all>הצג הכל</button>`)}
  ${seg("stats", [["year", "שנה"], ["month", "חודש"], ["week", "שבוע"]], k)}
  <div class="stats">
    <div class="stat">${ic("fire", "color:#ff8a3d")}<div class="n">${s.streak}</div><div class="l">ימים ברצף</div><div class="d">${s.streak ? "🔥 המשך כך" : "—"}</div></div>
    <div class="stat">${ic("clock", "color:#a77bff")}<div class="n">${s.hours}</div><div class="l">שעות מיקוד</div><div class="d">${delta(s.hours, s.hoursPrev)}</div></div>
    <div class="stat">${ic("target", "color:#ff5d73")}<div class="n">${s.done}</div><div class="l">משימות הושלמו</div><div class="d">${delta(s.done, s.donePrev)}</div></div>
  </div>
  <div class="chart-card">
    <div class="chart">
      <div class="yaxis">${[top, (top * 2) / 3, top / 3, 0].map((v) => `<span>${Math.round(v)}</span>`).join("")}</div>
      <div class="cols">${cols.map((c) => `<div class="col"><div class="b ${c.n ? "" : "zero"}" style="height:calc(${(c.n / top).toFixed(3)} * (100% - 22px))"></div><div class="dl">${c.label}</div></div>`).join("")}</div>
    </div>
  </div>`;
}

/* ---------- Focus timer ---------- */
const ARC = 339.29 * (300 / 360);
const T = { mode: "focus", left: null, endAt: null, iv: null };
const modeMins = () => S.settings[T.mode];
function timer() {
  if (T.left === null) T.left = modeMins() * 60;
  return `
  ${topbar(`<button class="icon-btn" data-go="stats" aria-label="סטטיסטיקות">${ic("chart")}</button>`, "טיימר מיקוד", `<button class="icon-btn" data-go="settings" aria-label="הגדרות">${ic("gear")}</button>`)}
  ${seg("timer", [["focus", "מיקוד"], ["short", "הפסקה קצרה"], ["long", "הפסקה ארוכה"]], T.mode)}
  <div class="ring-wrap">
    <svg viewBox="0 0 120 120">
      <defs><linearGradient id="rg" gradientUnits="userSpaceOnUse" x1="10" y1="110" x2="110" y2="10"><stop offset="0" stop-color="#6c5cff"/><stop offset=".5" stop-color="#9b6bff"/><stop offset="1" stop-color="#7a6cff"/></linearGradient></defs>
      <circle cx="60" cy="60" r="54" stroke="#20263b" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="${ARC} 400"/>
      <circle id="ring" cx="60" cy="60" r="54" stroke="url(#rg)" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="${ARC} 400"/>
    </svg>
    <div class="ring-center"><div><div class="time" id="time"></div><div class="sub" id="tsub"></div></div></div>
  </div>
  <div class="controls">
    <button class="ctrl" data-act="tReset" aria-label="איפוס">${ic("reset")}</button>
    <button class="ctrl play" data-act="tToggle" id="tplay" aria-label="הפעל"></button>
    <button class="ctrl" data-act="tStop" aria-label="עצור"><span class="sq"></span></button>
  </div>`;
}
function paintTimer() {
  const el = $("#time");
  if (!el) return;
  if (T.endAt) T.left = Math.max(0, Math.round((T.endAt - Date.now()) / 1000));
  el.textContent = `${String(Math.floor(T.left / 60)).padStart(2, "0")}:${String(T.left % 60).padStart(2, "0")}`;
  $("#tsub").textContent = T.endAt ? (T.mode === "focus" ? "🌱 בפוקוס..." : "☕ הפסקה") : T.mode === "focus" ? "🌱 התחל להתמקד" : "☕ זמן להפסקה";
  $("#tplay").innerHTML = `<svg class="ic" viewBox="0 0 24 24">${ICONS[T.endAt ? "pause" : "play"]}</svg>`;
  $("#ring").setAttribute("stroke-dasharray", `${ARC * (T.left / (modeMins() * 60))} 400`);
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
  ${topbar("", "הגדרות", "")}
  <div class="card" style="padding:16px 12px 6px">
    <div class="card-head"><h3>פרופיל</h3></div>
    <div class="field"><label>שם</label><input id="sName" value="${esc(S.user.name)}" /></div>
    <div class="field"><label>אווטאר</label><input id="sAvatar" value="${esc(S.user.avatar)}" maxlength="8" /></div>
  </div>
  <div class="card" style="padding:16px 12px 6px">
    <div class="card-head"><h3>טיימר (דקות)</h3></div>
    <div class="field"><label>מיקוד</label><input id="sFocus" type="number" min="1" max="180" value="${S.settings.focus}" /></div>
    <div class="field"><label>הפסקה קצרה</label><input id="sShort" type="number" min="1" max="60" value="${S.settings.short}" /></div>
    <div class="field"><label>הפסקה ארוכה</label><input id="sLong" type="number" min="1" max="90" value="${S.settings.long}" /></div>
  </div>
  <button class="btn" data-act="saveSettings">שמור</button>
  <div class="card" style="margin-top:20px;padding:16px 12px 8px">
    <div class="card-head"><h3>🧠 מה העוזר זוכר עליך</h3></div>
    ${S.memory.map((m) => `<div class="memory-item"><span>${esc(m.fact)}</span><button class="del" data-act="forget" data-id="${m.id}">${ic("x")}</button></div>`).join("") || `<div class="empty">העוזר עדיין לא שמר עליך זיכרונות</div>`}
  </div>
  <div class="row">
    <button class="btn ghost" data-act="clearChat">נקה שיחה</button>
    <button class="btn danger" data-act="resetAll">איפוס נתונים</button>
  </div>`;
}

/* ---------- Agent ---------- */
let sending = false;
function agent() {
  const msgs = S.chat.map((m) => `<div class="msg ${m.role} ${m.err ? "err" : ""}">${esc(m.content)}${m.acts?.length ? `<div class="acts">⚡ ${m.acts.map(esc).join(" · ")}</div>` : ""}</div>`).join("");
  return `
  ${topbar(backBtn(), "✨ העוזר האישי", `<button class="icon-btn" data-go="settings" aria-label="זיכרון">🧠</button>`)}
  <div class="messages" id="msgs">
    ${msgs || `<div class="msg assistant">היי ${esc(S.user.name)}! אני העוזר האישי שלך 🤖\nאני זוכר את השיחות שלנו, יכול להוסיף משימות ופרויקטים, לתכנן לך את היום ולעזור עם רעיונות. במה נתחיל?</div>`}
    ${sending ? `<div class="typing">חושב...</div>` : ""}
  </div>
  ${S.chat.length ? "" : `<div class="suggest">${["תכנן לי את היום", "הוסף משימה: להתקשר לסבתא מחר", "מה הכי דחוף עכשיו?", "תפרק לי את פיתוח האפליקציה למשימות"].map((s) => `<button data-act="suggest">${s}</button>`).join("")}</div>`}
  <form class="composer" id="composer">
    <textarea id="input" rows="1" dir="auto" placeholder="כתוב הודעה..."></textarea>
    <button class="send" ${sending ? "disabled" : ""} aria-label="שלח">${ic("send")}</button>
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
    const data = await res.json().catch(() => ({ error: "תשובה לא תקינה מהשרת" }));
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
function openSheet(html, page = false) {
  sheet.innerHTML = `<div class="sheet-inner">${html}</div>`;
  sheet.classList.toggle("page", page);
  sheet.classList.remove("hidden");
}
function closeSheet() { sheet.classList.add("hidden"); sheet.innerHTML = ""; }
sheet.addEventListener("click", (e) => { if (e.target === sheet) closeSheet(); });

function sheetTask() {
  openSheet(`
  ${topbar(`<button class="txt-btn" data-act="close">ביטול</button>`, "משימה חדשה", `<button class="txt-btn end" data-act="saveTask">שמור</button>`)}
  <div class="input-card"><input id="fTitle" dir="auto" placeholder="מה צריך לעשות?" /></div>
  <div class="frow">
    <span class="lbl">פרויקט ${ic("chev")}</span><span class="val" id="vProj">בחר פרויקט</span>${ic("folder")}
    <select id="fProj" onchange="document.getElementById('vProj').textContent=this.selectedOptions[0].text"><option value="">בחר פרויקט</option>${S.projects.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join("")}</select>
  </div>
  <div class="frow">
    <span class="lbl">תאריך</span><span class="val" id="vDue">היום</span>${ic("calendar")}
    <input class="overlay" id="fDue" type="date" value="${todayISO()}" onclick="try{this.showPicker()}catch(e){}" onchange="document.getElementById('vDue').textContent=window.__due(this.value)" />
  </div>
  <div class="frow">
    <span class="lbl">עדיפות</span><span class="val" id="vPri">בינונית</span>${ic("flag")}
    <select id="fPri" onchange="document.getElementById('vPri').textContent=this.selectedOptions[0].text"><option value="low">נמוכה</option><option value="medium" selected>בינונית</option><option value="high">גבוהה</option></select>
  </div>
  <div class="frow">
    <span class="lbl">הערות</span><input class="note" id="fNote" dir="auto" placeholder="הוסף הערה (לא חובה)" />
  </div>`, true);
  setTimeout(() => $("#fTitle")?.focus(), 50);
}
window.__due = dueLabel;

let pickIcon = "folder";
function sheetProject(p) {
  pickIcon = p?.icon && PICONS[p.icon] ? p.icon : "folder";
  openSheet(`
  ${topbar(`<button class="txt-btn" data-act="close">ביטול</button>`, p ? "עריכת פרויקט" : "פרויקט חדש", `<button class="txt-btn end" data-act="saveProject" data-id="${p?.id || ""}">שמור</button>`)}
  <div class="input-card"><input id="pName" dir="auto" value="${esc(p?.name || "")}" placeholder="שם הפרויקט" /></div>
  <div class="icon-pick">${Object.keys(PICONS).map((k) => `<button class="c-${PICONS[k]} ${k === pickIcon ? "on" : ""}" data-act="pickIcon" data-id="${k}">${ic(k)}</button>`).join("")}</div>
  <div class="field"><label>התקדמות</label><input id="pProg" type="range" min="0" max="100" step="5" value="${p?.progress ?? 0}" oninput="document.getElementById('pPv').textContent=this.value+'%'" /><b id="pPv">${p?.progress ?? 0}%</b></div>
  ${p ? `<button class="btn danger" data-act="delProject" data-id="${p.id}">מחק פרויקט</button>` : ""}`);
}
function sheetIdea() {
  openSheet(`
  ${topbar(`<button class="txt-btn" data-act="close">ביטול</button>`, "רעיון חדש", `<button class="txt-btn end" data-act="saveIdea">שמור</button>`)}
  <div class="field full"><textarea id="iText" rows="4" dir="auto" placeholder="מה הרעיון?"></textarea></div>`);
  setTimeout(() => $("#iText")?.focus(), 50);
}
function sheetAdd() {
  openSheet(`
  ${topbar("", "מה להוסיף?", `<button class="icon-btn" data-act="close" aria-label="סגור">${ic("x")}</button>`)}
  <div class="stack">
    <button class="btn" data-act="newTask">${ic("checkCircle")} משימה</button>
    <button class="btn ghost" data-act="newProject">${ic("folder")} פרויקט</button>
    <button class="btn ghost" data-act="newIdea">${ic("bulbLine")} רעיון</button>
    <button class="btn ghost" data-act="openAgent">${ic("sparkles")} לבקש מהעוזר האישי</button>
  </div>`);
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
  pickIcon(id, el) { pickIcon = id; el.parentElement.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === el)); return false; },
  close() { closeSheet(); return false; },
  saveTask() {
    const title = $("#fTitle").value.trim();
    if (!title) { $("#fTitle").focus(); return false; }
    S.tasks.unshift({ id: uid(), title, due: $("#fDue").value || todayISO(), tag: "", priority: $("#fPri").value, projectId: $("#fProj").value || null, note: $("#fNote").value.trim(), done: false, createdAt: Date.now() });
    closeSheet();
  },
  saveProject(id) {
    const name = $("#pName").value.trim();
    if (!name) { $("#pName").focus(); return false; }
    const progress = Number($("#pProg").value), status = progress >= 100 ? "done" : "active";
    const p = S.projects.find((x) => x.id === id);
    if (p) Object.assign(p, { name, icon: pickIcon, progress, status, updatedAt: Date.now() });
    else S.projects.unshift({ id: uid(), name, icon: pickIcon, progress, status, updatedAt: Date.now() });
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
  if (e.target.closest("[data-done-all]")) { tabState.tasks = "done"; return go("tasks"); }
  const a = e.target.closest("[data-act]");
  const g = e.target.closest("[data-go]");
  if (g && !a) { closeSheet(); return go(g.dataset.go); }
  const segBtn = e.target.closest("[data-seg] button");
  if (segBtn) {
    const name = segBtn.closest("[data-seg]").dataset.seg;
    if (name === "timer") {
      if (T.endAt && !confirm("להחליף מצב ולעצור את הטיימר?")) return;
      clearInterval(T.iv); T.endAt = null; T.mode = segBtn.dataset.val; T.left = modeMins() * 60;
    } else tabState[name] = segBtn.dataset.val;
    return render();
  }
  if (a && actions[a.dataset.act]) {
    e.preventDefault();
    const r = actions[a.dataset.act](a.dataset.id, a);
    if (r !== false) { save(); render(); }
  }
});
$("#addBtn").addEventListener("click", sheetAdd);

/* Tab bar icons + live clock in the desktop phone frame */
document.querySelectorAll("[data-icon]").forEach((el) => { el.outerHTML = ic(el.dataset.icon); });
const clock = () => { const d = new Date(); $("#clock").textContent = `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`; };
clock(); setInterval(clock, 30000);

go("home");
