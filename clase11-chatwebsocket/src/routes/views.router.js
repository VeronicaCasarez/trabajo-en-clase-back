import { __filename, __dirname } from '../utils.js';
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", {});
});

export default router;