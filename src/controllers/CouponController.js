const Coupon = require('../models/Coupon')

class CouponController {
    static async create(req, res) {
        return res.render('shop/create-coupon')
    }
}


module.exports = CouponController