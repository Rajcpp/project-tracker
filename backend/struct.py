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

class TaskCreate(BaseModel):
    title: str

class ProjectCreate(BaseModel):
    name: str