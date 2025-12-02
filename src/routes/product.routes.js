const { Router } = require('express')
const ProductController = require('../controllers/ProductController')
const upload = require('../middlewares/upload')

const router = Router()

router.get('/create-product', ProductController.createProduct)
router.post('/store-product', upload.single('image'), ProductController.storeProduct)
router.get('/list-products', ProductController.indexProduct)
router.get('/product-detail/:id', ProductController.showProduct)

module.exports = router
