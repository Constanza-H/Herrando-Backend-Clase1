const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String }, 
  brand: { type: String }, 
  stockQuantity: { type: Number, default: 0 }, 
  imageUrl: { type: String }, 
  isFeatured: { type: Boolean, default: false }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
