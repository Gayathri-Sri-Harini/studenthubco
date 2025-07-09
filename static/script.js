const API_URL = "https://studenthubco.onrender.com";
const storedUser = localStorage.getItem("student");
if (!storedUser) window.location.href = "login.html";
let currentUser = storedUser;
document.getElementById("currentUser").innerText = "Logged in as: " + currentUser;

function logout() {
  localStorage.removeItem("student");
  window.location.href = "login.html";
}

const API_URL = "http://127.0.0.1:8000";

function getStudents() {
  fetch(API_URL + "/students").then(res => res.json()).then(data => {
    document.getElementById("studentsList").innerHTML = data.map(s => "<div>" + s.name + "</div>").join("");
  });
}

function createProject() {
  const title = document.getElementById("projectTitle").value;
  const description = document.getElementById("projectDesc").value;
  fetch(API_URL + "/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  }).then(res => res.json()).then(getProjects);
}

function getProjects() {
  fetch(API_URL + "/projects").then(res => res.json()).then(data => {
    document.getElementById("projectsList").innerHTML = data.map(p => "<div>" + p.title + "</div>").join("");
  });
}

function sendMessage() {
  const content = document.getElementById("messageInput").value;
  fetch(API_URL + "/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender: currentUser, content })
  }).then(getMessages);
}

function getMessages() {
  fetch(API_URL + "/messages").then(res => res.json()).then(data => {
    document.getElementById("messagesList").innerHTML = data.map(m => "<div>" + m.sender + ": " + m.content + "</div>").join("");
  });
}

function sendDirectMessage() {
  const recipient = document.getElementById("dmRecipient").value;
  const content = document.getElementById("dmContent").value;
  fetch(API_URL + "/direct-messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender: currentUser, recipient, content })
  }).then(loadDirectMessages);
}

function loadDirectMessages() {
  fetch(API_URL + "/direct-messages/" + currentUser).then(res => res.json()).then(data => {
    document.getElementById("dmList").innerHTML = data.map(dm =>
      "<div><b>" + dm.sender + "</b> ➜ <i>" + dm.recipient + "</i>: " + dm.content + "</div>"
    ).join("");
  });
}
function logout() {
  localStorage.removeItem("student");
  window.location.href = "/";
}

window.onload = () => {
  const user = localStorage.getItem("student");
  if (!user) {
    window.location.href = "/";
  } else {
    document.getElementById("currentUser").innerText = `Logged in as ${user}`;
  }
};

getStudents();
getProjects();
getMessages();
loadDirectMessages();
