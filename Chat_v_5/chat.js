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
