const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", (event) => {
  console.log("WebSocket connected!");
});

socket.addEventListener("message", (event) => {
  displayMessage(event.data);
});

socket.addEventListener("close", (event) => {
  console.log("WebSocket closed.");
});

socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
});

function sendMessage() {
  let messageInput = document.getElementById("usermsg");
  let message = messageInput.value;
  socket.send(message);
  messageInput.value = "";
}

function displayMessage(message) {
  let messagesDiv = document.getElementById("messages");
  let messageElement = document.createElement("p");
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);
}

//Alter Teil
/*
var username = "";
var activeUsers = [];
var messages = [];

function createUsername() {
    var input = document.getElementById("username");
    var newUsername = input.value.trim();
    if (newUsername !== "") {
        username = newUsername;
        activeUsers.push(username);
        updateActiveUsers();
        input.value = "";
    } else {
        alert("Ungültiger Benutzername!");
    }
}

function changeUsername() {
    var input = document.getElementById("username");
    var newUsername = input.value.trim();
    if (newUsername !== "") {
        var index = activeUsers.indexOf(username);
        if (index > -1) {
            activeUsers[index] = newUsername;
            username = newUsername;
            updateActiveUsers();
            input.value = "";
        }
    } else {
        alert("Ungültiger Benutzername!");
    }
}

function sendMessage() {
    var input = document.getElementById("message");
    var message = input.value.trim();
    if (message !== "") {
        var messageObject = {
            username: username,
            message: message
        };
        messages.push(messageObject);
        updateMessageTiles();
        input.value = "";
    } else {
        alert("Bitte geben Sie eine Nachricht ein!");
    }
}

function updateActiveUsers() {
    var activeUsersDiv = document.getElementById("active-users");
    activeUsersDiv.innerHTML = "";
    for (var i = 0; i < activeUsers.length; i++) {
        var p = document.createElement("p");
        p.textContent = activeUsers[i];
        activeUsersDiv.appendChild(p);
    }
}

function updateMessageTiles() {
    var messageTilesDiv = document.getElementById("message-tiles");
    messageTilesDiv
.innerHTML = "";
for (var i = 0; i < messages.length; i++) {
var messageObject = messages[i];
var messageTile = document.createElement("div");
messageTile.classList.add("message-tile");
if (messageObject.username === username) {
messageTile.classList.add("sent-message");
} else {
messageTile.classList.add("received-message");
}
var p = document.createElement("p");
p.textContent = messageObject.username + ": " + messageObject.message;
messageTile.appendChild(p);
messageTilesDiv.appendChild(messageTile);
}
}
*/