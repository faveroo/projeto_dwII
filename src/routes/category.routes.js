const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');

const router = Router();

router.get('/create-category', CategoryController.createCategory);
router.post('/store-category', CategoryController.storeCategory);
router.get('/list-categories', CategoryController.listCategories)
router.get('/list-categories/:id', CategoryController.listCategory)

module.exports = router;
