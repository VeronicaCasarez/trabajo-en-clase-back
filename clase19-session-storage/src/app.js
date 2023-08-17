import express  from "express";
import { engine } from "express-handlebars";
import { __filename, __dirname } from './utils.js';
import cookieParser from 'cookie-parser';
import session from "express-session";
import FileStorage from "session-file-store";
import MongoStore from 'connect-mongo';
import * as dotenv from "dotenv";

dotenv.config();

const app=express();
//********cookies */
app.use(cookieParser("C0d3rS3cr3t"));

const MONGO_URL = process.env.MONGO_URL;

//const fileStorage=FileStorage(session)

//********session */
// app.use(session({
//     secret:"codersecret",
//     resave:true,
//     saveUninitialized:true,
// }))

//sesion con file storage, no es fiable porque usa el disco local
// app.use(
//   session({
//     store: new fileStorage({
//       path:"./sessions",
//       ttl: 100,
//       retries: 0,
//     }),
//     secret: "codersecret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );


//session con mongodb
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 30,
    }),
    secret: "codersecret",
    resave: false,
    saveUninitialized: false,
  })
);


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

//middleware de autenticacion
function auth(req, res, next) {
    if (req.session?.user === "pepe" && req.session?.admin) {
      return next();
    }
    return res.status(401).json("error de autenticacion");
  }
//****rutas de cookies***** */
//renderiza cookie.handlebars
app.get("/cookies", (req,res)=>{
    res.render('cookie',{})
})

//renderiza session
app.get("/", (req,res)=>{
    res.render('login',{})
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

//****rutas de sessions***** */
//levantar la sesion en el endpoint
app.get('/session', (req,res)=>{
    if (req.session.counter){
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces` )
    }else{
        req.session.counter=1
        res.send('Bienvenido, es su primera vez en este sitio')
    }
});

//eliminar datos de session
app.get('/logout', (req,res)=>{
    req.session.destroy ((err) =>{
        if (!err){
            res.send('logout ok!')
        }else{
            res.send({status:'   al cerrar session', body:err})} 
    })

})

//login con session
app.post("/login", (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    if (username !== "pepe" || password !== "pepepass")
      return res.status(401).json({
        respuesta: "error",
      });
  
    req.session.user = username;
    req.session.admin = true;
    res.status(200).json({
      respuesta: "ok",
    });
  });

  //aplicacion del midlware de autenticacion
  app.get("/privado", auth, (req, res) => {
    res.render("private", {});
  });

app.listen(8080, ()=>console.log("Servidor escuchando en el puerto 8080"))