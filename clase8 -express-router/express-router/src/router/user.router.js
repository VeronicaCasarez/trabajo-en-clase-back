import { Router } from "express";

const router =Router();
const users=[];


router.get ("/", (req,res)=>{
    res.json({message:"usuarios",data:users})
});

router.post("/",(req,res)=>{
    users.push(req.body);
    res.json({message:"usuario agregado",data:req.body})
});

export default router;