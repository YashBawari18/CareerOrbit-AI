const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables FIRST
const result = dotenv.config();
if (result.error) {
    console.error("❌ Failed to load .env file:", result.error);
}

const sequelize = require("./config/database");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            const allowedOrigins = [
                "http://localhost:5173",
                "http://localhost:3000",
                "https://career-orbit-ai.vercel.app",
                "https://careerorbit-ai-3.onrender.com",  // Added your Render frontend URL
                process.env.FRONTEND_URL
            ].filter(Boolean);  // Remove any falsy values
            
            // Check if the origin matches any of the allowed origins
            // Also allow any subdomain of vercel.app or onrender.com for preview deployments
            if (allowedOrigins.some(allowed => origin === allowed) || 
                origin.endsWith(".vercel.app") || 
                origin.endsWith(".onrender.com")) {
                callback(null, true);
            } else {
                console.log("Blocked by CORS:", origin); // Debug log
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
        credentials: true
    })
);

// Rest of your server.js code remains the same...