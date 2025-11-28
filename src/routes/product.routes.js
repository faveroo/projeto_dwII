const { Router } = require('express')
const ProductController = require('../controllers/ProductController')

const router = Router()

router.get('/create-product', ProductController.createProduct)
router.post('/store-product', ProductController.storeProduct)
router.get('/list-products', ProductController.indexProduct)

module.exports = router
