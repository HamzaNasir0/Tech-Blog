const API_BASE = '/api';

function storeUser(token, user) {
  localStorage.setItem(
    'techblog_token',
    token
  );
  localStorage.setItem(
    'techblog_user',
    JSON.stringify(user)
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    const status = document.getElementById('loginStatus');

    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      status.textContent = 'Signing in...';

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      try {
        const res = await fetch(`${API_BASE}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) {
          status.textContent = data.error || 'Login failed';
          return;
        }

        storeUser(data.token, data.user);
        status.textContent = 'Logged in! Redirecting...';
        window.location.href = 'admin.html';
      } catch (err) {
        console.error('Login error', err);
        status.textContent = 'Error logging in';
      }
    });
  }
  });