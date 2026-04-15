export let currentProject = { id: null, name: null };

export function renderProjectList(projects) {
    const project_list = document.getElementById('projects-list');
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
}

export function renderTaskList(tasks) {
    const task_list = document.getElementById('tasks-list');
    task_list.innerHTML = '';
    UpdateTotalTasks(tasks.length);
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.dataset.taskId = task.id;
        taskItem.className = 'task-item';
        taskItem.textContent = `${task.title}`;
        if (task.completed == true) {
            taskItem.classList.add('completed');
        }
        task_list.appendChild(taskItem);
    });
}

export function CurrentprojectNameRender() {
    document.getElementById("current-project-title").textContent = currentProject.name;
}

export function UpdateTotalTasks(num) {
    document.getElementById("total-tasks").textContent = num;
}

export function UpdateTotalProjects(num) {
    document.getElementById("total-projects").textContent = num;
}

export function hideEmptyState() {
    document.getElementById('empty-state').classList.add('hidden');
    document.getElementById('project-view').classList.remove('hidden');
}

export function showEmptyState() {
    document.getElementById('empty-state').classList.remove('hidden');
    document.getElementById('project-view').classList.add('hidden');
}

export function hideProjectForm() {
    document.getElementById('new-project-form').classList.add('hidden');
}

export function showProjectForm() {
    document.getElementById('new-project-form').classList.remove('hidden');
}

export function showTaskForm() {
    document.getElementById('new-task-form').classList.remove('hidden');
}

export function hideTaskForm() {
    document.getElementById('new-task-form').classList.add('hidden');
}

export function Default() {
    showEmptyState();
    hideProjectForm();
    hideTaskForm();
    currentProject = { id: null, name: null };
}