import jwt from "jsonwebtoken";
import passport from "passport";

const PRIVATE_KEY = "CoderKeyQueNadieDebeSaber";

const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" });
  return token;
};

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) res.status(401).json({ error: "Error de autenticacion" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, PRIVATE_KEY, (err, user) => {
    if (err) res.status(403).json({ error: "Token invalido" });

    req.user = user;
    next();
  });
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);
      if (!user)
        return res.status(401).json({
          error: info.messages ? info.messages : info.toString(),
        });
      user.role = "admin";
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: "Unauthorized" });
    if (req.user.role != role)
      return res.status(403).send({ error: "No permissions" });
    next();
  };
};

export { generateToken, authToken, passportCall, authorization };