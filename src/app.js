import express from 'express';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function filtrarPorGrupo() {
  var grupoSeleccionado = document.getElementById("grupo").value;
  var productos = document.querySelectorAll('.productos .producto');

  productos.forEach(function(producto) {
      var grupoProducto = producto.getAttribute('data-grupo');
      if (grupoSeleccionado === 'todos' || grupoSeleccionado === grupoProducto) {
          producto.style.display = 'block';
      } else {
          producto.style.display = 'none';
      }
  });
}

function agregarAlCarrito(nombreProducto) {
  console.log('Agregado al carrito:', nombreProducto);
}


class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 0;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios.");
      return;
    }

    const codeExists = this.products.some(product => product.code === code);
    if (codeExists) {
      console.log("Ya existe un producto con ese código.");
      return;
    }

    const product = {
      id: ++this.productIdCounter,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(product);
    console.log("Producto agregado:", product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      console.log("Producto encontrado:", product);
    } else {
      console.error("Producto no encontrado. ID:", id);
    }
  }
}

const manager = new ProductManager();


manager.getProducts();

manager.addProduct("producto prueba", "descripcion prueba", "500", "img", "00001", "56");
manager.addProduct("cookie con chips", "masa de vainilla con chips de chocolate", "1000", "img", "00002", "26");
manager.addProduct("torta rogel", "finas capitas de masa con DDL y menregue", "8000", "img", "00003", "15");

manager.getProducts();

manager.addProduct("torta matilda", "bizcochuelo húmedo de chocolate con DDL y ganache de chocolate", 8500, "sin imagen", "00003", "20");

manager.getProductById(2);
manager.getProductById(50);


