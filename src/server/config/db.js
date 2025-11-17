const mysql = require('mysql2/promise');

// Railway provides these automatically:
// MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST,
  user: process.env.MYSQLUSER || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.DB_NAME,
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection on startup
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Connected to MySQL (Railway)");
    conn.release();
  } catch (err) {
    console.error("MySQL Connection Failed:", err.message);
  }
})();

module.exports = pool;
