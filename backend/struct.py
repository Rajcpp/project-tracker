from typing import List
from pydantic import BaseModel
from enum import Enum

class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Task(BaseModel):
    id: int
    title: str
    priority: Priority
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
    priority: Priority

class ProjectCreate(BaseModel):
    name: str