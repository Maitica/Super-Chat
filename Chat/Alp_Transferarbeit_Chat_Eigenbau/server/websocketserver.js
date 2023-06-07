const WebSocket = require("ws");
const redis = require("redis");
let publisher;

const clients = [];
const usernames = [];

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
  // await publisher.publish("newMessage", "Hello from Redis!");
};

// If a new connection is established, the onConnection function is called
const onConnection = (ws) => {
  console.log("New websocket connection");

  // Send the current list of usernames to the new client
  sendCurrentData(ws);

  ws.on("close", () => onClose(ws));
  ws.on("message", (message) => onClientMessage(ws, message));
  ws.send("Hello Client!");

  clients.push(ws); // Add the client to the clients array
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
  const messageObject = JSON.parse(message);
  const username = messageObject.username;
  const messageContent = messageObject.message;
  const redisData = {
    username: username,
    message: messageContent
  };

  // Überprüfen, ob der Benutzername bereits in der Liste enthalten ist
  if (!usernames.includes(username)) {
    usernames.push(username); // Hinzufügen des Benutzernamens zur Liste der aktiven Benutzernamen

    clients.forEach((client) => {
      const dataToSend = {
        usernames: usernames,
        message: messageObject
      };
      client.send(JSON.stringify(dataToSend)); // Send the message to all connected clients
    });
  }
};


// If a connection is closed, the onClose function is called
// ... bestehender Code ...

// If a connection is closed, the onClose function is called
const onClose = (ws) => {
  console.log("Websocket connection closed");
  const index = clients.indexOf(ws);
  if (index !== -1) {
    clients.splice(index, 1); // Remove the client from the clients array

    // Remove the username from the usernames array
    const disconnectedUsername = usernames[index];
    const usernameIndex = usernames.indexOf(disconnectedUsername);
    if (usernameIndex !== -1) {
      usernames.splice(usernameIndex, 1); // Remove the username from the usernames array

      // Notify remaining clients about the disconnected user
      clients.forEach((client) => {
        const dataToSend = {
          usernames: usernames,
          message: { username: disconnectedUsername, message: "User disconnected" }
        };
        client.send(JSON.stringify(dataToSend)); // Send the updated user list to all connected clients
      });
    }
  }
};

// 

const sendCurrentData = (ws) => {
  const currentDataToSend = {
    usernames: usernames
  };
  ws.send(JSON.stringify(currentDataToSend));
};

const sendUserListUpdates = () => {
  clients.forEach((client) => {
    sendCurrentData(client);
  });
};

setInterval(sendUserListUpdates, 5000);



module.exports = { initializeWebsocketServer };
