import {
  deleteProject,
  deleteTask,
  fetchProjects,
  fetchProjectTasks,
} from "./api.js";
import {
  renderProjectList,
  renderTaskList,
  currentProject,
  showEmptyState,
} from "./components.js";

const project_list = document.getElementById("projects-list");
const task_list = document.getElementById("tasks-list");

// Project Delete Handler
project_list.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete-btn");
  if (!deleteBtn) return;

  event.stopPropagation(); // Prevent project selection

  const projectItem = deleteBtn.closest(".project-item");
  const projectId = deleteBtn.dataset.projectId;
  const projectName = deleteBtn.dataset.projectName;

  // If already in confirming state, ignore
  if (projectItem.classList.contains("confirming")) return;

  // Show confirmation state
  showProjectConfirmation(projectItem, projectId, projectName);
});

// Task Delete Handler
task_list.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete-btn");
  if (!deleteBtn) return;

  event.stopPropagation(); // Prevent checkbox toggle

  const taskItem = deleteBtn.closest(".task-item");
  const taskId = deleteBtn.dataset.taskId;
  const taskTitle = deleteBtn.dataset.taskTitle;

  // If already in confirming state, ignore
  if (taskItem.classList.contains("confirming")) return;

  // Show confirmation state
  showTaskConfirmation(taskItem, taskId, taskTitle);
});

function showProjectConfirmation(projectItem, projectId, projectName) {
  // Add confirming class
  projectItem.classList.add("confirming");

  // Save original content
  const originalContent = projectItem.innerHTML;

  // Create confirmation UI
  const confirmDiv = document.createElement("div");
  confirmDiv.className = "confirm-delete";

  const confirmText = document.createElement("span");
  confirmText.className = "confirm-text";
  confirmText.textContent = `Delete "${projectName}"?`;

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "confirm-actions";

  const confirmBtn = document.createElement("button");
  confirmBtn.className = "btn btn-confirm";
  confirmBtn.textContent = "Delete";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn btn-cancel-delete";
  cancelBtn.textContent = "Cancel";

  actionsDiv.appendChild(confirmBtn);
  actionsDiv.appendChild(cancelBtn);

  confirmDiv.appendChild(confirmText);
  confirmDiv.appendChild(actionsDiv);

  projectItem.innerHTML = "";
  projectItem.appendChild(confirmDiv);

  // Confirm delete
  confirmBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    try {
      await deleteProject(projectId);

      // If deleted project was selected, show empty state
      if (currentProject.id == projectId) {
        showEmptyState();
        currentProject.id = null;
        currentProject.name = null;
      }

      // Re-fetch and render projects
      const projects = await fetchProjects();
      renderProjectList(projects);
    } catch (error) {
      console.error("Error deleting project:", error);
      // Restore original content on error
      projectItem.classList.remove("confirming");
      projectItem.innerHTML = originalContent;
    }
  });

  // Cancel delete
  cancelBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    projectItem.classList.remove("confirming");
    projectItem.innerHTML = originalContent;
  });
}

function showTaskConfirmation(taskItem, taskId, taskTitle) {
  // Add confirming class
  taskItem.classList.add("confirming");

  // Save original content
  const originalContent = taskItem.innerHTML;

  // Create confirmation UI
  const confirmDiv = document.createElement("div");
  confirmDiv.className = "confirm-delete";

  const confirmText = document.createElement("span");
  confirmText.className = "confirm-text";
  confirmText.textContent = `Delete "${taskTitle}"?`;

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "confirm-actions";

  const confirmBtn = document.createElement("button");
  confirmBtn.className = "btn btn-confirm";
  confirmBtn.textContent = "Delete";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn btn-cancel-delete";
  cancelBtn.textContent = "Cancel";

  actionsDiv.appendChild(confirmBtn);
  actionsDiv.appendChild(cancelBtn);

  confirmDiv.appendChild(confirmText);
  confirmDiv.appendChild(actionsDiv);

  taskItem.innerHTML = "";
  taskItem.appendChild(confirmDiv);

  // Confirm delete
  confirmBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    try {
      await deleteTask(currentProject.id, taskId);

      // Re-fetch and render tasks
      const tasks = await fetchProjectTasks(currentProject.id);
      renderTaskList(tasks);
    } catch (error) {
      console.error("Error deleting task:", error);
      // Restore original content on error
      taskItem.classList.remove("confirming");
      taskItem.innerHTML = originalContent;
    }
  });

  // Cancel delete
  cancelBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    taskItem.classList.remove("confirming");
    taskItem.innerHTML = originalContent;
  });
}
