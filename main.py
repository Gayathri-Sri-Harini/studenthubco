from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlmodel import Session, select
from passlib.context import CryptContext

from database import create_db, get_session
from models import Student, Project, ProjectMembership, Comment, Message, DirectMessage

# ✅ Create app first
app = FastAPI(title="Student Collaboration Hub")

# ✅ Mount static files (frontend)
app.mount("/static", StaticFiles(directory="static"), name="static")

# ✅ Serve frontend HTML
@app.get("/")
def read_login():
    return FileResponse("static/login.html")


# ✅ Enable CORS for frontend JS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

# ✅ Password encryption
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ✅ DB initialize
create_db()

# ========== API Routes ==========
@app.post("/login")
def login(data: dict, session: Session = Depends(get_session)):
    username = data.get("username")
    password = data.get("password")
    student = session.exec(select(Student).where(Student.name == username)).first()
    if student and pwd_context.verify(password, student.password):
        return {"username": student.name}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/register")
def register(data: dict, session: Session = Depends(get_session)):
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        raise HTTPException(status_code=400, detail="Missing username or password")
    existing = session.exec(select(Student).where(Student.name == username)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Student already exists")
    hashed_pw = pwd_context.hash(password)
    student = Student(name=username, password=hashed_pw, avatar=username[0].upper())
    session.add(student)
    session.commit()
    session.refresh(student)
    return {"username": student.name}
@app.get("/dashboard")
def dashboard():
    return FileResponse("static/dashboard.html")

@app.get("/students")
def list_students(session: Session = Depends(get_session)):
    return session.exec(select(Student)).all()

@app.post("/projects")
def create_project(project: Project, session: Session = Depends(get_session)):
    session.add(project)
    session.commit()
    session.refresh(project)
    return project

@app.get("/projects")
def list_projects(status: str = None, session: Session = Depends(get_session)):
    query = select(Project)
    if status:
        query = query.where(Project.status == status)
    return session.exec(query).all()

@app.post("/projects/{project_id}/join")
def join_project(project_id: int, student_name: str, session: Session = Depends(get_session)):
    student = session.exec(select(Student).where(Student.name == student_name)).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    membership_exists = session.exec(
        select(ProjectMembership).where(
            (ProjectMembership.project_id == project_id) & (ProjectMembership.student_id == student.id)
        )
    ).first()
    if membership_exists:
        raise HTTPException(status_code=400, detail="Already a member")
    session.add(ProjectMembership(student_id=student.id, project_id=project_id))
    session.commit()
    return {"success": True, "student": student_name, "project_id": project_id}

@app.post("/projects/{project_id}/comments")
def add_comment(project_id: int, comment: Comment, session: Session = Depends(get_session)):
    comment.project_id = project_id
    session.add(comment)
    session.commit()
    session.refresh(comment)
    return comment

@app.get("/projects/{project_id}/comments")
def get_comments(project_id: int, session: Session = Depends(get_session)):
    return session.exec(select(Comment).where(Comment.project_id == project_id)).all()

@app.post("/messages")
def post_message(message: Message, session: Session = Depends(get_session)):
    session.add(message)
    session.commit()
    session.refresh(message)
    return message

@app.get("/messages")
def list_messages(session: Session = Depends(get_session)):
    return session.exec(select(Message)).all()

@app.post("/direct-messages")
def send_dm(dm: DirectMessage, session: Session = Depends(get_session)):
    session.add(dm)
    session.commit()
    session.refresh(dm)
    return dm

@app.get("/direct-messages/{username}")
def get_user_dms(username: str, session: Session = Depends(get_session)):
    return session.exec(
        select(DirectMessage).where(
            (DirectMessage.sender == username) | (DirectMessage.recipient == username)
        )
    ).all()
