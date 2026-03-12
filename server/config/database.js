const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL is not set. The server will attempt to run in MOCK MODE.');
}

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/careerorbit_mock', {
    dialect: 'postgres',
    logging: false,
    dialectOptions: process.env.NODE_ENV === 'production' ? {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    } : {}
});

module.exports = sequelize;
