const API_URL = "https://studenthubco.onrender.com"; // ✅ Use deployed backend

// 🔐 Check user session
const storedUser = localStorage.getItem("student");
if (!storedUser) {
  window.location.href = "login.html"; // redirect if not logged in
}
let currentUser = storedUser;
document.getElementById("currentUser").innerText = "Logged in as: " + currentUser;

function logout() {
  localStorage.removeItem("student");
  window.location.href = "login.html";
}

// 👥 Fetch all students
function getStudents() {
  fetch(`${API_URL}/students`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("studentsList").innerHTML = data
        .map(s => `<div>${s.name}</div>`)
        .join("");
    });
}

// 📁 Create a new project
function createProject() {
  const title = document.getElementById("projectTitle").value;
  const description = document.getElementById("projectDesc").value;
  fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  })
    .then(res => res.json())
    .then(() => getProjects());
}

// 📁 Load all projects
function getProjects() {
  fetch(`${API_URL}/projects`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("projectsList").innerHTML = data
        .map(p => `<div>${p.title}</div>`)
        .join("");
    });
}

// 💬 Send a public message
function sendMessage() {
  const content = document.getElementById("messageInput").value;
  fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender: currentUser, content })
  }).then(() => getMessages());
}

// 💬 Fetch all public messages
function getMessages() {
  fetch(`${API_URL}/messages`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("messagesList").innerHTML = data
        .map(m => `<div>${m.sender}: ${m.content}</div>`)
        .join("");
    });
}

// 📩 Send a direct message
function sendDirectMessage() {
  const recipient = document.getElementById("dmRecipient").value;
  const content = document.getElementById("dmContent").value;
  fetch(`${API_URL}/direct-messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender: currentUser, recipient, content })
  }).then(() => loadDirectMessages());
}

// 📩 Load all DMs for current user
function loadDirectMessages() {
  fetch(`${API_URL}/direct-messages/${currentUser}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("dmList").innerHTML = data
        .map(dm => `<div><b>${dm.sender}</b> ➜ <i>${dm.recipient}</i>: ${dm.content}</div>`)
        .join("");
    });
}

// 🟢 Initial load
getStudents();
getProjects();
getMessages();
loadDirectMessages();
