import { engine } from "express-handlebars";
import express from "express";
import { __filename, __dirname } from './utils.js';
import viewsRoutes from "./routes/views.router.js";

import { Server } from "socket.io";
import { createServer } from "http";


const app = express();
const httpServer = createServer(app);

const PORT = 8083;

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
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Manejar el evento 'mensaje' desde el cliente
  socket.on('mensaje', (message) => {
    console.log('Mensaje recibido:', message);
    // Emitir el mensaje a todos los clientes conectados
    socket.emit('mensaje', message);
  });

  // Manejar el evento 'disconnect' cuando un cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

//Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});