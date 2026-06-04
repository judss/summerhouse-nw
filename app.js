// ─── DATA ───────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "arrival", time: "On Arrival", label: null, alert: false, tasks: [
    "Get night warden key and name badge",
    "Read night warden Report",
    "Connect phone",
    "Start laundry",
    "Prepare cleaning supplies",
  ]},
  { id: "kitchen-light", time: "20:05–20:30", label: "Kitchen Light Clean", alert: false, tasks: [
    "Check/restock tea towels",
    "Hang up any food bags left on floor",
    "Replace dishwashing sponges if needed",
    "Wipe all kitchen surfaces",
    "Change bins",
    "Put dishes away",
  ]},
  { id: "bathrooms-deep", time: "20:30–21:15", label: "Bathrooms Deep Clean", alert: false, tasks: [
    "Wipe doors, handles, sinks, pipes & outside of toilet with lemon disinfectant",
    "Window cleaner on mirrors & shower glass",
    "Remove rubbish, wipe bin & lid",
    "Mop with hot water & lemon disinfectant",
    "Refill toilet paper",
    "Check toilet cube",
    "Spray air freshener"
  ]},
  { id: "vacuum", time: "21:15–21:30", label: "Vacuum", alert: false, tasks: [
    "Top floor hall", 
    "Middle floor hall", 
    "Stairs",
  ]},
  { id: "reception", time: "21:30–22:00", label: "Clean Reception", alert: false, tasks: [
    "Wipe ALL black surfaces",
    "Replace bin liner, wipe bin & lid, spray cockroach spray behind bin",
    "Wipe all windows & windowsills",
    "Vacuum all corners including under desk, spray cockroach spray, then air freshener",
    "Mop with hot water",
  ]},
  { id: "whatsapp", time: "21:45", label: "⚠️ Send Courtyard Closing WhatsApp", alert: true, tasks: [
    "Send closing message to guest WhatsApp group",
  ]},
  { id: "courtyard-close", time: "22:00", label: "⚠️ Close & Lock Courtyard", alert: true, tasks: [
    "Turn off music to kill the mood and encourage guests to leave",
    "Flash lights off and on to signal closing time",
    "Tell guests to leave",
    "Lock the gate",
  ]},
  { id: "courtyard-clean", time: "22:00+", label: "Clean Courtyard", alert: false, tasks: [
    "Empty & wash ashtrays with dish soap and hot water",
    "Clean & wipe all seating, table tops & underneath tables/benches",
    "Wipe white windowsills (TV room + 2 kitchen windows)",
    "Clear leaves from decking & pick out of white rocks",
    "Change bin liners, wipe bins inside & outside",
    "Clean dryer filters, remove all lint",
    "Turn off courtyard lights",
  ]},
  { id: "extra", time: "23:00", label: "Extra Tasks", alert: false, tasks: [
    "Check Night Warden Report for tonight's specific tasks",
    "If deep clean night → kitchen already closed at 23:00 ✅",
  ]},
  { id: "kitchen-deep", time: "00:00–00:45", label: "Kitchen Deep Clean", alert: false, tasks: [
    "⚠️ Close kitchen (if not already closed)",
    "Clean & store any dishes left out (lots = leave note for reception)",
    "Wipe sinks with lemon disinfectant, pour vinegar down drains",
    "Clean all walls from ground up (metal sponge + gumption on tile stains)",
    "Remove & clean black stove grills, clean stove surface, put grills back",
    "Remove everything off shelves, clean shelves & black trays, put back neatly",
    "Clean all bins inside & outside",
    "Clean windows, frames, drains, fan, under sink, pipes & cutlery holders",
    "Wipe all surfaces including microwave (inside, sides & top)",
    "Replace tea towelswith clean ones",
    "Wipe down kettle & toaster (shake crumbs into bin)",
    "Vacuum then mop floor (don't vacuum a wet surface)",
  ]},
  { id: "bathrooms-light", time: "00:45–01:15", label: "Bathrooms Light Clean", alert: false, tasks: [
    "Mop floor with hot water & bleach, dry afterwards",
    "Wipe door, handles, sinks, pipes & outside of toilet",
  ]},
  { id: "tv-room", time: "01:15–01:45", label: "TV Room", alert: false, tasks: [
    "Collect & wash dishes, bin any rubbish",
    "Empty & replace bins (wipe outside if needed)",
    "Clean table & seats",
    "Vacuum seating area & floor",
    "Tidy pillows, games & bookshelf",
    "By 02:00 → kindly ask any remaining guests to go to bed",
  ]},
  { id: "mop", time: "01:45–02:00", label: "Mop Ground Floor", alert: false, tasks: [
    "TV room", 
    "Room 3 hall", 
    "Fridge area", 
    "Kitchen", 
    "Entry hall",
  ]},
  { id: "close", time: "02:00", label: "⚠️ Close", alert: true, tasks: [
    "Take photos of Harry Potter cupboard, cleaning supplies cupboard & inside the hoover → send to Slack",
    "Take photo of any lost property & send WhatsApp message to guests",
    "Put all equipment away neatly",
    "Leave keys & name badge at reception",
  ]},
];

const STORAGE_KEY = "nw_checklist_v1";
const COLLAPSE_KEY = "nw_collapse_v1";

// ─── STATE ───────────────────────────────────────────────────────────────────
function loadChecked() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch(e) {}
  const state = {};
  SECTIONS.forEach(s => { state[s.id] = s.tasks.map(() => false); });
  return state;
}

function saveChecked(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e) {}
}

function loadCollapsed() {
  try {
    const saved = localStorage.getItem(COLLAPSE_KEY);
    if (saved) return JSON.parse(saved);
  } catch(e) {}
  return {};
}

function saveCollapsed(state) {
  try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify(state)); } catch(e) {}
}

let checked = loadChecked();
let collapsed = loadCollapsed();

// ─── RENDER ──────────────────────────────────────────────────────────────────
function render() {
  const container = document.getElementById("checklist-container");
  container.innerHTML = "";

  let total = 0, done = 0;
  SECTIONS.forEach(s => { total += s.tasks.length; done += checked[s.id].filter(Boolean).length; });

  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  document.getElementById("progress-text").textContent = `${done} / ${total} tasks`;
  document.getElementById("progress-pct").textContent = `${pct}%`;
  const fill = document.getElementById("progress-fill");
  fill.style.width = pct + "%";
  fill.style.background = pct === 100 ? "#4caf7d" : "#c8a84b";

  SECTIONS.forEach(s => {
    const checks = checked[s.id];
    const allDone = checks.every(Boolean);
    const someDone = checks.some(Boolean);
    const isCollapsed = collapsed[s.id];

    const card = document.createElement("div");
    card.className = "card" + (s.alert ? " alert" : "") + (allDone ? " done" : "");

    // Header
    const header = document.createElement("div");
    header.className = "card-header";
    header.innerHTML = `
      <div class="card-header-left">
        <div class="dot ${allDone ? "complete" : someDone ? "partial" : ""}"></div>
        <div>
          <span class="card-time">${s.time}</span>
          ${s.label ? `<span class="card-label">${s.label}</span>` : ""}
        </div>
      </div>
      <div class="card-right">
        <span class="card-count">${checks.filter(Boolean).length}/${s.tasks.length}</span>
        <span class="card-chevron ${isCollapsed ? "" : "open"}">▲</span>
      </div>
    `;
    header.addEventListener("click", () => {
      collapsed[s.id] = !collapsed[s.id];
      saveCollapsed(collapsed);
      render();
    });
    card.appendChild(header);

    // Body
    if (!isCollapsed) {
      const body = document.createElement("div");
      body.className = "card-body";
      s.tasks.forEach((task, idx) => {
        const row = document.createElement("div");
        row.className = "task-row";
        row.innerHTML = `
          <div class="checkbox ${checks[idx] ? "checked" : ""}">${checks[idx] ? "✓" : ""}</div>
          <span class="task-text ${checks[idx] ? "checked" : ""}">${task}</span>
        `;
        row.addEventListener("click", () => {
          checked[s.id][idx] = !checked[s.id][idx];
          saveChecked(checked);
          render();
        });
        body.appendChild(row);
      });
      card.appendChild(body);
    }

    container.appendChild(card);
  });

  if (pct === 100) {
    const banner = document.createElement("div");
    banner.className = "complete-banner";
    banner.textContent = "✓ Shift Complete — Good work!";
    container.appendChild(banner);
  }
}

// ─── CONTROLS ────────────────────────────────────────────────────────────────
function resetChecklist() {
  if (!confirm("Reset all tasks for a new shift?")) return;
  SECTIONS.forEach(s => { checked[s.id] = s.tasks.map(() => false); });
  saveChecked(checked);
  collapsed = {};
  saveCollapsed(collapsed);
  render();
}

function collapseAll() {
  SECTIONS.forEach(s => { collapsed[s.id] = true; });
  saveCollapsed(collapsed);
  render();
}

function expandAll() {
  SECTIONS.forEach(s => { collapsed[s.id] = false; });
  saveCollapsed(collapsed);
  render();
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("page-" + id).classList.add("active");
  event.currentTarget.classList.add("active");
}

// ─── COPY MESSAGE ────────────────────────────────────────────────────────────
function copyMsg(btn) {
  const text = btn.previousElementSibling.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.textContent = '✓';
    setTimeout(() => { btn.classList.remove('copied'); btn.textContent = '⎘'; }, 2000);
  });
}

// ─── INIT ────────────────────────────────────────────────────────────────────
render();

// ─── SERVICE WORKER ──────────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/summerhouse-nw/sw.js');
  });
}
