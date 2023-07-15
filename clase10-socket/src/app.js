import express from "express";
import { createServer } from "http";
import http from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __filename, __dirname } from './utils.js';

import viewsRoutes from "./routes/views.router.js";

const app = express();
const httpServer = createServer(app);
//configuracion del lado del servidor
const socketServer = new Server(httpServer);

const PORT = 8080;

// Configurar el motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', `${__dirname}/views`);

// Configurar el directorio estático para archivos públicos
app.use(express.static("public"));

// Configurar el middleware para manejar las solicitudes JSON
app.use(express.json());

// Configurar las rutas para las vistas
app.use("/views", viewsRoutes);

// Configurar el evento de conexión de Socket.IO
socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Manejar eventos personalizados
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
