import moment from "moment";

// Variables
const fechaActual = moment();
const fechaNacimiento = moment('1990-01-01'); 

// Validación de fecha de nacimiento válida
if (!fechaNacimiento.isValid()) {
  console.log('La fecha de nacimiento no es válida.');
} else {
  // Cálculo de días transcurridos
  const diasTranscurridos = fechaActual.diff(fechaNacimiento, 'days');

  // Mostrar resultado
  console.log('Han pasado ' + diasTranscurridos + ' días desde tu nacimiento hasta hoy.');
}
