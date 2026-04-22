export let currentProject = { id: null, name: null };
export let total = { projects: 0, tasks: 0 };

export function renderProjectList(projects) {
    total.projects = 0;
    const project_list = document.getElementById('projects-list');
    project_list.innerHTML = '';
    projects.forEach(project => {
        addProject(project);
    });
}

export function renderTaskList(tasks) {
    total.tasks = 0;
    const task_list = document.getElementById('tasks-list');
    task_list.innerHTML = '';
    tasks.forEach(task => {
        addTask(task);
    });
}

export function CurrentprojectNameRender() {
    document.getElementById("current-project-title").textContent = currentProject.name;
}

export function UpdateTotalTasks() {
    document.getElementById("total-tasks").textContent = total.tasks;
}

export function UpdateTotalProjects() {
    document.getElementById("total-projects").textContent = total.projects;
}

export function renderTotals() {
    UpdateTotalProjects();
    UpdateTotalTasks();
}

export function showLoadingScreen() {
    document.getElementById('loading-screen').classList.remove('hidden');
}

export function hideLoadingScreen() {
    document.getElementById('loading-screen').classList.add('hidden');
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
    hideLoadingScreen();
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
    if (!task.completed) {
        checkBox.innerHTML = '';
        total.tasks++;
    }
    const taskTitle = document.createElement('span');
    taskTitle.textContent = task.title;
    taskTitle.className = 'task-title';
    const priorityIndicator = document.createElement('span');
    priorityIndicator.className = `task-priority ${task.priority}`;
    priorityIndicator.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    taskContent.appendChild(priorityIndicator);
    taskContent.appendChild(checkBox);
    taskContent.appendChild(taskTitle);
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.dataset.taskId = task.id;
    deleteBtn.dataset.taskTitle = task.title;
    deleteBtn.setAttribute('aria-label', 'Delete task');
    
    const task_list = document.getElementById('tasks-list');
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteBtn);
    task_list.appendChild(taskItem);
    UpdateTotalTasks();
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
    
    const project_list = document.getElementById('projects-list');
    projectItem.appendChild(projectContent);
    projectItem.appendChild(deleteBtn);
    total.projects++;
    project_list.appendChild(projectItem);
    UpdateTotalProjects();
}

export async function toggleLoading(isloading) {
    // instead of just showing a loading text, we can disable the task list and show a spinner or loading indicator
    if (isloading) {
        const task_list = document.getElementById('tasks-list');
        const loadingItem = document.createElement('li');
        loadingItem.className = 'loading';
        loadingItem.textContent = 'Updating...';
        task_list.appendChild(loadingItem);
    } else {
        const task_list = document.getElementById('tasks-list');
        const loadingItem = task_list.querySelector('.loading');
        if (loadingItem) {
            loadingItem.remove();
        }
    }
}