// routes/auth.js

const express = require('express');
const authController = require('../controllers/authController');
const validateMiddleware = require('../middleware/validateMiddleware');

const router = express.Router();

router.post('/register', validateMiddleware.validateRegistration, authController.register);
router.post('/login', validateMiddleware.validateLogin, authController.login);

module.exports = router;
