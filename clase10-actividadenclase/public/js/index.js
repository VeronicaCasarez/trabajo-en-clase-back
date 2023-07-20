const socket = io();

function appendMessage(message) {
  const messagesDiv = document.getElementById('messagesDiv');
  const p = document.createElement('p');
  p.textContent = message.socketid + ': ' + message.mensaje;
  messagesDiv.appendChild(p);
}

socket.on('messages', (messages) => {
  const messagesDiv = document.getElementById('messagesDiv');
  messagesDiv.innerHTML = '';
  messages.forEach((message) => {
    appendMessage(message);
  });
});

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;
  if (message.trim() !== '') {
    socket.emit('newMessage', message);
    messageInput.value = '';
  }
}
