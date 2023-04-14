const router = require("express").Router()
const axios = require('axios');

const { dashboardController } = require("../controllers/dashboardController");
const Product = require("../models/products");

router.get('/',async (req, res) => {
    const locals = {
        title:"Nodejs about",
        description:"about page"
    }
    try{
        const data = await Product.find();
   
        res.render('index', {
            locals,
            layout: '../views/layouts/main.ejs',
            data: data
        })

    }catch(err){
        console.error(err);
        res.render('error');
    }
    
})


router.post('/add-product',async (req, res) => {
    try{
        const response = await axios.get('https://dummyjson.com/products')
        const data = response.data.products;

    for (const productData of data) {
        const product = new Product({
            id: productData.id,
            title: productData.title,
            description: productData.description,   
            price: productData.price,   
            discountPercentage: productData.discountPercentage,   
            rating: productData.rating,   
            stock: productData.stock,   
            brand: productData.brand,   
            category: productData.category,   
            thumbnail: productData.thumbnail,   
            images: productData.images,   
      
        });
        await product.save();
        res.redirect("/dashboard")
      }
    }catch(err){
        console.log(err)
    }
})




router.put('/products/:id', (req, res) => {
  const  id = req.params.id;
  let conditions = {id: id};
  
    Product.findOneAndUpdate(conditions, req.body, { new: true })
      .then(updatedProduct => {
        res.json(updatedProduct);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to update product' });
      });
  });

router.get('/products/:id', (req, res) => {
    const  id = req.params.id;
    let conditions = {_id: id};
    Product.findById(conditions)
      .then(updatedProduct => {
        res.json(updatedProduct);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to get product' });
      });
  });
router.delete('/products/:id', (req, res) => {
    const  id = req.params.id;
    let conditions = {id: id};
    Product.findOneAndDelete(conditions)
      .then(updatedProduct => {
        res.json(updatedProduct);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete product' });
      });
  });

module.exports = router