const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries
    dialectOptions: {
        // SSL might be required for cloud DBs (Heroku, Supabase, etc.)
        // ssl: {
        //     require: true,
        //     rejectUnauthorized: false
        // }
    }
});

module.exports = sequelize;
