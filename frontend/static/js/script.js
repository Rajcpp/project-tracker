const app = document.getElementById('app');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/projects');
        const data = await response.json();
        app.textContent = `Data from API: ${data.message}`;
    } catch (error) {
        console.error('Error fetching data:', error);
        app.textContent = 'Failed to load data.';
    }
});
