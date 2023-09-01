import express from "express";
import {
  generateToken,
  authToken,
  passportCall,
  authorization,
} from "./utils.js";
import passport from "passport";
import initializePassport from "./passport.config.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
initializePassport();
app.use(passport.initialize());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: "error",
      data: "Faltan campos",
    });
  }
  if (username === "coder@coder.com" || password === "1234") {
    const myToken = generateToken({ username, password });
    /* res.status(200).json({
      message: "success",
      token: myToken,
    });
     } else {
    res.status(400).json({
      message: "error",
      data: "Credenciales invalidas",
    });
  }*/
    res.cookie("coderCookieToken", myToken, {
        maxAge: 60 * 60 * 1000,
      })
      .send({ message: "Loggeg in!" });
  } else {
    res.status(401).json({
      message: "error",
      data: "Usuario o contraseña incorrectos",
    });
  }
});

app.get("/current", passportCall("jwt"), authorization("user"), (req, res) => {
  console.log("calling current");
  res.send(req.user);
});

app.listen(PORT, () => {
  console.log("Server started");
});