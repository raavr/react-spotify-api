//https://github.com/mpj/oauth-bridge-template
let express = require('express')
let request = require('request')
let querystring = require('querystring')
let cors = require('cors');

let app = express()
app.use(cors())
 
let redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:8888/callback'

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    const access_token = body.access_token;
    const refresh_token = body.refresh_token;
    const uri = process.env.FRONTEND_URI || 'http://localhost:3000/callback';
    const query = querystring.stringify({
      access_token: access_token,
      refresh_token: refresh_token
    });
    res.redirect(`${uri}?${query}`);
  })
})

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
      refresh_token: refresh_token
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        'access_token': access_token
      })
    }
  })
})

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)