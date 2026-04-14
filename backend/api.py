import fastapi as FastAPI
from struct import Project, Task

app = FastAPI()

projects: list[Project] = []

@app.get("/projects")
def get_projects():
    return projects

@app.post("/projects")
def create_project(name: str):
    project = Project(id=len(projects) + 1, name=name, tasks=[])
    projects.append(project)
    return project

@app.post("/projects/{project_id}/tasks")
def create_task(project_id: int, title: str):
    for project in projects:
        if project.id == project_id:
            task = Task(id=len(project.tasks) + 1, title=title, completed=False)
            project.tasks.append(task)
            return task
    return {"error": "Project not found"}

@app.put("/projects/{project_id}/tasks/{task_id}")
def toggle_task(project_id: int, task_id: int):
    for project in projects:
        if project.id == project_id:
            for task in project.tasks:
                if task.id == task_id:
                    task.completed = not task.completed
                    return task
    return {"error": "Project or Task not found"}