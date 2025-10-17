const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// User registration

const register = async (req, res) => {
    try {
        const { username, email, password, name } = req.body;

        // Check if username or email already exists
        const existingUsername = await prisma.user.findUnique({ where: {username} });

        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const existingEmail = await prisma.user.findUnique({ where: {email} });

        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash password
        const hashedPassword =  await bcrypt.hash(password, 10);

        // Create new user
        const user =  await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                name
            }
        });

        //Generate JWT token
        const token =  generateToken(user.id);

        // Respond successfully with user data and token
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name
            },
            token
        });


    }catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// User login

const login = async (req, res) => {
    try {
        const {usernameOrEmail, password} = req.body;

        // Find user
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
            }
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Validate password
        const isValidPass = await bcrypt.compare(password, user.password);

        if (!isValidPass) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user.id);

        // Respond successfully with user data and token
        res.json({
        message: 'Login successful',
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name
        },
        token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

module.exports = {register, login};