import express from "express";
import { __filename, __dirname } from '../utils.js';

 const router=express.Router();
// router.get("/",(req,res)=>{
//     res.render('index',{})
// });

// Ejemplo utilizando Express.js
router.get('/', (req, res)=> {
    res.render('index', { });
  });
  
export default router;