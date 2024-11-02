const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Set up a connection to your MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test_database'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Define an API endpoint to fetch data from the database
app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM user_table', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    res.json(results); // Send the data as JSON
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
