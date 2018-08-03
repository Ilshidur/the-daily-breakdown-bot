require('dotenv').config();

module.exports = {
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,


    playlistUserId: process.env.SPOTIFY_PLAYLIST_USER_ID,
    playlistId: process.env.SPOTIFY_PLAYLIST_ID,
  }
};
