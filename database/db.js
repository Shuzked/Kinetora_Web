const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * KINETORA OS - Database Connection Module
 * This module uses mysql2/promise to handle database operations strictly via environment variables.
 */

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
};

// Create the pool
const pool = mysql.createPool(dbConfig);

// Helper function to execute queries
async function query(sql, params) {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Database Query Error:', error);
        throw error;
    }
}

module.exports = {
    pool,
    query
};
