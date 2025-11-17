const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check for Railway
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

// Correct path: server => ../client
const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));

// Fallback route - Express 5 compatible
app.use((req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
