// static/script.js
function logout() {
  localStorage.removeItem("student");
  window.location.href = "/static/login.html";
}

function getStudents() {
  fetch(`${API_URL}/students`)
    .then(res => res.json())
    .then(data => {
      const list = data.map(s => `<li>${s.name}</li>`).join("");
      document.getElementById("studentsList").innerHTML = `<ul>${list}</ul>`;
    });
}

function createProject() {
  const student = localStorage.getItem("student");
  const title = document.getElementById("projectTitle").value;
  const description = document.getElementById("projectDesc").value;

  fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, status: "active", owner: student })
  })
    .then(res => res.json())
    .then(() => getProjects());
}

function getProjects() {
  fetch(`${API_URL}/projects`)
    .then(res => res.json())
    .then(data => {
      const list = data.map(p => `<li>${p.title}: ${p.description}</li>`).join("");
      document.getElementById("projectsList").innerHTML = `<ul>${list}</ul>`;
    });
}

function sendMessage() {
  const student = localStorage.getItem("student");
  const content = document.getElementById("messageInput").value;

  fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender: student, content })
  })
    .then(() => getMessages());
}

function getMessages() {
  fetch(`${API_URL}/messages`)
    .then(res => res.json())
    .then(data => {
      const list = data.map(m => `<li><strong>${m.sender}:</strong> ${m.content}</li>`).join("");
      document.getElementById("messagesList").innerHTML = `<ul>${list}</ul>`;
    });
}

function sendDirectMessage() {
  const sender = localStorage.getItem("student");
  const recipient = document.getElementById("dmRecipient").value;
  const content = document.getElementById("dmContent").value;

  fetch(`${API_URL}/direct-messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender, recipient, content })
  })
    .then(() => getDirectMessages());
}

function getDirectMessages() {
  const student = localStorage.getItem("student");

  fetch(`${API_URL}/direct-messages/${student}`)
    .then(res => res.json())
    .then(data => {
      const list = data.map(dm => `<li><strong>${dm.sender} ➜ ${dm.recipient}:</strong> ${dm.content}</li>`).join("");
      document.getElementById("dmList").innerHTML = `<ul>${list}</ul>`;
    });
}

window.onload = function () {
  const student = localStorage.getItem("student");
  if (!student) window.location.href = "/static/login.html";
  else document.getElementById("currentUser").innerText = `Logged in as: ${student}`;
  getStudents();
  getProjects();
  getMessages();
  getDirectMessages();
};
