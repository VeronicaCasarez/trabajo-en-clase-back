import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

//logica para hashear la contraseña
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  //logica para comparar la contraseña sin hashear con la que esta en la base de datos
  //devuelve true o false
export const isValidPassword = (savedPassword, password) => {
  console.log({ "cloud password": savedPassword, loginPassword: password });
  return bcrypt.compareSync(password, savedPassword);
};
