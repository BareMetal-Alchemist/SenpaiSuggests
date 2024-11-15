const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { OAuth2Client } = require('google-auth-library');

async function getUserData(access_token) {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  const data = await response.json();
  console.log('User Data: ', data);

  /****  'data' that has 'sub' for user auth!! ('data.sub'?)  ****/
}

router.get('/', async function (request, response, next) {
  const code = request.query.code;
  try {
    const redirectURL = 'http://localhost:5000/oauth';

    const oauth2client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectURL
    );

    const response = await oauth2client.getToken(code);
    await oauth2client.setCredentials(response.tokens);

    if (!response.tokens) {
      throw new Error('Failed to retrieve tokens from response');
    }

    console.log('**Access Token: ', response.tokens.access_token);

    const user = oauth2client.credentials;
    console.log('**Credentials: ', user);

    await getUserData(user.access_token);
  } catch (err) {
    console.log('Error with signing in with Google.', err);
  }

  response.redirect(303, 'http://localhost:3000/mainmenu');
});

module.exports = router;
