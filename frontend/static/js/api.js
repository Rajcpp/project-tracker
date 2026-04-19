import { getToken } from "./auth.js";

export async function fetchProjects() {
    try {
        const response = await fetch('/api/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

export async function fetchProjectTasks(projectId) {
    try {
        const response = await fetch(`/api/projects/${projectId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching project tasks:', error);
        throw error;
    }
}

export async function createProject(projectName) {
    try {
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
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

export async function createTask(projectId, taskName) {
    try {
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({title: taskName })
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

export async function updateTaskStatus(projectId, taskId) {
    //console.log(`Updating task status for Task ID: ${taskId} in Project ID: ${projectId}`);
    //console.log(`url: /api/projects/${projectId}/tasks/${taskId}`);
    try {
        const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({ task_id: taskId })
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error updating task status:', error);
        throw error;
    }
}

export async function deleteProject(projectId) {
    try {
        const response = await fetch(`/api/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}

export async function deleteTask(projectId, taskId) {
    try {
        const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}