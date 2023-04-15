const router = require("express").Router();
const Order = require("../models/order");
const Product = require("../models/products");

router.post("/", async (req, res) => {
  try {
    const user = req.cookies.user;
    if (!user) return res.redirect("/login");

    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    const userId = user;

    let subtotal = Number(req.body.price) * Number(req.body.quantity);

    let discountAmount =
      Number(req.body.discountPercentage / 100) * Number(subtotal);
    let total = subtotal - discountAmount;

    const products = {
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    };

    // Create a new order document
    const order = new Order({
      user_id: userId,
      products,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      total,
    });
    const orderadta = await order.save();

    if (orderadta) {
      await Product.updateOne(
        { _id: ObjectId(productId) },
        { $inc: { stock: -quantity } }
      );

      res
        .status(200)
        .send({ success: true, message: "Product added to cart successfully" });
    } else
      res
        .status(500)
        .send({ success: false, message: "Error adding product to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error placing order");
  }
});
router.get("/details", async (req, res) => {
  try {
    const user = req.cookies.user;
    if (!user) return res.redirect("/login");

    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    const userId = user;
    const cart = await Order.find({ user_id: userId }).populate("product_id");

    res.render("order", {
      layout: "../views/layouts/subMain.ejs",
      data: cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving cart details");
  }
});

module.exports = router;
