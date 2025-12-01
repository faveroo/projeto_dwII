const { Router } = require('express')
const UserController = require('../controllers/UserController')

const router = Router()

router.get('/profile', UserController.index)
router.post('/update', UserController.update)

module.exports = router