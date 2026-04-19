import { fetchProjects, fetchProjectTasks, updateTaskStatus } from "./api.js";
import {
  hideEmptyState,
  showEmptyState,
  currentProject,
  CurrentprojectNameRender,
  renderProjectList,
  renderTaskList,
  addProject,
  addTask,
} from "./components.js";
import { getToken, checkAuth } from "./auth.js";

const project_list = document.getElementById("projects-list");
const task_list = document.getElementById("tasks-list");

onload = async () => {
  if (!(await checkAuth())) {
    window.location.href = "/";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchProjects().then((projects) => {
    project_list.innerHTML = "";
    renderProjectList(projects);
  });
});

project_list.addEventListener("click", (event) => {
  // Handle project item click (not delete button)
  const projectItem = event.target.closest('.project-item');
  if (projectItem && !event.target.classList.contains('delete-btn') && !projectItem.classList.contains('confirming')) {
    const projectId = projectItem.dataset.projectId;
    currentProject.id = projectId;
    currentProject.name = projectItem.dataset.projectName;

    hideEmptyState();
    CurrentprojectNameRender();
    fetchProjectTasks(projectId).then((tasks) => {
      task_list.innerHTML = "";
      renderTaskList(tasks);
    });
  }
});

task_list.addEventListener("click", async (event) => {
  // Handle checkbox click
  const checkbox = event.target.closest('.task-checkbox');
  if (checkbox && !event.target.classList.contains('delete-btn')) {
    const taskItem = checkbox.closest('.task-item');
    if (!taskItem.classList.contains('confirming')) {
      let taskId = checkbox.dataset.taskId;
      let projectId = currentProject.id;
      if (taskId !== undefined) {
        //console.log(`Task ID: ${taskId}`);
        let updatedTask = await updateTaskStatus(projectId, taskId);
        //console.log(`Updated Task: ${JSON.stringify(updatedTask)}`);
        if (updatedTask.id == parseInt(taskId) && updatedTask.project_id == parseInt(projectId)) {
          if (updatedTask.completed) {
            taskItem.classList.add('completed');
            taskItem.querySelector('.task-checkbox').innerHTML = '<span class="task-checkbox-check">✓</span>';
          } else {
            taskItem.classList.remove('completed');
            taskItem.querySelector('.task-checkbox').innerHTML = '';
          }
        } else {
          console.error('Failed to update task status');
        };
      } else {
        console.error("Task ID not found in dataset");
      }
    }
  }
});