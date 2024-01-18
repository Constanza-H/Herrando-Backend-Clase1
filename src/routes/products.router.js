import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const productsRouter = express.Router();
const productosFilePath = path.resolve(__dirname, '../models/products.json');

async function initializeProducts() {
  try {
    const data = await fs.readFile(productosFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer products.json', error);
    return [];
  }
}

let products = await initializeProducts();

async function initializeProducts() {
  try {
    const data = await fs.readFile(productosFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer products.json', error);
    return [];
  }
}

productsRouter.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(productosFilePath, 'utf-8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    console.error('Error al leer productos:', error);
    res.status(500).json({ error: `Error interno del servidor: ${error.message}` });
  }
});


// agregar nuevo producto
productsRouter.post('/', async (req, res) => {
  try {
    const data = await fs.readFile(productosFilePath, 'utf-8');
    const products = JSON.parse(data);

    const {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    } = req.body;

    const newProduct = {
      id: generateProductId(products),
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails,
    };

    products.push(newProduct);

    await fs.writeFile(productosFilePath, JSON.stringify(products, null, 2));

    res.json(newProduct);
  } catch (error) {
    console.error('Error al agregar un producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// actualizar producto por ID
productsRouter.put('/:pid', async (req, res) => {
  try {
    const data = await fs.readFile(productosFilePath, 'utf-8');
    let products = JSON.parse(data);

    const productIndex = products.findIndex(
      (p) => p.id === Number(req.params.pid)
    );

    if (productIndex !== -1) {
      const updatedProduct = {
        ...products[productIndex],
        ...req.body,
        id: products[productIndex].id, 
      };

      products[productIndex] = updatedProduct;

      await fs.writeFile(productosFilePath, JSON.stringify(products, null, 2));

      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar un producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// eliminar producto por ID
productsRouter.delete('/:pid', async (req, res) => {
  try {
    const data = await fs.readFile(productosFilePath, 'utf-8');
    let products = JSON.parse(data);

    const productIndex = products.findIndex(
      (p) => p.id === Number(req.params.pid)
    );

    if (productIndex !== -1) {
      const deletedProduct = products.splice(productIndex, 1)[0];

      await fs.writeFile(productosFilePath, JSON.stringify(products, null, 2));

      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar un producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// generar un nuevo ID de producto
function generateProductId(products) {
  const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
  return maxId + 1;
}

export default productsRouter;