const express = require('express');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
require('dotenv').config();
require('./models');

const app = express();

app.use(express.urlencoded({ extended: true })); // necessário para POST do formulário
app.use(express.json());


app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));

const loadCategories = require('./middlewares/loadCategories');
app.use(loadCategories);

const authRoutes = require('./routes/auth.routes');
const shopRoutes = require('./routes/shop.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const couponRoutes = require('./routes/coupon.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const userRoutes = require('./routes/user.routes');


const authMiddleware = require('./middlewares/authMiddleware');

app.use(authMiddleware);

const requireAuth = require('./middlewares/requireAuth');

app.use('/', authRoutes);
app.use('/shop', requireAuth, shopRoutes);
app.use('/product', requireAuth, productRoutes);
app.use('/category', requireAuth, categoryRoutes);
app.use('/coupon', requireAuth, couponRoutes);
app.use('/cart', requireAuth, cartRoutes);
app.use('/order', requireAuth, orderRoutes);
app.use('/user', requireAuth, userRoutes);

module.exports = app;
