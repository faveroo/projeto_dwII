const { Router } = require('express');
const CouponController = require('../controllers/CouponController');

const router = Router();

router.get('/create-coupon', CouponController.create);

module.exports = router;