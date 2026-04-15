export async function fetchProjects() {
    try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

export async function fetchProjectTasks(projectId) {
    try {
        const response = await fetch(`/api/projects/${projectId}`);
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: taskName })
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

async function updateTaskStatus(taskId) {
    try {
        const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskId })
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error updating task status:', error);
        throw error;
    }
}