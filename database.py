
from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///studenthub.db"
engine = create_engine(DATABASE_URL, echo=False)

def create_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
