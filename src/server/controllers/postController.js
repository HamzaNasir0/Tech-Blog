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

async function listMyPosts(req, res) {
  try {
    const posts = await Post.getPostsByUser(req.user.id);
    return res.json(posts);
  } catch (err) {
    console.error('List my posts error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function createPost(req, res) {
  try {
    const { title, content, category_id } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const post = await Post.createPost({
      title: title.trim(),
      content: content.trim(),
      category_id: category_id || null,
      user_id: req.user.id
    });

    return res.status(201).json(post);
  } catch (err) {
    console.error('Create post error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { title, content, category_id } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const post = await Post.updatePost(id, req.user.id, {
      title: title.trim(),
      content: content.trim(),
      category_id: category_id || null
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found or not yours' });
    }

    return res.json(post);
  } catch (err) {
    console.error('Update post error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const ok = await Post.deletePost(id, req.user.id);

    if (!ok) {
      return res.status(404).json({ error: 'Post not found or not yours' });
    }

    return res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('Delete post error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  listPosts,
  getPost,
  listMyPosts,
  createPost,
  updatePost,
  deletePost
};
