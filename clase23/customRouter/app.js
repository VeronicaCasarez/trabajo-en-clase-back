import express from "express";
import UsersRouter from "./routes/users.router.js";

const app = express();
app.use(express.json());
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const usersRouter = new UsersRouter();
app.use("/users", usersRouter.router);