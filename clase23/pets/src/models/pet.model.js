import mongoose from "mongoose";

const petCollection = "pets";

const petSchema = new mongoose.Schema({
  name: String,
  specie: String,
});

const petModel = mongoose.model(petCollection, petSchema);

export default petModel;