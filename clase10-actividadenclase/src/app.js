import { engine } from "express-handlebars";
import express from "express";
import { __filename, __dirname } from './utils.js';
import viewsRoutes from "./routes/views.router.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { addMessage, getMessages } from "./utils.js";


const app = express();
const httpServer = createServer(app);

// Configurar el motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', `${__dirname}/views`);

// Configurar el directorio estático para archivos públicos
app.use(express.static("public"));

// Configurar el middleware para manejar las solicitudes JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar las rutas para las vistas
app.use("/", viewsRoutes);

// Configuración del lado del servidor
const io = new Server(httpServer);
// WebSocket
io.on('connection', (socket) => {
  // Send all messages to the connected client
  socket.emit('messages', getMessages());

  // Handle new messages from clients
  socket.on('newMessage', (message) => {
    addMessage({ socketid: socket.id, mensaje: message });
    io.emit('messages', getMessages());
  });
});


//Iniciar el servidor HTTP
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});