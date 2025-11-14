const db = require('../config/db');

async function findByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function findById(id) {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function createUser({ username, email, password_hash }) {
  const [result] = await db.query(
    'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
    [username, email, password_hash]
  );
  return { id: result.insertId, username, email };
}

module.exports = {
  findByEmail,
  findById,
  createUser
};
