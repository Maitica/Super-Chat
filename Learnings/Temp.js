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
  let messagesDiv = document.getElementById("messages");
  let messageElement = document.createElement("p");
  let messageData = JSON.parse(data);
  let username = messageData.username;
  let message = messageData.message;
  messageElement.textContent = username + ": " + message;
  messagesDiv.appendChild(messageElement);
}

function displayActiveUsers(data) {
  let userList = document.getElementById("userList");
  userList.innerHTML = ""; // Clear previous user list

  let activeUsersData = JSON.parse(data);
  let activeUsers = activeUsersData.activeUsers;

  activeUsers.forEach((username) => {
    let userItem = document.createElement("li");
    userItem.textContent = username;
    userList.appendChild(userItem);
  });
}

const WebSocket = require("ws");
const redis = require("redis");
let publisher;

const clients = [];

// Intiiate the websocket server
const initializeWebsocketServer = async (server) => {
  const client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || "6379",
    },
  });
  // This is the subscriber part
  const subscriber = client.duplicate();
  await subscriber.connect();
  // This is the publisher part
  publisher = client.duplicate();
  await publisher.connect();

  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
  websocketServer.on("error", console.error);
  await subscriber.subscribe("newMessage", onRedisMessage);
  await publisher.publish("newMessage", "Hello from Redis!");
};

// If a new connection is established, the onConnection function is called
const onConnection = (ws) => {
  console.log("New websocket connection");
  ws.on("close", () => onClose(ws));
  ws.on("message", (message) => onClientMessage(ws, message));
  ws.send("Hello Client!");

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  ws.on("pong", () => {
    // Received a pong response from the client, indicating it's still active
    ws.isAlive = true;
  });

  ws.username = ""; // Initialize the username property

  clients.push(ws);
  sendActiveUsers(); // Send the active users to the client
};

// If a new message is received, the onClientMessage function is called
const onClientMessage = (ws, message) => {
  console.log("Message received: " + message);
  let messageData = JSON.parse(message);
  let username = messageData.username;
  let messageContent = messageData.message;
  let redisData = {
    username: username,
    message: messageContent
  };
  publisher.publish("newMessage", JSON.stringify(redisData));
};

// If a new message from the redis channel is received, the onRedisMessage function is called
const onRedisMessage = (message) => {
  console.log("Message received from Redis channel: " + message);
  clients.forEach((client) => {
    client.send(message);
  });
};

// If a connection is closed, the onClose function is called
const onClose = (ws) => {
  console.log("Websocket connection closed");
  const index = clients.indexOf(ws);
  if (index !== -1) {
    clients.splice(index, 1);
  }
  sendActiveUsers(); // Update the active users after a client is disconnected
};

// Send the active users to all connected clients
const sendActiveUsers = () => {
  let activeUsers = clients.map((client) => client.username); // Get the usernames from WebSocket connections
  let activeUsersData = {
    activeUsers: activeUsers
  };
  let activeUsersMessage = JSON.stringify(activeUsersData);
  clients.forEach((client) => {
    client.send(activeUsersMessage);
  });
};

// Get the username associated with a WebSocket connection
const getUsernameFromWebSocket = (ws) => {
  // Use the value from the username input field as the username
  let usernameInput = document.getElementById("username");
  return usernameInput.value;
};

module.exports = { initializeWebsocketServer };
