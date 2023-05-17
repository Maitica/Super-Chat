// Globale Variablen
let username = "";
let activeUsers = [];

// Benutzernamen erstellen oder ändern
function createOrChangeUsername() {
  const usernameInput = document.getElementById("usernameInput");
  const newUsername = usernameInput.value.trim();
  if (newUsername !== "") {
    username = newUsername;
    usernameInput.value = "";
    joinChatroom();
  }
}

// Chatraum betreten
function joinChatroom() {
  if (username !== "") {
    // Fügen Sie den Benutzer zur Liste der aktiven Benutzer hinzu
    activeUsers.push(username);
    updateActiveUsers();

    // Hier können Sie eine Verbindung zu einem Chat-Server herstellen
    // und den Benutzer dem Chatraum hinzufügen

    // Zum Testen fügen wir eine Beispielnachricht hinzu
    addMessage("System", "Willkommen im Chatraum!");

    // Fügen Sie weiteren Code hinzu, um Nachrichten vom Server zu empfangen
  }
}

// Nachrichten senden
function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();
  if (message !== "") {
    // Hier können Sie die Nachricht an den Chat-Server senden

    // Zum Testen fügen wir die Nachricht direkt zur Liste der Nachrichten hinzu
    addMessage(username, message);

    messageInput.value = "";
  }
}

// Neue Nachricht zur Liste hinzufügen
function addMessage(sender, message) {
  const messageList = document.getElementById("messages");
  const li = document.createElement("li");
  li.textContent = `${sender}: ${message}`;
  messageList.appendChild(li);
}

// Aktive Benutzer im Chat anzeigen
function updateActiveUsers() {
  const activeUsersList = document.getElementById("activeUsers");
  activeUsersList.innerHTML = "";

  activeUsers.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user;
    activeUsersList.appendChild(li);
  });
}
