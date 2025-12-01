const { Router } = require('express');
const CouponController = require('../controllers/CouponController');

const router = Router();

router.get('/create-coupon', CouponController.create);
router.post('/store-coupon', CouponController.store);
router.get('/list-coupons', CouponController.list);

module.exports = router;