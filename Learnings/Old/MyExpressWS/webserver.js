const express = require('express');
const expressWs = require('express-ws');

const app = express();
const expressWsInstance = expressWs(app);

// WebSocket-Endpunkt
app.ws('/websocket', (ws, req) => {
  ws.on('message', (msg) => {
    console.log('Nachricht empfangen:', msg);
    ws.send('Nachricht erhalten: ' + msg);
  });
});

// Starten Sie den Server
app.listen(3000, () => {
  console.log('Express WebSocket-Server läuft auf Port 3000');
});
