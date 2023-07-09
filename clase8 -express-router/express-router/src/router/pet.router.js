import { Router } from "express";

const router =Router();
const pets=[];


router.get ("/", (req,res)=>{
    res.json({message:"mascotas",data:pets})
});

router.post("/",(req,res)=>{
    pets.push(req.body);
    res.json({message:"mascota agregada",data:req.body})
});

export default router;