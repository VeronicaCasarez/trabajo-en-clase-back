import express from "express";

const app=express();
const PORT=8080;
const users=[];

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
   res.end ("hola mundo");
});

app.get("/api/user/", (req,res)=>{
    res.json({message:"success", data:users})
});


app.post("/api/user/crear/", (req,res)=>{
    const{id,name,lastName, email,password}=req.body;
    if (!id||!name|| !lastName||!email||!password){
        return res.status(400).json({message:"faltan datos"})
    }
    else{ 
     let user={
        id:id,
        name:name,
        lastName:lastName,
        email:email,
        password:password,

    }
    const existUser=users.findIndex((user)=>user.id===id);
    if (existUser===-1){
        users.push(user);
        res.json({message:"usuario agregado", data:req.body})
    }else{
        res.status(404).json({message:"el usuario ya existe", data:req.body})
    }
     }

});
 
app.put("/api/user/:uid", (req,res)=>{
    const uid=req.params.uid;
    const{id,name,lastName, email,password}=req.body;

    const existUser=users.findIndex((user)=>user.id===uid);
    if (existUser===-1){
        res.status(404).json({message:"el usuario no existe"})
      
    }else{
        if (!id||!name|| !lastName||!email||!password){
            return res.status(400).json({message:"faltan datos"})
        }else{  
            let user={
                id:id,
                name:name,
                lastName:lastName,
                email:email,
                password:password,
        };
        users.splice(existUser,1,user)
        res.json({message:"usuario modificado", data:req.body})
    } 
    }

});


app.delete("/api/user/:uid", (req,res)=>{
    const uid=req.params.uid;
    
    const existUser=users.findIndex((user)=>user.id===uid);
    if (existUser===-1){
        res.status(404).json({message:"el usuario no existe"})
      
    }else{
        users.splice((existUser,1))
        res.json({ message: "Usuario eliminado" });
    }

});


app.listen (PORT,()=>{
    console.log (`servidor escuchando en el puerto: ${PORT}`)
});
