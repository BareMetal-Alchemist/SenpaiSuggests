const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const axios = require("axios");
const connection = require('./database');
const path = require('path');


const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));








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

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({ message: 'Login successful', redirectUrl: "https://www.youtube.com/"});
        } else {
            return res.status(401).json({ message: 'Invalid credentials.'});
        }
    });
});

//SignUp Endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        console.log('Username or password missing');
        return res.status(400).json({ message: 'Please provide username and password' });
    }

    try {
        console.log('Hashing password');
        const hashedPW = await bcrypt.hash(password, 10);
        
        const query = 'INSERT INTO user_table (username, password) VALUES (?, ?)';
        connection.query(query, [username, hashedPW], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            console.log('User registered successfully');
            return res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Error processing request' });
    }
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


// Serve React app for any route not handled by the API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


app.listen(port, () => {
   console.log('Server running on port ' + port);
});