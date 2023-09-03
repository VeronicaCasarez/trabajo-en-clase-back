import petsModel from "../models/pet.model.js" ;
import { Router } from "express";

const router = Router();

router.param("pet", async (req, res, next, petName) => {
  let isValidPet = (validPet) => {
    let myRegex = /[a-zA-Z%20]/;
    return myRegex.test(validPet);
  };

  if (isValidPet(petName)) {
    const pet = await petsModel.find({ name: petName });
    if (pet.length === 0 || pet === null) {
      return res.status(404).send({ error: "Pet not found" });
    }
    req.pet = pet;
    next();
  } else {
    return res.status(404).send({ error: "Pet wrong name" });
  }
});

router.get("/", async (req, res) => {
  const pets = await petsModel.find();
  res.send(pets);
});

router.get("/:pet", async (req, res) => {
  res.send(req.pet);
});

router.post("/", async (req, res) => {
  const pet = req.body;
  const response = await petsModel.create(pet);
  res.send(response);
});

router.put("/:pet", async (req, res) => {
  const pet = req.body;
  const petName = req.params.pet;
  const response = await petsModel.updateOne({ name: petName }, pet);
  res.send(response);
  // const pet = req.body;
  // const response = await petsModel.updateOne({ name: req.pet.name }, pet);
  // res.send(response);
});

export default router;