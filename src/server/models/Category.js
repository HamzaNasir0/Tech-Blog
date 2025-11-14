const db = require('../config/db');

async function getAllCategories() {
  const [rows] = await db.query('SELECT * FROM categories ORDER BY name ASC');
  return rows;
}

module.exports = {
  getAllCategories
};
