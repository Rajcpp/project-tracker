from fastapi import FastAPI, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import backend.functions as db_functions
from database.setup import SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
print(BASE_DIR)

templates = Jinja2Templates(
    directory=os.path.join(BASE_DIR, "frontend", "templates")
)
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "frontend", "static")), name="static")

@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse(
    request=request,
    name="index.html",
    context={"request": request}
    )

@app.get("/api/projects")
def get_projects(db: Session = Depends(db_functions.get_db)):
    return db_functions.get_projects(db)

@app.post("/api/projects")
def create_project(name: str,db: Session = Depends(db_functions.get_db)):
    return db_functions.create_project(db=db, name=name)

@app.delete("/api/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(db_functions.get_db)):
    success = db_functions.delete_project(db=db, project_id=project_id)
    return {"success": success}

@app.delete("/api/projects/{project_id}/tasks/{task_id}")
def delete_task(project_id: int, task_id: int, db: Session = Depends(db_functions.get_db)):
    success = db_functions.delete_task(db=db, project_id=project_id, task_id=task_id)
    return {"success": success}

@app.post("/api/projects/{project_id}/tasks")
def create_task( project_id: int, title: str, db: Session = Depends(db_functions.get_db)):
    return db_functions.create_task(db=db, project_id=project_id, title=title)

@app.get("/api/projects/{project_id}")
def get_tasks(project_id: int, db: Session = Depends(db_functions.get_db)):
    return db_functions.get_tasks(db=db, project_id=project_id)

@app.put("/api/projects/{project_id}/tasks/{task_id}")
def toggle_task(project_id: int, task_id: int, db: Session = Depends(db_functions.get_db)):
    return db_functions.toggle_task(db=db, project_id=project_id, task_id=task_id)