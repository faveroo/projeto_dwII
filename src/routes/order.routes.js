const { Router } = require('express');
const OrderController = require('../controllers/OrderController');

const router = Router();

router.get('/', OrderController.index)
router.post('/checkout', OrderController.store);

module.exports = router;
