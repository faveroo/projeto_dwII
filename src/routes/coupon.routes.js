const { Router } = require('express');
const CouponController = require('../controllers/CouponController');
const requireAdmin = require('../middlewares/requireAdmin')

const router = Router();

router.get('/create-coupon', requireAdmin, CouponController.create);
router.post('/store-coupon', requireAdmin, CouponController.store);
router.get('/list-coupons', CouponController.list);

module.exports = router;