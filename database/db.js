import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

/**
 * KINETORA OS - Database Connection Module
 * This module uses mysql2/promise to handle database operations strictly via environment variables.
 */

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'kinetora_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
};

// Create the pool
const pool = mysql.createPool(dbConfig);

// Helper function to execute queries
export async function query(sql, params) {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Database Query Error:', error);
        throw error;
    }
}

// Initialize tables if they don't exist
export async function initDb() {
    const subtasksTable = `
        CREATE TABLE IF NOT EXISTS subtasks (
            id VARCHAR(50) PRIMARY KEY,
            task_id INT,
            title VARCHAR(255) NOT NULL,
            is_done BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
        );
    `;
    await query(subtasksTable);
    console.log("Database initialized: subtasks table ready.");
}

export default {
    pool,
    query,
    initDb
};
