const { Router } = require('express')
const router = Router()

const UserController = require('../controllers/UserController')

router.get('/user/profile', UserController.index)
router.post('/user/update', UserController.update)

module.exports = router