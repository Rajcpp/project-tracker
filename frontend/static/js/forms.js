import {
    createProject,
    createTask,
    fetchProjectTasks,
    fetchProjects,
} from "./api.js";
import {
    showProjectForm,
    showTaskForm,
    currentProject,
    renderProjectList,
    renderTaskList,
    hideProjectForm,
    hideTaskForm,
    addProject,
    addTask,
    UpdateTotalProjects,
    total,
        UpdateTotalTasks,
} from "./components.js";

document.getElementById("add-project-btn").addEventListener("click", () => {
    showProjectForm();
});

document.getElementById("add-task-btn").addEventListener("click", () => {
    showTaskForm();
});

document.getElementById("cancel-project-btn").addEventListener("click", () => {
    document.getElementById("new-project-input").value = "";
    hideProjectForm();
});

document.getElementById("cancel-task-btn").addEventListener("click", () => {
    document.getElementById("new-task-input").value = "";
    hideTaskForm();
});

document.getElementById("save-project-btn").addEventListener("click", async () => {
    const projectName = document.getElementById("new-project-input").value.trim();
    if (projectName) {
        let createdProject = await createProject(projectName);
        document.getElementById("new-project-input").value = "";
        if (createdProject) {
            total.projects++;
            addProject(createdProject);
            UpdateTotalProjects();
        } else {
            // Optionally, you can refresh the project list if the API doesn't return the created project
            fetchProjects().then((projects) => {
                renderProjectList(projects);
            });
        }
    }
});

document.getElementById("save-task-btn").addEventListener("click", async () => {
    const taskName = document.getElementById("new-task-input").value.trim();
    if (taskName && currentProject.id) {
        let createdTask = await createTask(currentProject.id, taskName);
        document.getElementById("new-task-input").value = "";
        if (createdTask) {
            total.tasks++;
            addTask(createdTask);
            UpdateTotalTasks();
        } else {
            // Optionally, you can refresh the task list if the API doesn't return the created task
            fetchProjectTasks(currentProject.id).then((tasks) => {
                renderTaskList(tasks);
            });
        }
    }
});
