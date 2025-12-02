const { Router } = require('express');

const router = Router();

const ShopController = require('../controllers/ShopController');

router.get('/', ShopController.dashboard);

module.exports = router
