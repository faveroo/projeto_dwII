const { Model, DataTypes } = require('sequelize');
const Category = require('./Category');
const sequelize = require('../config/database');

class Product extends Model { }

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
});

module.exports = Product