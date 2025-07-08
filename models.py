
from sqlmodel import SQLModel, Field
from typing import Optional

class Student(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    password: str
    avatar: Optional[str] = None

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    status: str = "In Progress"

class ProjectMembership(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="student.id")
    project_id: int = Field(foreign_key="project.id")

class Comment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    author: str
    content: str
    project_id: int = Field(foreign_key="project.id")

class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    sender: str
    content: str

class DirectMessage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    sender: str
    recipient: str
    content: str
