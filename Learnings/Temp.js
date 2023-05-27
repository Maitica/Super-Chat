const WebSocket = require("ws");
const redis = require("redis");

const socket = new WebSocket("ws://localhost:3000");
let publisher;
const clients = [];

socket.addEventListener("open", (event) => {
  console.log("WebSocket connected!");
});

socket.addEventListener("message", (event) => {
  console.log(`Received message: ${event.data}`);
});

socket.addEventListener("close", (event) => {
  console.log("WebSocket closed.");
});

socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
});

function sendToServer() {
  let clientChat = document.getElementById("usermsg").value;
  socket.send(clientChat);
  console.log();
}

const initializeWebsocketServer = async (server) => {
  const client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || "6379",
    },
  });
  const subscriber = client.duplicate();
  await subscriber.connect();
  publisher = client.duplicate();
  await publisher.connect();

  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
  websocketServer.on("error", console.error);
  await subscriber.subscribe("newMessage", onRedisMessage);
  await publisher.publish("newMessage", "Hello from Redis!");
};

const onConnection = (ws) => {
  console.log("New websocket connection");
  ws.on("close", () => onClose(ws));
  ws.on("message", (message) => onClientMessage(ws, message));
  ws.send("Hello Client!");

  clients.push(ws); // Add the client to the clients array
};

const onClientMessage = (ws, message) => {
  console.log("Message received: " + message);
  publisher.publish("newMessage", message); // Send the message to the redis channel
};

const onRedisMessage = (channel, message) => {
  console.log("Message received from Redis channel: " + message);
  clients.forEach((client) => {
    client.send(message); // Send the message to all connected clients
  });
};

const onClose = (ws) => {
  console.log("Websocket connection closed");
  const index = clients.indexOf(ws);
  if (index !== -1) {
    clients.splice(index, 1); // Remove the client from the clients array
  }
};

module.exports = { initializeWebsocketServer };
