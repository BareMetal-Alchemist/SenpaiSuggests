// index.js
const express = require('express');
const bycrypt = require('bcrypt');
const db = require('connection');

const app = express();
app.use(express.json());

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({ message: 'Please provide username and password.' });
        
    }



    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {

        if(err) return res.status(500).json({ message: 'Database error'});

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.'});
        }

        const user = results[0];

        const isMatch = password === user.password;

        if (isMatch) {
            return res.status(200).json({ message: 'Login successful'});
        } else {
            return res.status(401).json({ message: 'Invalid credentials.'});
        }
    });
});

app.listen(3000, () => {
   console.log('Server running on port 3000');
});