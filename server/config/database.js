const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set. Please add it to your environment variables.');
    process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
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
