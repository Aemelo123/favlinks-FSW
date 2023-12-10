const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Set up the connection pool to the PostgreSQL database
const pool = new Pool({
  user: 'aemelo123',
  host: 'localhost',
  database: 'favlinks',
  password: 'ALCHEmy00!!',
  port: 5432,
});

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Route to get all links from the database
app.get('/api/links', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM links');
    res.json(rows);
  } catch (error) {
    console.error('Error getting links:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new link in the database
app.post('/api/links', async (req, res) => {
  const { name, url } = req.body;
  try {
    const result = await pool.query('INSERT INTO links (name, url) VALUES ($1, $2) RETURNING *', [name, url]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a link in the database by ID
app.post('/api/links/:id', async (req, res) => {
  const { id } = req.params;
  const { name, url } = req.body;
  try {
    const result = await pool.query('UPDATE links SET name = $1, url = $2 WHERE id = $3 RETURNING *', [name, url, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a link from the database by ID
app.post('/api/links/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM links WHERE id = $1 RETURNING *', [id]);
    res.json({ message: 'Link deleted successfully', deletedLink: result.rows[0] });
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
