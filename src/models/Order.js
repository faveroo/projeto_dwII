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
        references: {
            model: 'coupons',
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
})

module.exports = Order

