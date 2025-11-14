const Category = require('../models/Category');

async function getCategories(req, res) {
  try {
    const categories = await Category.getAllCategories();
    return res.json(categories);
  } catch (err) {
    console.error('Categories error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  getCategories
};
