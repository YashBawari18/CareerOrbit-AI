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

// CORS Configuration
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            
            const allowedOrigins = [
                "http://localhost:5173",
                "http://localhost:3000",
                "https://career-orbit-ai.vercel.app",
                "https://careerorbit-ai-3.onrender.com",
                process.env.FRONTEND_URL
            ].filter(Boolean);
            
            if (
                origin.startsWith("http://localhost:") ||
                allowedOrigins.some(allowed => origin === allowed) || 
                origin.endsWith(".vercel.app") || 
                origin.endsWith(".onrender.com")
            ) {
                callback(null, true);
            } else {
                console.log("Blocked by CORS:", origin);
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
        credentials: true
    })
);

// Request Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

/* -------------------- GLOBAL DB STATUS -------------------- */
let pgConnected = false;

// Inject DB status into request
app.use((req, res, next) => {
    req.dbConnected = pgConnected;
    next();
});

/* -------------------- ROUTES -------------------- */
app.get("/", (req, res) => {
    res.status(200).json({
        message: "CareerOrbit API is running",
        endpoints: [
            "/health",
            "/api/status",
            "/api/auth/register",
            "/api/auth/login",
            "/api/jobs/recommendations"
        ]
    });
});

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        postgres: pgConnected
    });
});

// API Routes
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/api/status", (req, res) => {
    res.json({
        status: "online",
        database: pgConnected ? "postgresql" : "mock_mode"
    });
});

/* -------------------- ERROR HANDLING -------------------- */
// 404 Handler
app.use((req, res) => {
    res.status(404).json({ 
        error: "Not Found",
        path: req.path,
        method: req.method
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: "Internal Server Error",
        message: err.message
    });
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    process.exit(1);
});

/* -------------------- START SERVER -------------------- */
const startSystem = async () => {
    try {
        console.log("📡 Attempting PostgreSQL connection...");
        await sequelize.authenticate();
        pgConnected = true;
        await sequelize.sync({ alter: true });
        console.log("✅ PostgreSQL Connected & Synced");
    } catch (err) {
        console.warn("⚠️ PostgreSQL connection failed. Running in MOCK MODE.");
        console.error("Database Error:", err.message);
        pgConnected = false;
    }

    const PORT = process.env.PORT || 5000;
    console.log(`🔍 Environment PORT: ${PORT}`);
    console.log(`🔗 Base URL: http://localhost:${PORT}`);

    const server = app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        if (!pgConnected) {
            console.log("🛡️ MOCK MODE ACTIVE: Using in-memory storage");
        }
    });

    server.on("error", (err) => {
        console.error("❌ Server Error:", err);
        process.exit(1);
    });
};

startSystem();