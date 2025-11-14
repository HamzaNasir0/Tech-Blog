const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existing = await User.findByEmail(email.trim());
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.createUser({
      username: username.trim(),
      email: email.trim(),
      password_hash: hash
    });

    return res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}