const sequelize = require('../config/database');

const Category = require('./Category');
const Coupon = require('./Coupon');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Product = require('./Product');
const User = require('./User');

// Definindo relacionamentos

// Category <-> Product
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

// User <-> Order
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Coupon <-> Order
Coupon.hasMany(Order, { foreignKey: 'coupon_id' });
Order.belongsTo(Coupon, { foreignKey: 'coupon_id' });

// Order <-> OrderItem
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Product <-> OrderItem
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
    sequelize,
    Category,
    Coupon,
    Order,
    OrderItem,
    Product,
    User
};
