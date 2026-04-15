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
    let uncompletedCount = tasks.filter(task => !task.completed).length;
    UpdateTotalTasks(uncompletedCount);
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        const taskTitle = document.createElement('span');
        const checkBox = document.createElement('input');

        checkBox.type = 'checkbox';
        checkBox.className = 'task-checkbox';

        checkBox.checked = task.completed;
        taskTitle.textContent = task.title;

        taskTitle.className = 'task-title';

        taskItem.appendChild(taskTitle);
        taskItem.appendChild(checkBox);

        checkBox.dataset.taskId = task.id;
        console.log(`${checkBox.dataset.taskId}`);

        taskItem.className = 'task-item';
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