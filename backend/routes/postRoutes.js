const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const [posts] = await db.query("SELECT * FROM posts");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single post
router.get("/posts/:id", async (req, res) => {
  try {
    const [posts] = await db.query("SELECT * FROM posts WHERE id = ?", [req.params.id]);
    if (posts.length > 0) {
      res.json(posts[0]);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new post
router.post("/posts", async (req, res) => {
  const { title, content } = req.body;
  try {
    const [result] = await db.query("INSERT INTO posts (title, content, createdAt) VALUES (?, ?, NOW())", [title, content]);
    res.status(201).json({ id: result.insertId, title, content, createdAt: new Date() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a post
router.delete("/posts/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
