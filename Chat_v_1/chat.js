// Verbindung zum Websocket-Server herstellen
const socket = new WebSocket('ws://127.0.0.1:5555');

// Chatnachrichten ausgeben
const chatBox = document.getElementById('chatBox');
function outputMessage(message) {
 const p = document.createElement('p');
 p.innerText = message;
 chatBox.appendChild(p);
}

// Nachrichten senden
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
sendButton.addEventListener('click', () => {
 const message = messageInput.value;
 if (message.trim() !== '') {
   socket.send(message);
   messageInput.value = '';
 }
});

// Nachrichten empfangen
socket.addEventListener('message', event => {
 const message = event.data;
 outputMessage(message);
});