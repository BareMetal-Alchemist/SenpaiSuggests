const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const axios = require("axios");
const connection = require('./database');
const path = require('path');

// Google OAuth2 required stuff:
const authRouter = require('./google-auth-routes/oauth');
const requestRouter = require('./google-auth-routes/request');
// end of Google OAuth2 required stuff

const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, HarmBlockThreshhold } = require('@google/generative-ai');
require('dotenv').config({ path: './key.env'});

const app = express();
const session = require('express-session');
const port = process.env.PORT || 5000;

// rest of Google OAuth2 stuff:
app.use('/oauth', authRouter);
app.use('/request', requestRouter);
// end of all Google OAuth2 stuff in this file

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// Define generation configuration
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  // Route to get anime recommendations
  app.post("/api/gemini", async (req, res) => {
    const { animeTitles, feedback } = req.body; // Assume we get titles and feedback in the request body

    if (!animeTitles || !feedback) {
      return res.status(400).json({ message: 'Anime titles and feedback are required.' });
    }

    // Define the parts for the content
    const parts = [
      {
        text: `input: User will pass in anime titles and passages about why they liked those titles. Use this information to respond with up to 10 recommendations for the user. Titles: ${animeTitles}. Reason: ${feedback}.`
      },
      {
        text: "output: Respond with a list of 10 recommended animes based on these titles and reasons. Match the vibe that is interpreted, and provide only anime names in a list without hyphens or numbering."
      }
    ];

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Make the API call to Gemini
      const result = await model.generateContent({
        contents: [{ role: "user", parts }], // Pass parts in the expected format
        generationConfig,  // Include generation config
      });

      // Log the full result for debugging purposes
      console.log("Gemini API Response:", result);

      // Send the response back to the client
      res.json({ recommendations: result.response.text() });
    } catch (error) {
      console.error("Error with Gemini API:", error.message);
      res.status(500).json({ message: "Error generating recommendations", details: error.message });
    }
  });


// Route to fetch anime data from Jikan API
app.get("/api/anime/:title", async (req, res) => {
    const title = req.params.title;
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${title}&sfw=true`);
        console.log("Jikan API Response Data:", response.data); // Log the actual data received
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from Jikan API:", error.message, error.response?.data); // Log detailed error message and any response data
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

        if(err) return res.status(500).json({ message: 'Database error'});

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.'});
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({ message: 'Login successful', redirectUrl: "mainmenu"});
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



// Session cookies
app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: true,
  cookie: { 
      httpOnly: true,      
      secure: false        
  }
}));

// Sign in check
app.get("/protected-route", (req, res) => {
  if (req.session.userId) {
      res.json({ message: "Welcome, authenticated user!" });
  } else {
      res.status(401).json({ error: "Unauthorized" });
  }
});


app.post("/likes", async (req, res) => {
  const { userid, mal_id } = req.body;
  try {
      await db.query("INSERT INTO likes_table (userid, mal_id) VALUES (?, ?)", [userid, mal_id]);
      res.status(200).json({ message: "Anime liked successfully" });
  } catch (error) {
      res.status(500).json({ error: "Error liking anime" });
  }
});

app.get("/likes/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
      const [results] = await db.query("SELECT * FROM likes_table WHERE userid = ?", [userid]);
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ error: "Error fetching liked animes" });
  }
});


connection.query('SELECT * FROM user_table', (error, results, fields) => {
  if (error) throw error;
  console.log("Database Connected!"); // Results from the database

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




app.listen(port, '0.0.0.0', () => {
   console.log('Server running on port ' + port);
});
