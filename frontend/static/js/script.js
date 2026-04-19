import { fetchProjects, fetchProjectTasks, updateTaskStatus } from "./api.js";
import {
  hideEmptyState,
  showEmptyState,
  currentProject,
  CurrentprojectNameRender,
  renderProjectList,
  renderTaskList,
} from "./components.js";

const project_list = document.getElementById("projects-list");
const task_list = document.getElementById("tasks-list");

onload = () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
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

task_list.addEventListener("click", (event) => {
  // Handle checkbox click
  const checkbox = event.target.closest('.task-checkbox');
  if (checkbox && !event.target.classList.contains('delete-btn')) {
    const taskItem = checkbox.closest('.task-item');
    if (!taskItem.classList.contains('confirming')) {
      let taskId = checkbox.dataset.taskId;
      let projectId = currentProject.id;
      if (taskId !== undefined) {
        console.log(`Task ID: ${taskId}`);
        updateTaskStatus(projectId, taskId).then((updatedTask) => {
          console.log(`Updated Task: ${JSON.stringify(updatedTask)}`);
          fetchProjectTasks(currentProject.id).then((task_list) => {
            renderTaskList(task_list);
          });
        });
      } else {
        console.error("Task ID not found in dataset");
      }
    }
  }
});