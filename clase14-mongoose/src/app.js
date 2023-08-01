import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import userRouter from "./routes/users.router.js";
import studentRouter from "./routes/student.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI", MONGO_URI);

// Conexión a la base de datos
let dbConnect = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dbConnect.then(
  () => {
    console.log("Conexión a la base de datos exitosa");
  },
  (error) => {
    console.log("Error en la conexión a la base de datos", error);
  }
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/users", userRouter);
app.use("/api/students", studentRouter);

app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});