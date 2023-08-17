import express  from "express";
import { engine } from "express-handlebars";
import { __filename, __dirname } from './utils.js';
import cookieParser from 'cookie-parser';

const app=express();

app.use(cookieParser("C0d3rS3cr3t"));


// Configurar el motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', `${__dirname}/views`);

// Configurar el directorio estático para archivos públicos
app.use(express.static("public"));

// Configurar el middleware para manejar las solicitudes JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//res seteamos cookies
//req obtenemos cookies
//res eliminamos cookies

//renderiza cookie.handlebars
app.get("/cookies", (req,res)=>{
    res.render('cookie',{})
})

//crea la cookie y recibe por parametro los datos
app.get ("/setCookie", (req,res)=>{
    const{name,apellido}=req.query
    res.cookie('coderCookie', {
        nombre:name,
        apellido:apellido
    },
    {
        maxAge:30000,
        signed:true,
        })
        .send("Cookie")
});



app.get ("/getCookies", (req,res)=>{
    //cokkies sin firmar
   // res.send(req.cookies)
   //cookie firmada
   res.send(req.signedCookies);
})

app.get("/deleteCookie", (req,res)=>{
    res.clearCookie('coderCookie').send('Cookie  eliminada')
})

app.listen(8080, ()=>console.log("Servidor escuchando en el puerto 8080"))