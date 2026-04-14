from database.setup import SessionLocal
from sqlalchemy.orm import Session
from database.model import Project, Task
from fastapi import Depends

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_project(db, name: str):
    
    project = Project(name=name)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

def create_task(db: Session, project_id: int, title: str):
    task = Task(title=title, project_id=project_id)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def get_projects(db: Session):
    return db.query(Project).all()

def toggle_task(db: Session, project_id: int, task_id: int):
    task = db.query(Task).filter(Task.id == task_id, Task.project_id == project_id).first()
    if task:
        task.completed = not task.completed
        db.commit()
        db.refresh(task)
        return task
    return None

def get_project(db: Session, project_id: int):
    return db.query(Project).filter(Project.id == project_id).first()

def get_tasks(db: Session, project_id: int):
    return db.query(Task).filter(Task.project_id == project_id).all()

def delete_project(db: Session, project_id: int):
    project = db.query(Project).filter(Project.id == project_id).first()
    if project:
        db.delete(project)
        db.commit()
        return True
    return False

def delete_task(db: Session, project_id: int, task_id: int):
    task = db.query(Task).filter(Task.id == task_id, Task.project_id == project_id).first()
    if task:
        db.delete(task)
        db.commit()
        return True
    return False