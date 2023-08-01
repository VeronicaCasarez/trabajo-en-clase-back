import mongoose from "mongoose";

const studentsCollection = "students";

const studentsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  dni: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  result: { type: Number, required: true },
});

const StudentsModel = mongoose.model(studentsCollection, studentsSchema);

export default StudentsModel;