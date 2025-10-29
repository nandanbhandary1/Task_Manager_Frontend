const API = "https://web-production-22622.up.railway.app/";
const priorities = ["Low", "Medium", "High"];

const form = document.getElementById("taskForm");
const list = document.getElementById("taskList");
const insightsEl = document.getElementById("insights");
const prioritySelect = document.getElementById("priority");

// ✅ Dynamically populate priority dropdown
prioritySelect.innerHTML = `<option value="">-- Select Priority --</option>`;
priorities.forEach(p => {
  const opt = document.createElement("option");
  opt.value = p;
  opt.textContent = p;
  prioritySelect.appendChild(opt);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const priority = document.getElementById("priority").value;
  const due_date = document.getElementById("due_date").value;

  if (!title) return alert("Please enter a title");
  if (!priority) return alert("Please select a priority");

  const payload = { title, description, priority, due_date };

  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    form.reset();
    await loadTasks();
    await loadInsights();
  } else {
    const err = await res.json().catch(() => ({}));
    alert(err.error || "Error adding task");
  }
});

list.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const id = btn.dataset.id;

  if (action === "toggle") {
    const cur = btn.dataset.completed === "true";
    const newCompleted = !cur;

    const res = await fetch(`${API}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: newCompleted }),
    });

    if (res.ok) {
      await loadTasks();
      await loadInsights();
    } else {
      alert("Failed to toggle task");
    }
  }

  if (action === "delete") {
    if (!confirm("Delete this task?")) return;
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    await loadTasks();
    await loadInsights();
  }
});

async function loadTasks() {
  const res = await fetch(`${API}/tasks`);
  const tasks = await res.json();
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = "<p>No tasks yet.</p>";
    return;
  }

  tasks.forEach(t => {
    const div = document.createElement("div");
    div.className = "task" + (t.completed ? " completed" : "");
    div.innerHTML = `
      <h3>${escapeHtml(t.title)}</h3>
      <div class="desc">${escapeHtml(t.description || "")}</div>
      <div class="meta">
        Priority: ${escapeHtml(t.priority)} • 
        Due: ${t.due_date || "N/A"} • 
        Status: ${t.completed ? "Completed" : "Pending"}
      </div>
      <div class="actions">
        <button data-action="toggle" data-id="${t.id}" data-completed="${t.completed}">
          ${t.completed ? "Undo" : "Mark Complete"}
        </button>
        <button data-action="delete" data-id="${t.id}" class="delete-btn">Delete</button>
      </div>
    `;
    list.appendChild(div);
  });
}

async function loadInsights() {
  const res = await fetch(`${API}/insights`);
  const data = await res.json();
  insightsEl.innerHTML = `<h4>Insights</h4><p>${escapeHtml(data.summary)}</p>`;
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

loadTasks();
loadInsights();
