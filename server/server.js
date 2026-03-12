const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars at the very top
const result = dotenv.config();
if (result.error) {
    console.error('❌ Failed to load .env file:', result.error);
}

const sequelize = require('./config/database');

const app = express();
app.use(express.json());
app.use(cors());

// Global DB Status
let pgConnected = false;

// Middleware to inject DB status
app.use((req, res, next) => {
    req.dbConnected = pgConnected;
    next();
});

// Import Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        database: pgConnected ? 'postgresql' : 'mock_mode',
    });
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Database and Server Start
const startSystem = async () => {
    try {
        console.log('📡 Attempting PostgreSQL Synchronization...');
        await sequelize.authenticate();
        pgConnected = true;
        await sequelize.sync({ alter: true });
        console.log('✅ PostgreSQL Connected & Synchronized');
    } catch (err) {
        console.warn('⚠️ PostgreSQL connection failed. Using [MOCK MODE].');
        pgConnected = false;
    }

    const PORT = process.env.PORT || 5001; // Default to 5001
    console.log(`🔍 Initialization: Environment Port identified as ${process.env.PORT}`);

    const server = app.listen(PORT, () => {
        console.log(`🚀 CareerOrbit API Core navigating on port ${PORT}`);
        if (!pgConnected) {
            console.log('🛡️  MOCK MODE ACTIVE: User sessions are temporary.');
        }
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`❌ Port ${PORT} is occupied. Please check for background processes.`);
        } else {
            console.error('❌ Server Listen Error:', err);
        }
    });
};

startSystem();
