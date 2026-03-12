const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/UserPG'); // Using Sequelize Model

// In-memory Mock Store for when DB is down
const mockUsers = [];

// @route   POST api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!req.dbConnected) {
            // MOCK MODE LOGIC
            const existing = mockUsers.find(u => u.email === email);
            if (existing) return res.status(400).json({ msg: 'User already exists (Mock Store)' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = { id: Date.now(), username, email, password: hashedPassword, profileCompleted: false };
            mockUsers.push(newUser);

            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            return res.json({ token, user: { id: newUser.id, username, email }, mock: true });
        }

        // REAL PG LOGIC
        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = await User.create({ username, email, password });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token, user: { id: user.id, username, email } });

    } catch (err) {
        console.error('Registration Error:', err.message);
        res.status(500).send('Server Error during registration');
    }
});

// @route   POST api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!req.dbConnected) {
            // MOCK MODE LOGIC
            const user = mockUsers.find(u => u.email === email);
            if (!user) return res.status(400).json({ msg: 'Invalid credentials (Mock Store)' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            return res.json({ token, user: { id: user.id, username: user.username, email, profileCompleted: user.profileCompleted }, mock: true });
        }

        // REAL PG LOGIC
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        return res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email,
                profileCompleted: user.profileCompleted
            }
        });

    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).send('Server Error during login');
    }
});

module.exports = router;
