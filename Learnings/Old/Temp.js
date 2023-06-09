const WebSocket = require("ws");
const redis = require("redis");

let publisher;
const clients = [];
let usernames = [];

// Initiate the websocket server
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

  clients.push(ws);
  ws.send(JSON.stringify({ usernames })); // Send the usernames to the connected client
};

// If a new message is received, the onClientMessage function is called
const onClientMessage = (ws, message) => {
  console.log("Message received: " + message);
  let messageData = JSON.parse(message);
  let username = messageData.username;
  let messageContent = messageData.message;
  let redisData = {
    username: username,
    message: messageContent,
  };
  publisher.publish("newMessage", JSON.stringify(redisData));
};

// If a new message from the redis channel is received, the onRedisMessage function is called
const onRedisMessage = (channel, message) => {
  console.log("Message received from Redis channel: " + message);
  const messageobject = JSON.parse(message);
  usernames.push(messageobject.username);
  clients.forEach((client) => {
    client.send(JSON.stringify({ usernames, message })); // Send the message and updated usernames to all connected clients
  });
};

// If a connection is closed, the onClose function is called
const onClose = (ws) => {
  console.log("Websocket connection closed");
  const index = clients.indexOf(ws);
  if (index !== -1) {
    clients.splice(index, 1);
  }
};

module.exports = { initializeWebsocketServer };
