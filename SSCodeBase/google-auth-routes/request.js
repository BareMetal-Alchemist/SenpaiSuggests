const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { OAuth2Client } = require('google-auth-library');

router.post('/', async function (request, response, next) {
  response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.header('Referrer-Policy', 'no-referrer-when-downgrade');

  const redirectURL = 'http://localhost:5000/oauth';

  const oauth2client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectURL
  );

  try {
    const authorizeURL = oauth2client.generateAuthUrl({
      access_type: 'offline',
      scope: ( 'https://www.googleapis.com/auth/userinfo.profile openid' ),
      prompt: 'consent'
    });

    response.json({ url: authorizeURL });
  } catch (error) {
    console.error("Authorization URL generation failed:", error);
    response.status(500).send("Failed to generate auth URL");
  }
});

module.exports = router;
