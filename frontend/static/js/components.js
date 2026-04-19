export let currentProject = { id: null, name: null };

export function renderProjectList(projects) {
    const project_list = document.getElementById('projects-list');
    project_list.innerHTML = '';
    UpdateTotalProjects(projects.length);
    projects.forEach(project => {
        addProject(project);
    });
}

export function renderTaskList(tasks) {
    const task_list = document.getElementById('tasks-list');
    task_list.innerHTML = '';
    let uncompletedCount = tasks.filter(task => !task.completed).length;
    UpdateTotalTasks(uncompletedCount);
    tasks.forEach(task => {
        addTask(task);
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

export function addTask(task) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    if (task.completed == true) {
        taskItem.classList.add('completed');
    }
    
    // Create task content wrapper
    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';
    
    const checkBox = document.createElement('div');
    checkBox.className = 'task-checkbox';
    checkBox.dataset.taskId = task.id;
    
    if (task.completed) {
        const checkMark = document.createElement('span');
        checkMark.className = 'task-checkbox-check';
        checkMark.textContent = '✓';
        checkBox.appendChild(checkMark);
    }
    
    const taskTitle = document.createElement('span');
    taskTitle.textContent = task.title;
    taskTitle.className = 'task-title';
    
    taskContent.appendChild(checkBox);
    taskContent.appendChild(taskTitle);
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.dataset.taskId = task.id;
    deleteBtn.dataset.taskTitle = task.title;
    deleteBtn.setAttribute('aria-label', 'Delete task');
    
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteBtn);
    task_list.appendChild(taskItem);
}

export function addProject(project) {
    const projectItem = document.createElement('li');
    projectItem.dataset.projectId = project.id;
    projectItem.dataset.projectName = project.name;
    projectItem.className = 'project-item';
    
    // Create project content wrapper
    const projectContent = document.createElement('div');
    projectContent.className = 'project-content';
    projectContent.textContent = project.name;
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.dataset.projectId = project.id;
    deleteBtn.dataset.projectName = project.name;
    deleteBtn.setAttribute('aria-label', 'Delete project');
    
    projectItem.appendChild(projectContent);
    projectItem.appendChild(deleteBtn);
    project_list.appendChild(projectItem);
}
