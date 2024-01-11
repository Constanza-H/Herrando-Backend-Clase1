import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const cartsRouter = express.Router();
const CartsFilePath = path.resolve(__dirname, 'carrito.json');
const ProductsFilePath = path.resolve(__dirname, 'productos.json');

cartsRouter.post('/', async (req, res) => {
  try {
    const data = await fs.readFile(CartsFilePath, 'utf-8');
    let carts = JSON.parse(data);

    const newCart = {
      id: generateCartId(carts),
      products: [],
    };

    carts.push(newCart);

    await fs.writeFile(CartsFilePath, JSON.stringify(carts, null, 2));

    res.json(newCart);
  } catch (error) {
    console.error('Error al crear un carrito:', error);
    res.status(500).json({ error: `Error interno del servidor: ${error.message}` });

  }
});

// obtener productos del carrito por ID
cartsRouter.get('/:cid', async (req, res) => {
  try {
    const data = await fs.readFile(CartsFilePath, 'utf-8');
    const carts = JSON.parse(data);
    const cart = carts.find((c) => c.id === Number(req.params.cid));

    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al leer carritos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// agregar un producto al carrito por ID
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartsData = await fs.readFile(CartsFilePath, 'utf-8');
    const productsData = await fs.readFile(ProductsFilePath, 'utf-8');

    let carts = JSON.parse(cartsData);
    const products = JSON.parse(productsData);

    const cartIndex = carts.findIndex((c) => c.id === Number(req.params.cid));
    const product = products.find((p) => p.id === Number(req.params.pid));

    if (cartIndex !== -1 && product) {
      const existingProductIndex = carts[cartIndex].products.findIndex(
        (p) => p.id === product.id
      );

      if (existingProductIndex !== -1) {
        carts[cartIndex].products[existingProductIndex].quantity++;
      } else {
        carts[cartIndex].products.push({
          product: product.id,
          quantity: 1,
        });
      }

      await fs.writeFile(CartsFilePath, JSON.stringify(carts, null, 2));

      res.json(carts[cartIndex]);
    } else {
      res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

function generateCartId(carts) {
  const maxId = carts.reduce((max, c) => (c.id > max ? c.id : max), 0);
  return maxId + 1;
}

export default cartsRouter;
