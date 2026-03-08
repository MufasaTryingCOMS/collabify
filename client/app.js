const API = 'http://localhost:5000/api';
let token = '';
let selectedWorkspaceId = '';
let selectedGoalId = '';

// ---- AUTH ----
function showTab(tab) {
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('login-tab').classList.toggle('active', tab === 'login');
  document.getElementById('register-tab').classList.toggle('active', tab === 'register');
}

async function register() {
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  const data = await res.json();
  document.getElementById('auth-message').textContent = data.message;
  if (res.ok) showTab('login');
}

async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (res.ok) {
    token = data.token;
    showDashboard();
  } else {
    document.getElementById('auth-message').textContent = data.message;
  }
}

function logout() {
  token = '';
  selectedWorkspaceId = '';
  selectedGoalId = '';
  document.getElementById('auth-section').style.display = 'flex';
  document.getElementById('dashboard-section').style.display = 'none';
}

function showDashboard() {
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('dashboard-section').style.display = 'block';
  loadWorkspaces();
}

// ---- WORKSPACES ----
async function loadWorkspaces() {
  const res = await fetch(`${API}/workspaces`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  const list = document.getElementById('workspace-list');
  list.innerHTML = '';
  data.forEach(ws => {
    const li = document.createElement('li');
    li.innerHTML = `<span onclick="selectWorkspace('${ws._id}', this)" style="cursor:pointer">${ws.name}</span>
                    <button onclick="deleteWorkspace('${ws._id}')">Delete</button>`;
    list.appendChild(li);
  });
}

async function createWorkspace() {
  const name = document.getElementById('workspace-name').value;
  const description = document.getElementById('workspace-desc').value;
  await fetch(`${API}/workspaces`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ name, description })
  });
  document.getElementById('workspace-name').value = '';
  document.getElementById('workspace-desc').value = '';
  loadWorkspaces();
}

async function deleteWorkspace(id) {
  await fetch(`${API}/workspaces/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  loadWorkspaces();
}

function selectWorkspace(id, el) {
  selectedWorkspaceId = id;
  document.querySelectorAll('#workspace-list li').forEach(li => li.style.background = '#f8f8ff');
  el.parentElement.style.background = '#ece9ff';
  loadGoals();
}

// ---- GOALS ----
async function loadGoals() {
  if (!selectedWorkspaceId) return;
  const res = await fetch(`${API}/goals/${selectedWorkspaceId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  const list = document.getElementById('goal-list');
  list.innerHTML = '';
  data.forEach(goal => {
    const li = document.createElement('li');
    li.innerHTML = `<span onclick="selectGoal('${goal._id}', this)" style="cursor:pointer">${goal.title} — ${goal.status}</span>
                    <button onclick="deleteGoal('${goal._id}')">Delete</button>`;
    list.appendChild(li);
  });
}

async function createGoal() {
  if (!selectedWorkspaceId) return alert('Please select a workspace first!');
  const title = document.getElementById('goal-title').value;
  const description = document.getElementById('goal-desc').value;
  await fetch(`${API}/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ title, description, workspace: selectedWorkspaceId })
  });
  document.getElementById('goal-title').value = '';
  document.getElementById('goal-desc').value = '';
  loadGoals();
}

async function deleteGoal(id) {
  await fetch(`${API}/goals/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  loadGoals();
}

function selectGoal(id, el) {
  selectedGoalId = id;
  document.querySelectorAll('#goal-list li').forEach(li => li.style.background = '#f8f8ff');
  el.parentElement.style.background = '#ece9ff';
  loadTasks();
}

// ---- TASKS ----
async function loadTasks() {
  if (!selectedGoalId) return;
  const res = await fetch(`${API}/tasks/${selectedGoalId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  data.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${task.title} — ${task.status}</span>
                    <button onclick="deleteTask('${task._id}')">Delete</button>`;
    list.appendChild(li);
  });
}

async function createTask() {
  if (!selectedGoalId) return alert('Please select a goal first!');
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-desc').value;
  await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ title, description, goal: selectedGoalId })
  });
  document.getElementById('task-title').value = '';
  document.getElementById('task-desc').value = '';
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  loadTasks();
}