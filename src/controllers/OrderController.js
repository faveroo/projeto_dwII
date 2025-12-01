const { Order, OrderItem } = require('../models')

class OrderController {
    static async create(req, res) {
        return res.render('shop/cart')
    }
    static async store(req, res) {
        const { identification, total, status, coupon_id } = req.body
        const user_id = req.session.user.id
        await Order.create({ identification, total, status, coupon_id, user_id })
        return res.redirect('/shop')
    }
}

module.exports = OrderController