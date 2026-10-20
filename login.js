function safeFetch(url, options) {
    return fetch(url, options)
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
            return res.json().catch(() => res.text());
        });
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


        let data;
        if (typeof response === 'string') {
            try {
                data = JSON.parse(response);
            } catch {
                data = {};
            }
        } else {
            data = response;
        }

        const token = data.token || data;

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
        console.error('Login error:', error);
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Invalid username or password';
    }
});