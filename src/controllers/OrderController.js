const { Order, OrderItem, Product } = require('../models')

class OrderController {
    static async index(req, res) {
        const orders = await Order.findAll({
            where: {
                user_id: req.session.userId
            },
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: Product,
                            attributes: ['name', 'price']
                        }
                    ],
                    attributes: ['quantity']
                }
            ]
        });
        return res.render('shop/list/list-orders', { orders });
    }
    static async store(req, res) {
        try {
            const cart = req.session.cart || [];

            if (cart.length === 0) {
                req.flash('error', 'Seu carrinho está vazio.');
                return res.redirect('/shop/cart');
            }

            const user_id = req.session.userId; // Corrected from req.session.user.id based on AuthController

            // Calculate total
            const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

            // Generate identification (simple timestamp based for now)
            const identification = `ORD-${Date.now()}`;

            // Create Order
            const order = await Order.create({
                identification,
                total,
                status: 'pending',
                user_id
            });

            // Create OrderItems
            const orderItems = cart.map(item => ({
                quantity: item.quantity,
                price: item.price,
                product_id: item.id,
                order_id: order.id
            }));

            await OrderItem.bulkCreate(orderItems);

            // Clear cart
            req.session.cart = [];

            req.flash('success', 'Pedido realizado com sucesso!');
            return res.redirect('/shop');

        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            req.flash('error', 'Erro ao processar o pedido.');
            return res.redirect('/shop/cart');
        }
    }
}

module.exports = OrderController