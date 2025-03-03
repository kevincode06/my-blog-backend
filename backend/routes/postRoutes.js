const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const [posts] = await db.query('SELECT * FROM posts');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new post
router.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  try {
    const [result] = await db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
    res.status(201).json({ id: result.insertId, title, content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
