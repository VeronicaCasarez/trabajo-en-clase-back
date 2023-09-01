import jwt from "jsonwebtoken";

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

export { generateToken, authToken };