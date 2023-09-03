import { Router } from "express";
import jwt from "jsonwebtoken";
export default class Routers {
  constructor() {
    this.router = Router();
    this.init();
  }
  init() {}
  getRouter() {
    return this.router;
  }

  /* ejemplo custom router simple
  get(path, ...callback) {
    this.router.get(path, this.applyCallback(callback));
  }
  post(path, ...callback) {
    this.router.post(path, this.applyCallback(callback));
  }
  put(path, ...callback) {
    this.router.put(path, this.applyCallback(callback));
  }
  delete(path, ...callback) {
    this.router.delete(path, this.applyCallback(callback));
  }
  saludar(path, ...callback) {
    this.router.get(path, this.applyCallback(callback));
  }
  */
  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }
  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

   // ejemplo custom router simple
  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].status(500).json({ error: "Internal server error" }); //params[1] is the response object
      }
    });
  }

  generateCustomResponse = (req, res, next) => {
    res.sendSuccess = (payload) => res.send({ status: "success", payload });
    res.sendServerError = (error) =>
      res.status(500).send({ status: "error", error });
    res.sendUserError = (error) =>
      res.status(400).send({ status: "error", error });
    next();
  };

  handlePolicies = (policies) => (req, res, next) => {
    if (policies[0] === "PUBLIC") return next();

    const authHeaders = req.headers.authorization;
    console.log(authHeaders, "here");
    if (!authHeaders) return res.status(403).json({ message: "No autorizado" });
    const token = authHeaders && authHeaders.split(" ")[1];

    let user = jwt.verify(token, "CoderSecretClaseRouter");

    if (!policies.includes(user.role.toUpperCase()))
      return res.status(403).json({ message: "No autorizado" });
    req.user = user;
    next();
  };
}