const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Order extends Model { }
Order.init({
    identification: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered'),
        allowNull: false,
        defaultValue: 'pending',
    },
    coupon_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
})

module.exports = Order

