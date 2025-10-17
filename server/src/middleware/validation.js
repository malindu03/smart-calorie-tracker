const { body, validationResult } = require('express-validator');

// Registration validation rules
const validateRegister = [
    body('username').trim().notEmpty().withMessage('Username is required')
        .isLength({ min:3, max:20 }).withMessage('Username must be 3-20 characters'),
    body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').isLength({ min:6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is required')
    .isLength({ min:2, max:50 }).withMessage('Name must be 2-50 characters')
];

const validateLogin = [
    body('usernameOrEmail').trim().notEmpty().withMessage('Username or Email is required'),
    body('password').notEmpty().withMessage('Password is required')
];

// Check validation results
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(err => ({
            field: err.path,
            message: err.msg
          }))
        });
    }
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    checkValidation
};