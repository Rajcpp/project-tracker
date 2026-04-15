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

document.addEventListener("DOMContentLoaded", () => {
  fetchProjects().then((projects) => {
    project_list.innerHTML = "";
    renderProjectList(projects);
  });
});

project_list.addEventListener("click", (event) => {
  if (event.target.classList.contains("project-item")) {
    const projectId = event.target.dataset.projectId;
    currentProject.id = projectId;
    currentProject.name = event.target.dataset.projectName;

    hideEmptyState();
    CurrentprojectNameRender();
    fetchProjectTasks(projectId).then((tasks) => {
      task_list.innerHTML = "";
      renderTaskList(tasks);
    });
  }
});

task_list.addEventListener("change", (event) => {
  if (event.target.matches("input[type='checkbox']")) {
    let taskId = event.target.dataset.taskId;
    let projectId = currentProject.id;
    if (taskId !== undefined) {
      console.log(`Task ID: ${taskId}, Checked: ${event.target.checked}`);
      updateTaskStatus(projectId, taskId).then((updatedTask) => {
        console.log(`Updated Task: ${JSON.stringify(updatedTask)}`);
        // Optionally, you can update the task status in the UI immediately
        fetchProjectTasks(currentProject.id).then((task_list) => {
          renderTaskList(task_list);
        });
      });
    } else {
      console.error("Task ID not found in dataset");
    }
  }
});
