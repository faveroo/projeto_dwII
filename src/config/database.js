const { Sequelize } = require('sequelize');
require('dotenv').config(); // caso use .env

const sequelize = new Sequelize(
    process.env.DB_NAME || 'projeto_mvc',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: console.log, // desativa logs do SQL (deixe true se quiser ver)
    }
);

module.exports = sequelize;
