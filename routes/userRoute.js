const router = require("express").Router();
const { UserLogin } = require("../controllers/userLogin");
// const validateToken = require("../middleware/validateTokenHandler")
const Product = require("../models/products");

router.get("/login", async (req, res) => {
  const locals = {
    title: "Nodejs about",
    description: "about page",
  };
  try {
    res.render("login", {
      locals,
      layout: "../views/layouts/main.ejs",
    });
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});
router.get("/reset-password", async (req, res) => {
  const locals = {
    title: "Nodejs about",
    description: "about page",
  };
  try {
    res.render("reset", {
      locals,
      layout: "../views/layouts/main.ejs",
    });
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});
router.get("/registration", async (req, res) => {
  const locals = {
    title: "Nodejs about",
    description: "about page",
  };
  try {
    res.render("register", {
      locals,
      layout: "../views/layouts/main.ejs",
    });
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});
router.get("/main-panel", async (req, res) => {
  const locals = {
    title: "Nodejs about",
    description: "about page",
  };
  try {
    const token = req.cookies.token;

    if(!token) return res.redirect('/login');
    const data = await Product.find();

    res.render("mainPanel", {
      locals,
      layout: "../views/layouts/subMain.ejs",
      data: data
    });
  } catch (err) {
    res.redirect('/login');
  }
});
router.get("/", async (req, res) => {
  const locals = {
    title: "Nodejs about",
    description: "about page",
  };
  try {
    const token = req.cookies.token;

    if(!token) return res.redirect('/login');
    const data = await Product.find();

    res.render("mainPanel", {
      locals,
      layout: "../views/layouts/subMain.ejs",
      data: data
    });
  } catch (err) {
    res.redirect('/login');
  }
});
router.get('/logout', (req, res) => {

    res.clearCookie('token');
    res.clearCookie('user');
    res.redirect('/login');
  });
  

module.exports = router;
