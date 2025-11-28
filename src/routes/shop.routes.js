const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('shop/shop', {
        categories: req.categories
    })
})

module.exports = router
