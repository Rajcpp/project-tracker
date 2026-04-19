from fastapi import FastAPI, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from backend.auth import get_current_user, hash_password, verify_password, create_access_token
import backend.functions as db_functions
from database.setup import SessionLocal
from sqlalchemy.orm import Session
from backend.struct import TaskCreate, ProjectCreate, UserCreate, UserLogin, UserResponse, Token
from fastapi.security import OAuth2PasswordBearer
from database.setup import Base, engine

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

templates = Jinja2Templates(
    directory=os.path.join(BASE_DIR, "frontend", "templates")
)
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "frontend", "static")), name="static")

@app.on_event("startup")
def startup_event():
    # Create database tables
    Base.metadata.create_all(bind=engine)

@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    if get_current_user(request.cookies.get("token")) is None:
        return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={"request": request}
        )
    else:
        return templates.TemplateResponse(
        request=request,
        name="register.html",
        context={"request": request}
        )

@app.get("/api/projects")
def get_projects(db: Session = Depends(db_functions.get_db), user_id: int = Depends(get_current_user)):
    return db_functions.get_projects(db, user_id)

@app.post("/api/projects")
def create_project(project: ProjectCreate, db: Session = Depends(db_functions.get_db), user_id: int = Depends(get_current_user)):
    return db_functions.create_project(db=db, name=project.name, user_id=user_id)

@app.delete("/api/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(db_functions.get_db), user_id: int = Depends(get_current_user)):
    success = db_functions.delete_project(db=db, project_id=project_id)
    return {"success": success}

@app.delete("/api/projects/{project_id}/tasks/{task_id}")
def delete_task(project_id: int, task_id: int, db: Session = Depends(db_functions.get_db), user_id: int = Depends(get_current_user)):
    success = db_functions.delete_task(db=db, project_id=project_id, task_id=task_id)
    return {"success": success}

@app.post("/api/projects/{project_id}/tasks")
def create_task(project_id: int, task: TaskCreate, db: Session = Depends(db_functions.get_db), user_id: int = Depends(get_current_user)):
    return db_functions.create_task(db=db, project_id=project_id, title=task.title)

@app.get("/api/projects/{project_id}")
def get_tasks(project_id: int, db: Session = Depends(db_functions.get_db), user_id: int = Depends(get_current_user)):
    return db_functions.get_tasks(db=db, project_id=project_id)

@app.put("/api/projects/{project_id}/tasks/{task_id}")
def toggle_task(project_id: int, task_id: int, db: Session = Depends(db_functions.get_db), user_id: int = Depends(get_current_user)):
    return db_functions.toggle_task(db=db, project_id=project_id, task_id=task_id)

@app.post("/api/auth/register")
def register(user: UserCreate, db: Session = Depends(db_functions.get_db)):
    existing_user = db_functions.get_user_by_email(db, email=user.email)
    if existing_user:
        return {"error": "Email already registered"}
    hashed_password = hash_password(user.password)
    new_user = db_functions.create_user(db=db, username=user.username, email=user.email, hashed_password=hashed_password)
    return new_user

@app.post("/api/auth/login")
def login(user: UserLogin, db: Session = Depends(db_functions.get_db)):
    # print("RAW PASSWORD:", repr(user.password))
    # print("RAW PASSWORD ENCODED:", repr(user.password.encode('utf-8')))
    # print("HASHED PASSWORD:", repr(hash_password(user.password)))
    existing_user = db_functions.get_user_by_username(db, username=user.username)
    print("Existing user: usename: {}, email: {}, hashed_password: {}".format(existing_user.username, existing_user.email, existing_user.hashed_password) if existing_user else "No user found")
    if not existing_user or not verify_password(user.password, existing_user.hashed_password):
        return {"error": "Invalid credentials"}
    access_token = create_access_token(data={"sub": str(existing_user.id)})
    return Token(access_token=access_token, token_type="bearer")

@app.get("/api/auth/me")
def get_current_user_info(token: str = Depends(oauth2_scheme), db: Session = Depends(db_functions.get_db)):
    user_id = get_current_user(token)
    if user_id is None:
        return {"error": "Invalid token"}
    user = db_functions.get_user_by_id(db, user_id=user_id)
    if user is None:
        return {"error": "User not found"}
    return UserResponse(id=user.id, username=user.username, email=user.email)