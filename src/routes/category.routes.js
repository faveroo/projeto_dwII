const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');

const router = Router();

router.get('/create-category', CategoryController.createCategory);
router.post('/store-category', CategoryController.storeCategory);

module.exports = router;
