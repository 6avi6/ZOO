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


// Funkcja aktualizacji użytkownika z formularza
async function updateUserFromInput() {
  const username = document.getElementById('updateUsername').value;
  const firstName = document.getElementById('updateFirstName').value;
  const lastName = document.getElementById('updateLastName').value;
  const email = document.getElementById('updateEmail').value;
  const role = document.getElementById('updateRole').value;
  const hireDate = document.getElementById('updateHireDate').value;

  // Budujemy obiekt tylko z niepustych pól
  const updateData = {};
  if (username) updateData.username = username;
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (email) updateData.email = email;
  if (role) updateData.role = role;
  if (hireDate) updateData.hireDate = hireDate;

  if (Object.keys(updateData).length === 0) {
    alert("Wypełnij przynajmniej jedno pole do aktualizacji.");
    return;
  }

  const res = await authorizedFetch(`${API}/user/me`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });

  if (res.ok) {
    const updatedUser = await res.json();
    alert(`Użytkownik zaktualizowany: Username: ${updatedUser.username}
                        \nRola: ${updatedUser.role}
                        \nImię: ${updatedUser.firstName} 
                        \nNazwisko: ${updatedUser.lastName}
                        \nEmail: ${updatedUser.email}
                        \nData zatrudnienia: ${updatedUser.hireDate}`);
  } else if (res.status === 404) {
    alert("Nie znaleziono użytkownika do zaktualizowania.");
  } else if (res.status === 401) {
    alert("Brak dostępu. Zaloguj się ponownie.");
    window.location.href = 'login.html'; // Przekierowanie do logowania
  } else {
    alert("Błąd podczas aktualizacji użytkownika.");
  }
}

// Funkcja do pobierania danych użytkownika
async function getProfile() {
  const res = await authorizedFetch(`${API}/user/me`);
  if (!res.ok) {
    alert("Błąd przy pobieraniu danych użytkownika.");
    return;
  }
  const data = await res.json();
  alert(`Zalogowany jako: ${data.username}
                        \nRola: ${data.role}
                        \nImię: ${data.firstName} 
                        \nNazwisko: ${data.lastName}
                        \nEmail: ${data.email}
                        \nData zatrudnienia: ${data.hireDate}`);
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

// admin - aktualizacja użytkownika
async function updateUser(id, updateData) {
  const res = await authorizedFetch(`${API}/admin/user/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });

  if (res.ok) {
    const updatedUser = await res.json();
    alert(`Użytkownik zaktualizowany:\nUsername: ${updatedUser.username}\nRola: ${updatedUser.role}`);
  } else if (res.status === 404) {
    alert("Użytkownik nie istnieje.");
  } else {
    alert("Błąd podczas aktualizacji użytkownika.");
  }
}

// admin - usuwanie użytkownika
async function deleteUser(id) {
  const res = await authorizedFetch(`${API}/admin/user/${id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const message = await res.text();
    alert(message);
  } else if (res.status === 404) {
    alert("Użytkownik nie istnieje.");
  } else {
    alert("Błąd podczas usuwania użytkownika.");
  }
}

    // Funkcja wywoływana po kliknięciu przycisku usuń
    function deleteUserFromInput() {
      const id = document.getElementById('deleteUserId').value;
      if (id) {
        deleteUser(id);
      } else {
        alert("Podaj ID użytkownika do usunięcia.");
      }
    }

    // Funkcja wywoływana po kliknięciu przycisku aktualizacji
    function updateUserFromInputAdmin() {
      const id = document.getElementById('updateUserIdA').value;
      const username = document.getElementById('updateUsernameA').value;
      const firstName = document.getElementById('updateFirstNameA').value;
      const lastName = document.getElementById('updateLastNameA').value;
      const email = document.getElementById('updateEmailA').value;
      const role = document.getElementById('updateRoleA').value;
      const hireDate = document.getElementById('updateHireDateA').value;

      if (!id) {
        alert("Podaj ID użytkownika do aktualizacji.");
        return;
      }

      // Budujemy obiekt tylko z niepustych pól
      const updateData = {};
      if (username) updateData.username = username;
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (hireDate) updateData.hireDate = hireDate;

      if (Object.keys(updateData).length === 0) {
        alert("Wypełnij przynajmniej jedno pole do aktualizacji.");
        return;
      }

      updateUser(id, updateData);
    }