
# Student Collaboration Hub

A full-stack web application for students to collaborate on projects, post public messages, and send direct messages. Built with **FastAPI**, **SQLModel**, and a colorful **HTML/CSS/JS frontend**.

---

## 🚀 Features

- 🔐 Secure student login & registration (with hashed passwords)
- 🧑 View all registered students
- 📁 Create and join projects
- 💬 Post project comments and public messages
- 📩 Send direct messages to other students
- 🌈 Responsive, colorful frontend with external CSS and JavaScript

---

## 🗂️ Project Structure

```
student_hub_app/
├── main.py              # FastAPI endpoints
├── models.py            # SQLModel ORM models
├── database.py          # DB setup and session
├── requirements.txt     # Python dependencies
├── README.md
└── frontend/
    ├── index.html       # Main hub page
    ├── login.html       # Login/registration form
    ├── style.css        # External stylesheet
    ├── script.js        # JS for collaboration page
    └── auth.js          # JS for login/register
```

---

## 💻 Setup Instructions

1. **Clone or unzip the project**
2. Navigate to the root directory

```bash
cd student_hub_app
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Run the FastAPI server**

```bash
uvicorn main:app --reload
```

5. **Open the frontend**

Just open `frontend/login.html` in your browser.

---

## 🔐 Default Login Flow

- First, go to `login.html` and register a student
- Then, log in to access `index.html`
- Uses `localStorage` to store session

---

## 🛠 Built With

- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLModel](https://sqlmodel.tiangolo.com/)
- [Passlib](https://passlib.readthedocs.io/)
- Vanilla JavaScript + HTML5 + CSS3

---

## 📦 Deployment

- Ready to deploy to Render, Railway, or any Python-based cloud
- SQLite used locally (can be swapped for PostgreSQL easily)

---

## 🙋 Support

Need help? [Open a Chat with ChatGPT](https://chat.openai.com) 😉

---

## 📄 License

MIT License
