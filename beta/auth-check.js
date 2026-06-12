async function verifyAccess() {
    const token = localStorage.getItem('3d_auth_token');

    // 1. If no token exists, send them to login immediately
    if (!token) {
        window.location.href = '/beta/login.html';
        return;
    }

    try {
        // 2. Ask the server if this token is actually valid
        const response = await fetch('/api/auth/verify', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            // Token is fake or expired
            localStorage.removeItem('3d_auth_token');
            window.location.href = '/beta/login.html';
        } else {
            // SUCCESS: Show the hidden content
            const protectedElements = document.querySelectorAll('.protected-content');
            protectedElements.forEach(el => el.style.display = 'block');
            console.log("Access Granted");
        }
    } catch (err) {
        console.error("Auth server unreachable");
    }
}

// Run this as soon as the script loads
verifyAccess();

