const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const router = Router();

router.get('/', AuthController.loginPage);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);


module.exports = router;
