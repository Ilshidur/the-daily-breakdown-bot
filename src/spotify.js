// const axios = require('axios');
const { parse: parseUrl } = require('url');
const SpotifyWebApi = require('spotify-web-api-node');

const { spotify: config } = require('./config');

const spotifyApi = new SpotifyWebApi({ ...config, redirectUri: 'https://daily-breakdown.xyz/callback' });

async function init() {
  const authorizationCode = await spotifyApi.clientCredentialsGrant();
  console.log(authorizationCode.body.access_token);
  const data = await spotifyApi.authorizationCodeGrant(authorizationCode.body.access_token);
  console.log(data);
  spotifyApi.setAccessToken(data.body.access_token);
  // const url = spotifyApi.createAuthorizeURL(['user-read-private'], 'yo');
  // console.log(url);
  // const res = await axios.get(url);
  // console.log(res.headers);


}

async function addSongToPlaylist(song) {
  try {
    const data = await spotifyApi.addTracksToPlaylist(config.playlistUserId, config.playlistId, ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"])
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { init, addSongToPlaylist };

