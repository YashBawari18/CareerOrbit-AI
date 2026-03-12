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
                process.env.FRONTEND_URL
            ];
            
            // Check if the origin matches any of the allowed origins
            // Also allow any subdomain of vercel.app for preview deployments
            if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app")) {
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

/* -------------------- GLOBAL DB STATUS -------------------- */
let pgConnected = false;

// Inject DB status into request
app.use((req, res, next) => {
    req.dbConnected = pgConnected;
    next();
});

/* -------------------- ROOT ROUTE -------------------- */
app.get("/", (req, res) => {
    res.status(200).json({
        message: "CareerOrbit API is running",
        endpoints: [
            "/health",
            "/api/status",
            "/api/auth/register",
            "/api/auth/login"
        ]
    });
});

/* -------------------- HEALTH CHECK -------------------- */
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        postgres: pgConnected
    });
});

/* -------------------- ROUTES -------------------- */
const authRoutes = require("./routes/auth");

// All auth routes are /api/auth/*
app.use("/api/auth", authRoutes);

app.get("/api/status", (req, res) => {
    res.json({
        status: "online",
        database: pgConnected ? "postgresql" : "mock_mode"
    });
});

/* -------------------- ERROR SAFETY -------------------- */
process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    process.exit(1);
});

/* -------------------- START SYSTEM -------------------- */
const startSystem = async () => {
    try {
        console.log("📡 Attempting PostgreSQL connection...");
        await sequelize.authenticate();
        pgConnected = true;

        await sequelize.sync({ alter: true });
        console.log("✅ PostgreSQL Connected & Synced");
    } catch (err) {
        console.warn("⚠️ PostgreSQL connection failed. Running in MOCK MODE.");
        pgConnected = false;
    }

    const PORT = process.env.PORT || 5000;
    console.log(`🔍 Environment PORT: ${process.env.PORT || "not provided"}`);

    const server = app.listen(PORT, () => {
        console.log(`🚀 CareerOrbit API running on port ${PORT}`);
        if (!pgConnected) {
            console.log("🛡️ MOCK MODE ACTIVE: No persistent DB session");
        }
    });

    server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.error(`❌ Port ${PORT} already in use`);
        } else {
            console.error("❌ Server error:", err);
        }
    });
};

startSystem();
