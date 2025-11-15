CREATE DATABASE IF NOT EXISTS techblog;
USE railway;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE
);

-- POSTS TABLE
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- SEED CATEGORIES
INSERT INTO categories (name, slug) VALUES
('All', 'all'),
('Gaming', 'gaming'),
('Reviews', 'reviews'),
('Guides', 'guides'),
('News', 'news'),
('Mods', 'mods')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- SEED DEMO USER (password: password123)
INSERT INTO users (username, email, password_hash)
VALUES ('demo', 'dummyDemo@example.com', '$2a$10$zW6s8OQdH8xHBlq8ZP2uUO/4DduGwQ11P5Jy.bnKqJMu38xpv8SLe')
ON DUPLICATE KEY UPDATE username = VALUES(username);

-- SEED FIRST POST
INSERT INTO posts (title, content, category_id, user_id)
SELECT 'Welcome to the Tech Blog',
       'This is your first demo post. Edit or delete it from the Admin page.',
       2, u.id
FROM users u
WHERE u.email = 'dummyDemo@example.com'
LIMIT 1;
