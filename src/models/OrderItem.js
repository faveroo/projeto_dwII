const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class OrderItem extends Model { }
OrderItem.init(
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id',
            },
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'OrderItem',
        tableName: 'order_items',
        timestamps: true,
    }
)

module.exports = OrderItem