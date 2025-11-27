const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
require('./models/User');

const app = express();

app.use(express.urlencoded({ extended: true })); // necessário para POST do formulário
app.use(express.json());


app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const authRoutes = require('./routes/auth.routes');
const shopRoutes = require('./routes/shop.routes');

app.use('/', authRoutes);
app.use('/shop', shopRoutes);

module.exports = app;
