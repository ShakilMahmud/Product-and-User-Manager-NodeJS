const express = require('express');
const expressLayouts = require("express-ejs-layouts");

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

require("dotenv").config()
const connectDb = require("./config/db")
var cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboardRoute');
const verifyRoute = require('./routes/verifyRoute')
const cardRoute = require('./routes/cardRoute')
const orderRoute = require('./routes/order')

const userRoute = require('./routes/userRoute')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser())

connectDb()

// templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/verify', verifyRoute);
app.use('/cart', cardRoute);
app.use('/orders', orderRoute);

app.use('/', userRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
