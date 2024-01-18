import express from 'express';
import exphbs from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';



const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;

app.engine('handlebars', exphbs());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/api/carts', cartsRouter(io));

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('message', (data) => {
    console.log(data);
  });

  socket.on('updateCart', (cart) => {
    updateCartUI(cart);
  });

  function updateCartUI(cart) {
    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = '';

    cart.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.cantidad} x ${item.nombre}`;
      cartItemsElement.appendChild(listItem);
    });
  }

 
  function agregarAlCarrito(nombreProducto) {
    const product = { nombre: nombreProducto, cantidad: 1 };
    socket.emit('addToCart', product);
  }

  socket.on('updateCart', (cart) => {
    updateCartUI(cart);
  });

  function updateCartUI(cart) {
    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = '';

    cart.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.cantidad} x ${item.nombre}`;
      cartItemsElement.appendChild(listItem);
    });
  }
});

app.use(express.json());

app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.render('index', {});
});

function filtrarPorGrupo() {
  var grupoSeleccionado = document.getElementById('grupo').value;
  var productos = document.querySelectorAll('.productos .producto');

  productos.forEach(function (producto) {
    var grupoProducto = producto.getAttribute('data-grupo');
    if (grupoSeleccionado === 'todos' || grupoSeleccionado === grupoProducto) {
      producto.style.display = 'block';
    } else {
      producto.style.display = 'none';
    }
  });
}

class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 0;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Todos los campos son obligatorios.');
      return;
    }

    const codeExists = this.products.some((product) => product.code === code);
    if (codeExists) {
      console.log('Ya existe un producto con ese código.');
      return;
    }

    const product = {
      id: ++this.productIdCounter,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    console.log('Producto agregado:', product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      console.log('Producto encontrado:', product);
    } else {
      console.error('Producto no encontrado. ID:', id);
    }
  }
}

const manager = new ProductManager();

manager.getProducts();

manager.addProduct('producto prueba', 'descripcion prueba', '500', 'img', '00001', '56');
manager.addProduct('cookie con chips', 'masa de vainilla con chips de chocolate', '1000', 'img', '00002', '26');
manager.addProduct('torta rogel', 'finas capitas de masa con DDL y menregue', '8000', 'img', '00003', '15');

manager.getProducts();

manager.addProduct('torta matilda', 'bizcochuelo húmedo de chocolate con DDL y ganache de chocolate', 8500, 'sin imagen', '00003', '20');

manager.getProductById(2);
manager.getProductById(50);
