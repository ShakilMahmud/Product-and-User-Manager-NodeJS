const router = require("express").Router()
const Cart = require('../models/carts');

const jwt = require("jsonwebtoken")

router.post('/add', (req, res) => {
  const token = req.cookies.token;
    if(!token)return res.redirect('/login');

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        res.status(401).send('Invalid token');
      } else {
        req.user = decoded.id
        const cartItem = new Cart({
          user_id: decoded.id,
          product_id: req.body.product_id
        });
        const cartData = cartItem.save();
        if(cartData)
            res.status(200).send({ success: true, message: 'Product added to cart successfully' });
        else
            res.status(500).send({ success: false, message: 'Error adding product to cart' });
      }
    });
});

router.get('/', async (req, res) => {
  try {
    
    const user = req.cookies.user;
    if(!user)return res.redirect('/login');

    const token = req.cookies.token;
    if(!token)return res.redirect('/login');

    const userId = user 
    const cart = await Cart.find({ user_id: userId }).populate('product_id');
    res.render("cart", {
      layout: "../views/layouts/subMain.ejs",
      data: cart
    });
 
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving cart details');
  }
});


module.exports = router