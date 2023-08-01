import { Router } from "express";
import StudentModel from "../models/student.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await StudentModel.find();

    res.json({
      data: result,
      message: result.length ? "Lista de alumnos" : "No hay alumnos",
    });
  } catch (error) {
    res.status(500).json({
      data: [],
      message: "Error al obtener la lista de alumnos",
      error: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await StudentModel.find({ email: id });
    res.json({
      data: result,
      message: result.length ? "Alumno encontrado" : "Alumno no encontrado",
    });
  } catch (error) {
    res.status(500).json({
      data: [],
      message: "Error al obtener el Alumno",
      error: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { name, lastname, course, dni, age, result } = req.body;
    if (!id || !name || !lastname || !course || !dni || !age || !result) {
      return res.status(400).json({
        message: "Faltan datos requeridos",
      });
    } else {
      const user = {
        name,
        lastname,
        course,
        dni,
        age,
        result,
      };
      const resultado = await StudentModel.findByIdAndUpdate(id, user);
      res.json({
        data: resultado,
        message: "Alumno modificado exitosamente",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al modificar el Alumno",
      error: error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, lastname, course, dni, age, result } = req.body;
    if (!name || !lastname || !course || !dni || !age || !result) {
      return res.status(400).json({
        message: "Faltan datos requeridos",
      });
    } else {
      const user = {
        name,
        lastname,
        course,
        dni,
        age,
        result,
      };
      const resultado = await StudentModel.create(user);
      res.json({
        data: resultado,
        message: "Alumno creado exitosamente",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear el Alumno",
      error: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await StudentModel.findByIdAndDelete(id);
    res.json({
      data: resultado,
      message: "Alumno eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el Alumno",
      error: error,
    });
  }
});
export default router;