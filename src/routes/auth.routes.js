const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const router = Router();

router.get('/', AuthController.loginPage);
router.post('/auth/login', AuthController.login);
router.get('/auth/logout', AuthController.logout);


module.exports = router;
