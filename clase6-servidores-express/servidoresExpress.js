import express from 'express';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('¡Hola a todos, pero ahora desde Express!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`);
});
