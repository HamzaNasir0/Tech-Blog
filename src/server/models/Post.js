const db = require('../config/db');

async function getAllPosts(categoryId) {
  let sql = `
    SELECT p.id, p.title, p.content, p.created_at, p.updated_at,
           c.name AS category_name, c.id AS category_id,
           u.username AS author_name
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `;
  const params = [];

  if (categoryId && categoryId !== 'all') {
    sql = `
      SELECT p.id, p.title, p.content, p.created_at, p.updated_at,
             c.name AS category_name, c.id AS category_id,
             u.username AS author_name
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.user_id = u.id
      WHERE c.id = ?
      ORDER BY p.created_at DESC
    `;
    params.push(categoryId);
  }

  const [rows] = await db.query(sql, params);
  return rows;
}

async function getPostById(id) {
  const [rows] = await db.query(
    `
    SELECT p.id, p.title, p.content, p.created_at, p.updated_at,
           c.name AS category_name, c.id AS category_id,
           u.username AS author_name
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
  `,
    [id]
  );
  return rows[0];
}

async function getPostsByUser(userId) {
  const [rows] = await db.query(
    `
    SELECT p.id, p.title, p.content, p.created_at, p.updated_at,
           c.name AS category_name, c.id AS category_id
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.user_id = ?
    ORDER BY p.created_at DESC
  `,
    [userId]
  );
  return rows;
}