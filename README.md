# The React App with caching built with Redux using Spotify API

## Demo
![Demo 1][1]

## Usage

First clone this repository and follow the steps below.

### Server
------
Open a terminal window:
1. Go to the /server directory and install all dependencies:

    ```
    cd react-spotify-api/server
    npm install
    ```

2. Register a Spotify App here: https://developer.spotify.com/dashboard/applications and set Redirect URI to: http://localhost:8888/callback

3. Write the below commands in your terminal (replacing XXX and YYY with your actual spotify client id and secret. You can find them on the page where you registered your app):

    ```
    export SPOTIFY_CLIENT_ID=XXX
    export SPOTIFY_CLIENT_SECRET=YYY
    npm start
    ```

After these steps, your node server should be running.

### App
-------
Open another terminal window:
1. Go to the /app directory and install all dependencies:

    ```
    cd react-spotify-api/app
    npm install
    ```

2. Run npm command (it builds your app and starts a development server):

    ```
    npm start
    ```

3. Then go to http://localhost:3000 in your browser.

[1]: ./demo/demo.gif