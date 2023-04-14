const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,  
      required: true,
    },
    price: {
      type: String,  
      required: true,
    },
    discountPercentage: {
      type: String,  
      required: true,
    },
    stock: {
      type: String,  
      required: true,
    },
    brand: {
      type: String,  
      required: true,
    },
    category: {
      type: String,  
      required: true,
    },
    thumbnail: {
      type: String,  
      required: true,
    },
    images: [String]

  }, { timestamps: true });
  

  
  const Product = mongoose.model('Products', productSchema);
  
  module.exports = Product;