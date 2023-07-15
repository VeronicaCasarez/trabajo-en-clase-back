import  express  from "express";
import { __filename, __dirname } from '../src/utils.js';

const router = express.Router();

router.get("/", (req, res) => {
  let user = {
    name: "vero",

  };
  res.render('index',  user );
});

export default router;
