const { Router } = require('express')
const upload = require('../middlewares/upload')
const UserController = require('../controllers/UserController')

const router = Router()

router.get('/profile', UserController.index)
router.post('/update', upload.single('photo'), UserController.update)

module.exports = router