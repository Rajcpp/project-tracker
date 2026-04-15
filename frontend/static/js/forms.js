import { createProject, createTask, fetchProjectTasks, fetchProjects } from "./api.js";
import { showProjectForm, showTaskForm, currentProject, renderProjectList, renderTaskList, hideProjectForm, hideTaskForm } from "./components.js";

document.getElementById('add-project-btn').addEventListener('click', () => {
    showProjectForm();
});

document.getElementById('add-task-btn').addEventListener('click', () => {
    showTaskForm();
});

document.getElementById('cancel-project-btn').addEventListener('click', () => {
    document.getElementById('project-name').value = '';
    hideProjectForm();
});

document.getElementById('cancel-task-btn').addEventListener('click', () => {
    document.getElementById('task-name').value = '';
    hideTaskForm();
});

document.getElementById('save-project-btn').addEventListener('click', () => {
    const projectName = document.getElementById('new-project-input').value.trim();
    if (projectName) {
        createProject(projectName).then(newProject => {
            // Optionally, you can add the new project to the UI immediately
            document.getElementById('new-project-input').value = '';
            // You might want to refresh the project list here
            fetchProjects().then(projects => {
                renderProjectList(projects);
            });
        });
    }
});

document.getElementById('save-task-btn').addEventListener('click', () => {
    const taskName = document.getElementById('new-task-input').value.trim();
    if (taskName && currentProject.id) {
        createTask(currentProject.id, taskName).then(newTask => {
            // Optionally, you can add the new task to the UI immediately
            document.getElementById('new-task-input').value = '';
            // You might want to refresh the task list here
            fetchProjectTasks(currentProject.id).then(tasks => {
                renderTaskList(tasks);
            });
        });
    }   
});