const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const axios = require("axios");
const connection = require('./database');  // Ensure database.js exports the MySQL connection
const path = require('path');
const session = require('express-session');
require('dotenv').config({ path: './key.env'});

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS with credentials to allow cookies from the frontend
app.use(cors({
    origin: 'http://localhost:3000',   // React Front End
    credentials: true
}));

app.use(express.json());
app.use(helmet());

// Initialize session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-key', // Store secret in env in production
  resave: false,
  saveUninitialized: true,
  cookie: { 
      httpOnly: true,
      secure: false,  // Set to true in production with HTTPS
  }
}));

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Set up Google Generative AI client (assuming correct import and usage)
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define generationConfig
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};



// Gemini AI recommendation route
app.post("/api/gemini", async (req, res) => {
  const { animeTitles, feedback } = req.body;
  if (!animeTitles || !feedback) {
    return res.status(400).json({ message: 'Anime titles and feedback are required.' });
  }

  const parts = [
    {
      text: `input: User will pass in anime titles and passages about why they liked those titles. Use this information to respond with up to 10 recommendations for the user. Titles: ${animeTitles}. Reason: ${feedback}.`
    },
    {
      text: "output: Respond with a list of AT LEAST 10 recommended animes based on these titles and reasons. Match the vibe that is interpreted, and provide only anime names in a list without hyphens or numbering."
    }
  ];

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    res.json({ recommendations: result.response.text() });
  } catch (error) {
    console.error("Error with Gemini API:", error.message);
    res.status(500).json({ message: "Error generating recommendations", details: error.message });
  }
});

// Jikan API fetch route
app.get("/api/anime/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${title}&sfw=true`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Jikan API:", error.message);
    res.status(500).json({ message: "Error fetching anime data", details: error.message });
  }
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password.' });
  }

  const query = 'SELECT * FROM user_table WHERE username = ?';
  connection.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.userId = user.userid;  // Store the user ID in the session
      console.log("Login successful, session data:", req.session); // Log session after setting userId
      res.status(200).json({ message: 'Login successful', redirectUrl: "mainmenu" });
    } else {
      res.status(401).json({ message: 'Invalid credentials.' });
    }
  });
});

// User info route tfo retrieve session-stored user ID
app.get("/api/user", (req, res) => {
  console.log("Session data in /api/user:", req.session); // Log session data for inspection
  if (req.session.userId) {
    res.json({ userId: req.session.userId });
  } else {
    res.status(401).json({ error: "User not logged in" });
  }
});

// Protected route
app.get("/protected-route", (req, res) => {
  if (req.session.userId) {
    res.json({ message: "Welcome, authenticated user!" });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Register Endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  try {
    const hashedPW = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO user_table (username, password) VALUES (?, ?)';
    connection.query(query, [username, hashedPW], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
});

app.post("/likes", async (req, res) => {
  const { userid, mal_id, passage } = req.body;
  console.log("Received POST request on /likes with:", { userid, mal_id, passage });

  try {
    const query = "INSERT INTO likes_table (mal_id, userid, passage) VALUES (?, ?, ?)";
    connection.query(query, [mal_id, userid, passage], (err, results) => {
      if (err) {
        console.error("Database error in /likes:", err); // Log database-specific error
        return res.status(500).json({ error: "Error liking anime" });
      }
      console.log("Anime liked successfully:", results);
      res.status(200).json({ message: "Anime liked successfully" });
    });
  } catch (error) {
    console.error("Error in /likes endpoint:", error); // Log general server-side error
    res.status(500).json({ error: "Error liking anime" });
  }
});


app.get("/likes/:userid", async (req, res) => {
  const { userid } = req.params;
  const query = "SELECT mal_id, passage FROM likes_table WHERE userid = ?";
  connection.query(query, [userid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching liked animes" });
    }
    res.status(200).json(results);
  });
});

// Serve React app for any route not handled by the API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});
