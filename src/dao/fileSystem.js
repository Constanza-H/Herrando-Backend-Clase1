const fs = require('fs/promises');
const path = require('path');

const CART_FILE_PATH = path.join(__dirname, 'ruta', 'cartData.json');

class FileSystemManager {
  async saveToCart(cartData) {
    try {
     
      const existingData = await this.getCartData();

     
      const updatedData = {
        ...existingData,
        ...cartData,
      };

     
      await fs.writeFile(CART_FILE_PATH, JSON.stringify(updatedData, null, 2));
    } catch (error) {
      console.error('Error al guardar en el sistema de archivos:', error.message);
    }
  }

  async getCartData() {
    try {
      
      const data = await fs.readFile(CART_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      
      if (error.code === 'ENOENT') {
        return {};
      }
      console.error('Error al leer del sistema de archivos:', error.message);
      throw error;
    }
  }

 
}



module.exports = FileSystemManager;