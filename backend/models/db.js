const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'mafuta19650',
  database: 'blog_db',
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 0
});

async function getPosts() {
  try {
    // Use await with the Promise-based query
    const [rows] = await pool.promise().query("SELECT * FROM blog_db.posts");  
    console.log(rows);
  } catch (err) {
    console.log(err);
  }
}

getPosts();

module.exports = pool.promise();
