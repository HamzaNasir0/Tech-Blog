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

async function getPost(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.getPostById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.json(post);
  } catch (err) {
    console.error('Get post error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}