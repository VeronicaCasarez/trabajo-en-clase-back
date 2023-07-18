const socket = io();

socket.on('connection', () => {
  console.log('Cliente conectado');
});

// Escuchar el evento "mensaje" desde el servidor
socket.on('mensaje', (message) => {
  const messageList = document.getElementById('message-list');
  const messageItem = document.createElement('li');
  messageItem.textContent = message;
  messageList.appendChild(messageItem);
});

const input = document.getElementById('message-input');
const button = document.getElementById('send-button');

// Enviar mensaje al hacer clic en el botón 'Enviar'
button.addEventListener('click', () => {
  const message = input.value;
  if (message) {
    socket.emit('mensaje', message); // Enviar el mensaje al servidor
    input.value = '';
  }
});
