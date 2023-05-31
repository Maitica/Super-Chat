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
    let usernameInput = document.getElementById("username");
    let messageInput = document.getElementById("usermsg");
    let username = usernameInput.value;
    let message = messageInput.value;
    let data = {
      username: username,
      message: message
    };
    socket.send(JSON.stringify(data));
    messageInput.value = "";
  }

  function displayMessage(data) {
    console.log(JSON.parse(data))
    let messagesDiv = document.getElementById("messages");
    let messageElement = document.createElement("p");
    let messageData = JSON.parse(data);
    let username = messageData.message.username;
    let message = messageData.message.message;
    messageElement.textContent = username + ": " + message;
    messagesDiv.appendChild(messageElement);
  }


