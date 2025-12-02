const { Product, Category, Order, User } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

class ShopController {
    static async dashboard(req, res) {
        try {
            const user = res.locals.user;

            let productsCount = 0;
            let categoriesCount = 0;
            let totalRevenue = 0;
            let recentOrders = [];
            let featuredProducts = [];

            if (user && user.role === 'admin') {
                productsCount = await Product.count();
                categoriesCount = await Category.count();
                const totalRevenueResult = await Order.sum('total');
                totalRevenue = totalRevenueResult || 0;
                recentOrders = await Order.findAll({
                    limit: 5,
                    order: [['createdAt', 'DESC']],
                    include: [{ model: User, attributes: ['name', 'email'] }]
                });
            } else {
                featuredProducts = await Product.findAll({
                    order: sequelize.random(),
                    limit: 4
                });

                if (user) {
                    recentOrders = await Order.findAll({
                        where: { user_id: user.id },
                        limit: 5,
                        order: [['createdAt', 'DESC']]
                    });
                }
            }

            return res.render('shop/shop', {
                productsCount,
                categoriesCount,
                totalRevenue,
                recentOrders,
                featuredProducts
            });

        } catch (error) {
            console.error('Dashboard Error:', error);
            req.flash('error', 'Erro ao carregar o dashboard');
            return res.redirect('/');
        }
    }
}

module.exports = ShopController;
