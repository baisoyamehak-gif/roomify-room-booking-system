const express = require('express');
const router = express.Router();
const { login, register, getMe, loginValidation, registerValidation } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validation');

router.post('/login', loginValidation, validate, login);
router.post('/register', registerValidation, validate, register);
router.get('/me', protect, getMe);

module.exports = router;
