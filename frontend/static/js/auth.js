export function login(username, password) {
    return fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Login failed");
        }
        return response.json();
    });
}

export function register(username, password) {
    return fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Registration failed");
        }
        return response.json();
    });
}

export function logout() {
    localStorage.removeItem("token");
}

export function getToken() {
    return localStorage.getItem("token");
}

export function isAuthenticated() {
    return !!getToken();
}