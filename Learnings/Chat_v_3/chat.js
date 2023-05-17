// Chat-Verlauf speichern
let chatHistory = [];

// Chat-Container und Eingabe-Elemente auswählen
const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

// Funktion, um eine neue Nachricht zum Chat-Verlauf hinzuzufügen
function addMessage(message) {
    chatHistory.push(message);
    chatContainer.innerHTML += `<div>${message}</div>`;
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Event-Listener für das Absenden des Chat-Formulars
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatInput.value;
    addMessage(message);
    chatInput.value = '';
});