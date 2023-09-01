import express from "express";
import { generateToken, authToken } from "./utils.js";

const app = express();

const PRIVATE_KEY = "CoderKeyQueNadieDebeSaber";

const users = [];
app.use(express.json());
app.listen(8080, () => {
  console.log("Server started");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const exists = users.find((user) => user.email === email);

  if (exists) {
    return res.status(400).json({ error: "User already exists" });
  }
  const user = {
    name,
    email,
    password,
  };
  users.push(user);
  const accessToken = generateToken(user);
  res.json({ status: "success", access_token: accessToken });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  if (user.password !== password) {
    return res.status(400).json({ error: "Password incorrect" });
  }

  const accessToken = generateToken(user);
  res.json({ status: "success", access_token: accessToken });
});

app.get("/current", authToken, (req, res) => {
  res.send({ status: "success", user: req.user });
});