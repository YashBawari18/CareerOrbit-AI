const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/UserPG"); // Sequelize model

// In-memory Mock Store for when DB is down
const mockUsers = [];

// Helper to sign JWT
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @route   POST /api/auth/register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Please provide username, email, and password" });
        }

        // MOCK MODE: when PostgreSQL is not connected
        if (!req.dbConnected) {
            const existing = mockUsers.find((u) => u.email === email);
            if (existing) {
                return res.status(400).json({ msg: "User already exists (Mock Store)" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                id: Date.now(),
                username,
                email,
                password: hashedPassword,
                profileCompleted: false
            };
            mockUsers.push(newUser);

            const token = signToken(newUser.id);

            return res.json({
                token,
                user: { id: newUser.id, username, email, profileCompleted: newUser.profileCompleted },
                mock: true
            });
        }

        // REAL PostgreSQL logic
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Password will be hashed by the Sequelize beforeCreate hook in UserPG.js
        user = await User.create({
            username,
            email,
            password
        });

        const token = signToken(user.id);

        return res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                profileCompleted: user.profileCompleted
            }
        });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).send("Server Error during registration");
    }
});

// @route   POST /api/auth/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Please provide email and password" });
        }

        // MOCK MODE
        if (!req.dbConnected) {
            const user = mockUsers.find((u) => u.email === email);
            if (!user) {
                return res.status(400).json({ msg: "Invalid credentials (Mock Store)" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            const token = signToken(user.id);

            return res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    profileCompleted: user.profileCompleted
                },
                mock: true
            });
        }

        // REAL PostgreSQL logic
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // If your Sequelize model has a comparePassword method:
        // const isMatch = await user.comparePassword(password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = signToken(user.id);

        return res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                profileCompleted: user.profileCompleted
            }
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).send("Server Error during login");
    }
});

module.exports = router;
