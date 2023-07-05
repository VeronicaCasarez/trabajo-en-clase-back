import express from 'express';

const app = express();
const port = 3001;

// Datos de ejemplo
const usuarios = [
  { id: 1, nombre: 'Juani', genero: 'masculino' },
  { id: 2, nombre: 'María', genero: 'femenino' },
  { id: 3, nombre: 'Pedro', genero: 'masculino' },
];

// EJEMPLO QUERY -Ruta que filtra los usuarios según el género proporcionado
app.get('/usuario', (req, res) => {
  const genero = req.query.genero;

  if (genero) {
    // Filtrar por género
    const usuariosFiltrados = usuarios.filter((usuario) => usuario.genero === genero);
    res.json(usuariosFiltrados);
  } else {
    // Devolver a todos los usuarios
    res.json(usuarios);
  }
});

// EJEMPLO PARAMS Ruta que devuelve un usuario según el ID proporcionado
app.get('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const usuarioEncontrado = usuarios.find((user) => user.id === userId);

  if (usuarioEncontrado) {
    res.json(usuarioEncontrado);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Ruta raíz que devuelve todos los usuarios
app.get('/', (req, res) => {
  res.json(usuarios);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
