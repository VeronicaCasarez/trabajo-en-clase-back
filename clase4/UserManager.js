const fs = require("fs");

class UserManager {
  usuarios = [];

  constructor(path) {
    this.path = path;
    // this.leerElArchivo();
  }

  agregarUsuario(usuario) {
    this.usuarios.push(usuario);
    this.guardarEnArchivo();
  }

  async guardarEnArchivo() {
    try {
      await fs.promises.writeFile(this.path,
        JSON.stringify(this.usuarios), 
        "utf-8",
        console.log("estos son los usuarios agregados", this.usuarios)
      );
    } catch (err) {
      console(err);
    }
  }

  async leerElArchivo() {
    try {
      const result = await fs.promises.readFile(this.path, "utf-8");
      this.usuarios = JSON.parse(result);
      console.log("usuarios cargados" ,this.usuarios);

    } catch (err) {
          console.log(err);
        }
      }
    
   
}

let userManager = new UserManager("./usuarios.json");
userManager.agregarUsuario({
  nombre: "Yanina",
  apellido: "Glaser",
});
userManager.agregarUsuario({
  nombre: "Daniel",
  apellido: "Perco",
});
userManager.agregarUsuario({
  nombre: "Jhoceliz",
  apellido: "Figueroa Pinto",
});
 userManager.leerElArchivo();
