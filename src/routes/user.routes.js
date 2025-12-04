const { Router } = require('express')
const upload = require('../middlewares/upload')
const UserController = require('../controllers/UserController')
const requireAdmin = require('../middlewares/requireAdmin')

const router = Router()

router.get('/profile', UserController.index)
router.post('/update', upload.single('photo'), UserController.update)
router.get('/admin', requireAdmin, UserController.indexAdmin)
router.post('/admin', requireAdmin, UserController.admin)
router.post('/promote/:id', requireAdmin, UserController.promote)

module.exports = router