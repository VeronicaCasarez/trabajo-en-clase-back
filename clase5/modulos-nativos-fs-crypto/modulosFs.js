const fs = require('fs').promises;
const crypto = require('crypto');

class UserManager {
  constructor() {
    this.filePath = './usuarios-modulo.json';
  }

  async crearUsuario(usuario) {
    const usuarios = await this.leerUsuarios();

    // Verificar si el nombre de usuario ya existe
    if (usuarios.some((u) => u.username === usuario.username)) {
      console.log('Error: El nombre de usuario ya existe.');
      return;
    }

    // Hashear la contraseña
    const hashedPassword = this.hashPassword(usuario.password);

    // Crear el objeto de usuario
    const newUser = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      username: usuario.username,
      password: hashedPassword,
    };

    // Agregar el nuevo usuario al arreglo
    usuarios.push(newUser);

    // Guardar el arreglo actualizado en el archivo
    await this.guardarUsuarios(usuarios);

    console.log('Usuario creado exitosamente.');
  }

  async validarUsuario(username, password) {
    const usuarios = await this.leerUsuarios();

    // Buscar el usuario por nombre de usuario
    const usuario = usuarios.find((u) => u.username === username);

    if (!usuario) {
      console.log('Error: El usuario no existe.');
      return;
    }

    // Verificar la contraseña
    const hashedPassword = this.hashPassword(password);

    if (usuario.password === hashedPassword) {
      console.log('Logueado');
    } else {
      console.log('Error: La contraseña no coincide.');
    }
  }

  async leerUsuarios() {
    try {
      const usuariosData = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(usuariosData);
    } catch (error) {
      // Si el archivo no existe o está vacío, retornar un arreglo vacío
      return [];
    }
  }

  async guardarUsuarios(usuarios) {
    const usuariosData = JSON.stringify(usuarios, `utf-8`);
    await fs.writeFile(this.filePath, usuariosData);
  }

  hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }
}

// Ejemplo de uso
const userManager = new UserManager();

async function ejemplo() {
  // Crear un nuevo usuario
  await userManager.crearUsuario({
    nombre: 'Juan',
    apellido: 'Perez',
    username: 'juanP',
    password: 'secretpassword',
  });

  // Validar un usuario existente
  await userManager.validarUsuario('juanP', 'secretpassword');

  // Validar un usuario inexistente
  await userManager.validarUsuario('marioM', 'password123');
}

ejemplo().catch((error) => console.log(error));
