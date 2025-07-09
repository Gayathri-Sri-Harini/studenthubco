



function login(event) {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();



  fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      return res.json();
    })
    .then(data => {
      localStorage.setItem("student", data.username);
      window.location.href = "/static/dashboard.html";  // ✅ Redirect here
    })
    .catch(err => {
      document.getElementById("authStatus").innerText = "Login failed. Try again.";
    });
}

function register(event) {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Registration failed");
      }
      return res.json();
    })
    .then(data => {
      localStorage.setItem("student", data.username);
      window.location.href = "/static/dashboard.html";  // ✅ Redirect here too
    })
    .catch(err => {
      document.getElementById("authStatus").innerText = "Registration failed. Try again.";
    });
}
window.location.href = "/static/index.html";
