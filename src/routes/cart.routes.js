const { Router } = require('express');
const CartController = require('../controllers/CartController');

const router = Router()

router.get('/', CartController.index)
router.post('/add/:id', CartController.add)
router.post('/remove/:id', CartController.remove)
router.post('/apply-coupon', CartController.applyCoupon)

module.exports = router