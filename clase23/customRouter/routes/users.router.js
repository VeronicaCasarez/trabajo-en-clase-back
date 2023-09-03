import Router from "./router.js";
import jwt from "jsonwebtoken";

export default class UsersRouter extends Router {
  init() {
    /*  simple router example
  this.get("/", async (req, res) => {
      res.send("Hola coders");
    });
    this.saludar("/hello", async (req, res) => {
      res.send("Hola desde saludar coders");
    });

  }*/
    this.get("/", ["PUBLIC"], async (req, res) => {
      res.sendSuccess("Hola coders");
    });

    this.get("/premiumcoders", ["USER_PREMIUM"], async (req, res) => {
      res.sendSuccess("Hola PREMIUM coders");
    });
    this.post("/login", ["PUBLIC"], async (req, res) => {
      let user = {
        email: req.body.email,
        role: "user",
      };
      let token = jwt.sign(user, "CoderSecretClaseRouter");
      res.sendSuccess({
        status: "success",
        access_token: token,
      });
    });
  }
}