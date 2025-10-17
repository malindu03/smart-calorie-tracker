const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin, checkValidation } = require('../middleware/validation');

// Registration route: validates input, handles validation errors, then calls controller
router.post('/register', validateRegister, checkValidation, register);

// Login route
router.post('/login', validateLogin, checkValidation, login);

module.exports = router;

