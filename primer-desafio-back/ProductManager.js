const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProducts();
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    const newProduct = {
      id: lastProductId + 1,
      ...product
    };
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  getProducts() {
    try {
      const productsData = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(productsData);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...updatedFields
      };
      this.saveProducts(products);
      return products[productIndex];
    }

    return null;
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    this.saveProducts(updatedProducts);
  }

  saveProducts(products) {
    const productsData = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, productsData);
  }
}

// Ejemplo de uso de la clase ProductManager

const path = 'products.json'; // Ruta del archivo de productos

// Crear una instancia de ProductManager, proporcionando la ruta del archivo
const productManager = new ProductManager(path);

// Ejemplo de uso de los métodos
const newProduct = {
  title: 'Producto 1',
  description: 'Descripción del producto 1',
  price: 9.99,
  thumbnail: 'path/to/image.jpg',
  code: 'ABC123',
  stock: 10
};

// Agregar un nuevo producto
const addedProduct = productManager.addProduct(newProduct);
console.log('Producto agregado:', addedProduct);

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

// Obtener un producto por ID
const productId = 1;
const productById = productManager.getProductById(productId);
console.log(`Producto con ID ${productId}:`, productById);

// Actualizar un producto por ID
const updatedFields = {
  description: 'Nueva descripción del producto 1',
  price: 19.99
};
const updatedProduct = productManager.updateProduct(productId, updatedFields);
console.log('Producto actualizado:', updatedProduct);

// Eliminar un producto por ID
productManager.deleteProduct(productId);
console.log(`Producto con ID ${productId} eliminado.`);

// Obtener todos los productos después de la eliminación
const remainingProducts = productManager.getProducts();
console.log('Productos restantes:', remainingProducts);
