async function safeFetch(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = new Error('Authentication request failed');
        error.status = response.status;
        throw error;
    }

    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}



document.getElementById('loginForm').addEventListener('submit', async(e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');

    try {
        // Clear any existing token
        sessionStorage.removeItem('jwt');

        const credentials = btoa(`${username}:${password}`);

        const response = await safeFetch('https://learn.reboot01.com/api/auth/signin', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });


        const token = typeof response === 'string' ? response : response?.token;

        if (!token || typeof token !== 'string') {
            throw new Error('No token received from server');
        }

        // Store token and verify storage
        sessionStorage.setItem('jwt', token);
        const storedToken = sessionStorage.getItem('jwt');

        if (!storedToken) {
            throw new Error('Failed to store token in session storage');
        }

        // Use replace to prevent back button from returning to login

        window.location.replace('profile.html');

    } catch (error) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = error.status === 401 || error.status === 403
            ? 'Invalid username or password'
            : 'Unable to sign in. Please check your connection and try again.';
    }
});
