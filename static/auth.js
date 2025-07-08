
const API_URL = "http://127.0.0.1:8000";

function login() {
  const username = document.getElementById("loginName").value.trim();
  const password = document.getElementById("loginPass").value.trim();

  if (!username || !password) {
    showError("Please enter both username and password.");
    return;
  }

  fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => {
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    })
    .then(data => {
      localStorage.setItem("student", data.username);
      window.location.href = "index.html";
    })
    .catch(() => showError("Login failed. Check your credentials."));
}

function register() {
  const username = document.getElementById("loginName").value.trim();
  const password = document.getElementById("loginPass").value.trim();

  if (!username || !password) {
    showError("Please enter both username and password.");
    return;
  }

  fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => {
      if (!res.ok) throw new Error("User already exists");
      return res.json();
    })
    .then(data => {
      alert("Registered successfully!");
      login();
    })
    .catch(() => showError("Registration failed. Try a different name."));
}

function showError(msg) {
  document.getElementById("authStatus").innerText = msg;
}
