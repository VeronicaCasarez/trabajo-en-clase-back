import express from "express";
import userRouter from "./router/user.router.js";
import petRouter from "./router/pet.router.js";



const app=express();
const PORT=3002;


app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/pet", petRouter);

//archivos estaticos con express, public es por el nombre del directorio
app.use("/sitio",express.static("public"));


app.listen (PORT,()=>{
    console.log (`servidor escuchando en el puerto: ${PORT}`)
});
