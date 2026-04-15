import { fetchProjects, fetchProjectTasks} from './api.js';
import { hideEmptyState, showEmptyState, currentProject, CurrentprojectNameRender, renderProjectList, renderTaskList } from './components.js';

const project_list = document.getElementById('projects-list');
const task_list = document.getElementById('tasks-list');

document.addEventListener('DOMContentLoaded', () => {
    fetchProjects().then(projects => {
        project_list.innerHTML = '';
        renderProjectList(projects);
    });
});

project_list.addEventListener('click', (event) => {
    if (event.target.classList.contains('project-item')) {
        const projectId = event.target.dataset.projectId;
        currentProject.id = projectId;
        currentProject.name = event.target.dataset.projectName;

        hideEmptyState();
        CurrentprojectNameRender();
        fetchProjectTasks(projectId).then(tasks => {
            task_list.innerHTML = '';
            renderTaskList(tasks);
        });
    }
});