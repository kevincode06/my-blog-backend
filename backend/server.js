const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());

// Helper function to read JSON file
const readPosts = () => {
    const postsData = fs.readFileSync('posts.json');
    return JSON.parse(postsData);
};

// const posts = readPosts();
// console.log(posts); 

// Helper function to write JSON file
const writePosts = (data) => {
    fs.writeFileSync('posts.json', JSON.stringify(data, null, 2));
};

// Routes

// Get all blog posts
app.get('/posts', (req, res) => {
    const posts = readPosts();
    res.json(posts);
});

// Get a single blog post
app.get('/posts/:id', (req, res) => {
    const posts = readPosts();
 console.log(posts)
    const post = posts.find(p => p.id == parseInt(req.params.id));
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// Create a new post (simple example, no authentication here)
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    const posts = readPosts();
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        createdAt: new Date().toISOString()
    };
    posts.push(newPost);
    writePosts(posts);
    res.status(201).json(newPost);
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
    const posts = readPosts();
    const updatedPosts = posts.filter(p => p.id !== parseInt(req.params.id));
    writePosts(updatedPosts);
    res.status(200).json({ message: 'Post deleted' });
});

// Example for handling user authentication and password encryption
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = { username, password: hashedPassword };

    
    res.status(201).json({ message: 'User registered', user });
});

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
