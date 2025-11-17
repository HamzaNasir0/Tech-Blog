const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

// Serve static client
const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));

// Fallback to index.html for root
app.use((req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});