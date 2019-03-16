//based on https://github.com/mpj/oauth-bridge-template
const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cors = require('cors');

const app = express();
app.use(cors());
 
const redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:8888/callback';

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    })
  );
});

app.get('/callback', function(req, res) {
  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    const { access_token, refresh_token, expires_in } = body;
    const uri = process.env.FRONTEND_URI || 'http://localhost:3000/callback';
    const query = querystring.stringify({
      access_token,
      refresh_token,
      expires_in: new Date().getTime() + expires_in * 1000
    });
    res.redirect(`${uri}?${query}`);
  });
});

app.get('/refresh_token', function(req, res) {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const { access_token, expires_in } = body;
      res.send({
        access_token,
        expires_in: new Date().getTime() + expires_in * 1000
      });
    }
  });
});

const port = process.env.PORT || 8888;
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`);
app.listen(port);