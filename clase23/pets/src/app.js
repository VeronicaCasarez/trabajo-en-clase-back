import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import petRouter from "./routes/pets.router.js";

dotenv.config();
const app = express();

const MONGO_URL =process.env.MONGO_URL ||8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/pets", petRouter);

app.get("*", (req, res) => {
  res.status(404).send({ error: "Not found" });
});



const environment = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

environment();

app.listen(8080, () => {
    console.log("Server started");
  });