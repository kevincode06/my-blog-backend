const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const db = require('./models/db'); // Import MySQL database connection
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// Get all blog posts
app.get('/posts', async (req, res) => {
    try {
        const [posts] = await db.query('SELECT * FROM blog_db.posts');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single blog post
app.get('/posts/:id', async (req, res) => {
    try {
        const [posts] = await db.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
        if (posts.length > 0) {
            res.json(posts[0]);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new post
app.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    try {
        const [result] = await db.query('INSERT INTO posts (title, content, createdAt) VALUES (?, ?, NOW())', [title, content]);
        res.status(201).json({ id: result.insertId, title, content, createdAt: new Date() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
