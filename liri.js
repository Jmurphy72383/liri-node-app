require("dotenv").config();
var request = require("request");
var Spotify = require('node-spotify-api');
var moment = require('moment');

//PROCESS.ARGV Vars
var keyWordSearch = process.argv[2];
var searchInput = process.argv.slice(3).join(" ");

var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);

//IF USER INPUTS CONCERT-THIS
if(keyWordSearch === "concert-this") {
    request("https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp", function(error, response, body) {

  if (!error && response.statusCode === 200) {
    concertDate = moment(JSON.parse(body)[0].datetime).format('MM DD YYYY');
    console.log(JSON.parse(body)[0].venue.name); //Name of Venue
    console.log(JSON.parse(body)[0].venue.city + ', ' + JSON.parse(body)[0].venue.region); //Venue Location
    console.log(concertDate); //Date of Event
  }
});
}

//IF USER INPUTS SPOTIFY-THIS-SONG
if(keyWordSearch === 'spotify-this-song' && searchInput === "") {
    searchInput = 'The Sign';
    spotifySearch();
} else if(keyWordSearch === 'spotify-this-song') {
    spotifySearch();
} 

function spotifySearch() {
    spotify.search({ type: 'track', query: searchInput, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        console.log(data.tracks.items[0].album.artists[0].name); //Artists/Band Name
        console.log(data.tracks.items[0].name); //Song Name
        console.log(data.tracks.items[0].album.artists[0].external_urls.spotify); //Preview Link from Spotify
        console.log(data.tracks.items[0].album.name); //Album The Song is On.
      });
}





