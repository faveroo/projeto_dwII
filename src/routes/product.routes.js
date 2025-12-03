const { Router } = require('express')
const ProductController = require('../controllers/ProductController')
const upload = require('../middlewares/upload')
const requireAdmin = require('../middlewares/requireAdmin')

const router = Router()

router.get('/create-product', requireAdmin, ProductController.createProduct)
router.post('/store-product', upload.single('image'), requireAdmin, ProductController.storeProduct)
router.get('/list-products', ProductController.indexProduct)
router.get('/product-detail/:id', ProductController.showProduct)

module.exports = router
