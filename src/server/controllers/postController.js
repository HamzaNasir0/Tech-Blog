const Post = require('../models/Post');

async function listPosts(req, res) {
  try {
    const { category } = req.query; // category id or 'all'
    const posts = await Post.getAllPosts(category);
    return res.json(posts);
  } catch (err) {
    console.error('List posts error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}