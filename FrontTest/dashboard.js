const API = 'http://localhost:8083/api';

// autoryzowane fetch z tokenem i obsługą 401
async function authorizedFetch(url, options = {}, retry = true) {
  const token = localStorage.getItem('accessToken');
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`
  };

  let response = await fetch(url, {
    ...options,
    credentials: 'include'
  });

  console.log(response.status);

  if (response.status === 401 && retry) {
    console.log("Token wygasł, odświeżam...");
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return authorizedFetch(url, options, false);
    } else {
      alert("Sesja wygasła. Zaloguj się ponownie.");
      window.location.href = 'login.html';
    }
  } else if (response.status === 403) {
    alert("Brak dostępu do tej funkcji");
  }

  return response;
}

// odśwież tokena
async function refreshAccessToken() {
  const res = await fetch(`${API}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });
  console.log("Refresh status:", res.status)
  if (res.ok) {
    const data = await res.json();
    localStorage.setItem('accessToken', data.accessToken);
    return true;
  }
  return false;
}

// dane użytkownika /api/me
async function getProfile() {
  const res = await authorizedFetch(`${API}/me`);
  const data = await res.json();
  alert(`Zalogowany jako: ${data.username}\nRola: ${data.role}`);
}

// hello endpoint ogólny
async function getHello() {
  const res = await fetch(`${API}/hello`);
  const text = await res.text();
  alert(text);
}

// hello dla ról
async function getHelloRole(role) {
  const res = await authorizedFetch(`${API}/hello/${role}`);
  const text = await res.text();
  alert(text);
}

// admin /users
async function getUsers() {
  const res = await authorizedFetch(`${API}/admin/users`);
  if (res.ok) {
    const users = await res.json();
    let msg = "Użytkownicy:\n";
    users.forEach(user => {
      msg += `- ${user.id}: ${user.username} (${user.role})\n`;
    });
    alert(msg);
  } else {
    alert("Brak uprawnień lub błąd serwera.");
  }
}
