import { Router } from "express";
import UserModel from "../models/users.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await UserModel.find();

    res.json({
      data: result,
      message: result.length ? "Lista de usuarios" : "No hay usuarios",
    });
  } catch (error) {
    res.status(500).json({
      data: [],
      message: "Error al obtener la lista de usuarios",
      error: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await UserModel.find({ email: id });
    res.json({
      data: result,
      message: result.length ? "Usuario encontrado" : "Usuario no encontrado",
    });
  } catch (error) {
    res.status(500).json({
      data: [],
      message: "Error al obtener el usuario",
      error: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { first_name, last_name, email } = req.body;
    if (!id || !first_name || !last_name || !email) {
      return res.status(400).json({
        message: "Faltan datos requeridos",
      });
    } else {
      const user = {
        first_name,
        last_name,
        email,
      };
      const result = await UserModel.findByIdAndUpdate(id, user);
      res.json({
        data: result,
        message: "Usuario modificado exitosamente",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al modificar el usuario",
      error: error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email) {
      return res.status(400).json({
        message: "Faltan datos requeridos",
      });
    } else {
      const user = {
        first_name,
        last_name,
        email,
      };
      const result = await UserModel.create(user);
      res.json({
        data: result,
        message: "Usuario creado exitosamente",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el usuario",
      error: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await UserModel.findByIdAndDelete(id);
    res.json({
      data: result,
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el usuario",
      error: error,
    });
  }
});
export default router;