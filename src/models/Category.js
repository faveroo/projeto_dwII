const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Category extends Model { }
Category.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        timestamps: true,
    }
);

module.exports = Category
