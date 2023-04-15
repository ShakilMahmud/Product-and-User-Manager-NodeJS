const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  product_id: { type: Schema.Types.ObjectId, required: true, ref: 'Products' },
  timestamp: { type: Date, required: true, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
