# 📘 Tech Blog – Backend Setup Guide

A lightweight Node.js + Express + MySQL backend powering a simple Tech Blog API.

This README explains how to install, configure, and run the server.

---

## 🚀 Features

- User registration & login (JWT authentication)
- Create, read, update, and delete blog posts
- Category system with seeded data
- MySQL database schema + seed entries
- Serves a frontend client folder
- Clean modular Express routing

---

## 📦 Requirements

Ensure you have the following installed:

- Node.js 16+
- MySQL Server
- npm
- (Optional) MySQL Workbench or TablePlus

---

## 🛠️ Installation

Clone the project and install dependencies:

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=3001

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=techblog

JWT_SECRET=supersecretchangeme
```

If your MySQL server uses a custom port:

```env
DB_PORT=3306
```

---

## 🗄️ Database Setup

1. Start your MySQL server.
2. Open your SQL tool (Workbench / CLI).
3. Run the schema:

```sql
SOURCE schema.sql;
```

This will:

- Create the database & tables
- Seed default categories
- Create a demo user  
  **email:** demo@example.com  
  **password:** password123
- Insert a welcome post

---

## ▶️ Running the Server

Start normally:

```bash
npm start
```

Or using nodemon:

```bash
npm run dev
```

If successful, you'll see:

```
Database connected successfully
Server running on http://localhost:3001
```

---

## 🌐 API Endpoints

### **Users**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login user and return JWT |
| GET | `/api/users/me` | Get logged-in user details |

### **Posts**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get a single post |
| POST | `/api/posts` | Create a post |
| PUT | `/api/posts/:id` | Update a post |
| DELETE | `/api/posts/:id` | Delete a post |

### **Categories**
| Method | Endpoint |
|--------|----------|
| GET | `/api/categories` |
