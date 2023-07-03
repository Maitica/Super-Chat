const WebSocket = require('ws');


// WebSocket-Server erstellen
const wss = new WebSocket.Server({ port: 3000 });

// Event-Handler für eingehende Verbindungen
wss.on('connection', function connection(ws) {
  // Wenn eine Verbindung hergestellt wird, sende "Hello, World!" an den Client
  ws.send('Hello, World!');

  // Event-Handler für eingehende Nachrichten vom Client
  ws.on('message', function incoming(message) {
    console.log('Received message:', message);
  });
});