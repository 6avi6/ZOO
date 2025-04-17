const API_URL = 'http://localhost:8083/auth';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password}),
        credentials: 'include' 
      });

      const result = await response.json();
      const msgDiv = document.getElementById('login-message');
      if (response.ok) {
        msgDiv.innerText = 'Zalogowano pomyślnie!';
        window.location.href = 'dashboard.html';
        localStorage.setItem('accessToken', result.accessToken);
      } else {
        msgDiv.innerText = 'Błąd logowania';
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('register-username').value;
      const password = document.getElementById('register-password').value;
      const role = document.getElementById('register-role').value;

      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });

      const msgDiv = document.getElementById('register-message');
      console.log(response.body)
      if (response.ok) {
        msgDiv.innerText = 'Rejestracja zakończona sukcesem!';
        setTimeout(() => {
            window.location.href = 'login.html';
          }, 1500)
      } else {
        msgDiv.innerText = 'Błąd rejestracji';
      }
    });
  }
});
