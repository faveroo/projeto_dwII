const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');
const requireAdmin = require('../middlewares/requireAdmin')

const router = Router();

router.get('/create-category', requireAdmin, CategoryController.createCategory);
router.post('/store-category', requireAdmin, CategoryController.storeCategory);
router.get('/list-categories', CategoryController.listCategories)
router.get('/list-categories/:id', CategoryController.listCategory)

module.exports = router;
