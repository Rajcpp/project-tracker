from fastapi import FastAPI, Depends
from backend.struct import Project, Task
import backend.functions as db_functions
from database.setup import SessionLocal
from sqlalchemy.orm import Session
app = FastAPI()

projects: list[Project] = []

@app.get("/projects")
def get_projects(db: Session = Depends(db_functions.get_db)):
    return db_functions.get_projects(db)

@app.post("/projects")
def create_project(name: str,db: Session = Depends(db_functions.get_db)):
    return db_functions.create_project(db=db, name=name)

@app.post("/projects/{project_id}/tasks")
def create_task( project_id: int, title: str, db: Session = Depends(db_functions.get_db)):
    return db_functions.create_task(db=db, project_id=project_id, title=title)

@app.put("/projects/{project_id}/tasks/{task_id}")
def toggle_task(project_id: int, task_id: int, db: Session = Depends(db_functions.get_db)):
    return db_functions.toggle_task(db=db, project_id=project_id, task_id=task_id)