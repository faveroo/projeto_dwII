const { Coupon } = require('../models')

class CouponController {
    static async create(req, res) {
        return res.render('shop/create/create-coupon')
    }
    static async store(req, res) {
        const { name, description, percent } = req.body
        await Coupon.create({ name, description, percent, active: true })
        return res.redirect('/coupon/list-coupons')
    }
    static async list(req, res) {
        const coupons = await Coupon.findAll()
        return res.render('shop/list/list-coupons', { coupons })
    }
}


module.exports = CouponController