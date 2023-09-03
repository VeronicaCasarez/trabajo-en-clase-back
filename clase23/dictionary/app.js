import express from "express";

const app = express();

let dictionary = [
  "hola",
  "chau",
  "perro",
  "gato",
  "casa",
  "auto",
  "calle",
  "callejon",
  "pelota",
];

app.get(
  "/api/dictionary/:word([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)",
  (req, res) => {
    res.send({ word: req.params.word });
  }
);
app.get("/api/dictionary/:word([0-9]+)", (req, res) => {
  res.send({ word: req.params.word });
});

app.get("*", (req, res) => {
  res.status(404).send({ error: "Not found: 404" });
});

app.listen(3131, () => {
  console.log("Server started");
});