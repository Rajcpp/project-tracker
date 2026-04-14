const project_list = document.getElementById('projects-list');
const task_list = document.getElementById('tasks-list');
const project_name_input = document.getElementById('project-name');
const task_name_input = document.getElementById('task-name');
const create_project_btn = document.getElementById('create-project-btn');
const create_task_btn = document.getElementById('create-task-btn');

let currentProject = { id: null, name: null };

async function fetchProjects() {
    try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

async function fetchProjectTasks(projectId) {
    try {
        const response = await fetch(`/api/projects/${projectId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching project tasks:', error);
        throw error;
    }
}

async function createProject(projectName) {
    try {
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: projectName })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

async function createTask(projectId, taskName) {
    try {
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: taskName })
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

async function updateTaskStatus(taskId, status) {
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error updating task status:', error);
        throw error;
    }
}

function hideEmptyState() {
    document.getElementById('empty-state').classList.add('hidden');
    document.getElementById('project-view').classList.remove('hidden');
}

function CurrentprojectNameRender() {
    document.getElementById("current-project-title").textContent = currentProject.name;
}

function UpdateTotalTasks(num) {
    document.getElementById("total-tasks").textContent = num;
}

function UpdateTotalProjects(num) {
    document.getElementById("total-projects").textContent = num;
}
function PopulateProjectList() {
    fetchProjects().then(projects => {
        project_list.innerHTML = '';
        UpdateTotalProjects(projects.length);
        projects.forEach(project => {
            const projectItem = document.createElement('li');
            projectItem.dataset.projectId = project.id;
            projectItem.dataset.projectName = project.name;
            projectItem.className = 'project-item';
            projectItem.textContent = project.name;
            project_list.appendChild(projectItem);
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // Example usage:
    PopulateProjectList();
});

project_list.addEventListener('click', (event) => {
    if (event.target.classList.contains('project-item')) {
        const projectId = event.target.dataset.projectId;
        currentProject = { id: projectId, name: event.target.dataset.projectName };

        hideEmptyState();
        CurrentprojectNameRender();
        fetchProjectTasks(projectId).then(tasks => {
            task_list.innerHTML = '';
            UpdateTotalTasks(tasks.length);
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.dataset.taskId = task.id;
                taskItem.className = 'task-item';
                taskItem.textContent = `${task.title}`;
                if (task.status === 'completed') {
                    taskItem.classList.add('completed');
                }
                task_list.appendChild(taskItem);
            });
        });
    }
});