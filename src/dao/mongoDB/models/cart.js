const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'active' }, 
  created_at: { type: Date, default: Date.now }, 
  updated_at: { type: Date }, 
  shippingAddress: { type: String }, 
  paymentMethod: { type: String },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
