from typing import List
from pydantic import BaseModel

class Task(BaseModel):
    id: int
    title: str
    completed: bool

class Project(BaseModel):
    id: int
    name: str
    tasks: List[Task] = []

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    
class TaskCreate(BaseModel):
    title: str

class ProjectCreate(BaseModel):
    name: str