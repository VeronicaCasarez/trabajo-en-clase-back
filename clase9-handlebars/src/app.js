import express from "express";
import {engine}from "express-handlebars";
import viewsRoutes from "../routes/views.router.js";
import { __filename, __dirname } from './utils.js';

const app=express();
const PORT=process.env.PORT||8080;
app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', `${__dirname}/views`);

app.use(express.static("public"));

app.use("/views", viewsRoutes);


app.listen(PORT, ()=>{
    console.log(`servidor escuchando en el puerto: ${PORT}`)
})