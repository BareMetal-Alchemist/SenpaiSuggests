const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const connection = require('./database');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.use(express.static('public'));



// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({ message: 'Please provide username and password.' });
        
    }



    const query = 'SELECT * FROM user_table WHERE username = ?';
    connection.query(query, [username], async (err, results) => {

        if(err) return res.status(500).json({ message: 'Database error'});

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.'});
        }

        const user = results[0];

        const isMatch = password === user.password;

        if (isMatch) {
            return res.status(200).json({ message: 'Login successful', redirectUrl: "https://www.youtube.com/"});
        } else {
            return res.status(401).json({ message: 'Invalid credentials.'});
        }
    });
});

//SignUp Endpoint
app.post('/signup', (req, res)=>{
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password'});
    }

    const query = '';




});

connection.query('SELECT * FROM user_table', (error, results, fields) => {
  if (error) throw error;
  console.log(results); // Results from the database
 
});

// Define an API endpoint to fetch data from the database
// app.get('/api/data', (req, res) => {
//   connection.query('SELECT * FROM user_table', (error, results) => {
//     if (error) {
//       res.status(500).json({ error: 'Error fetching data' });
//       return;
//     }
//     res.json(results); // Send the data as JSON
//   });
// });

app.listen(port, () => {
   console.log('Server running on port ' + port);
});