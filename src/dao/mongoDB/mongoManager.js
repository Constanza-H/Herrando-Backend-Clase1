const MongoDBManager = require('./db');  
const Cart = require('./models/cart');
const Message = require('./models/message');
const Product = require('./models/product');

class MongoDBManager {
    async saveToCart(cartData) {
        try {
          const cart = new Cart(cartData);
          await cart.save();
        } catch (error) {
          console.error('Error al guardar en MongoDB:', error.message);
          throw error;
        }
      }
    
      async getCartData() {
        try {
          return await Cart.find();
        } catch (error) {
          console.error('Error al leer de MongoDB:', error.message);
          throw error;
        }
      }
    
      async saveMessage(messageData) {
        try {
          const message = new Message(messageData);
          await message.save();
        } catch (error) {
          console.error('Error al guardar mensaje en MongoDB:', error.message);
          throw error;
        }
      }
    
      async getAllMessages() {
        try {
          return await Message.find();
        } catch (error) {
          console.error('Error al leer mensajes de MongoDB:', error.message);
          throw error;
        }
      }
    
      async saveProduct(productData) {
        try {
          const product = new Product(productData);
          await product.save();
        } catch (error) {
          console.error('Error al guardar producto en MongoDB:', error.message);
          throw error;
        }
      }
    
      async getAllProducts() {
        try {
          return await Product.find();
        } catch (error) {
          console.error('Error al leer productos de MongoDB:', error.message);
          throw error;
        }
      }
    
     
    }
    
    module.exports = MongoDBManager;