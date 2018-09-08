require("dotenv").config();
var request = require("request");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require('fs');

//PROCESS.ARGV Vars
var keyWordSearch = process.argv[2];
var searchInput = process.argv.slice(3).join(" ");

var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);

//IF USER INPUTS concert-this
if(keyWordSearch === "concert-this") {
    concertSearch();
}

function concertSearch() {
    request("https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp", function(error, response, body) {

  if (!error && response.statusCode === 200) {
    concertDate = moment(JSON.parse(body)[0].datetime).format('MM DD YYYY');
    console.log("Venue: " + JSON.parse(body)[0].venue.name);
    console.log("Location: " + JSON.parse(body)[0].venue.city + ', ' + JSON.parse(body)[0].venue.region);
    console.log("Date: " + concertDate);
  }
});
}

//IF USER INPUTS spotify-this-song
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
        console.log("Artist/Band: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Preview Song: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
      });
}

//IF USER INPUTS movie-this
if(keyWordSearch === 'movie-this' && searchInput === "") {
    searchInput = 'Mr. Nobody';
    omdbSearch();
} else if(keyWordSearch === 'movie-this') {
    omdbSearch();
} 

function omdbSearch() {
    request("http://www.omdbapi.com/?t=" + searchInput + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  if (!error && response.statusCode === 200) {
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Released: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Produced in: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});
}

//IF USER INPUTS do-what-it-says
if(keyWordSearch === 'do-what-it-says') {
    fs.readFile('random.txt', 'utf-8', function(err, data) {
        newArr = data.split(",");

        keyWordSearch = newArr[0];
        searchInput = newArr[1];
        if(keyWordSearch === 'spotify-this-song') {
            spotifySearch();
        } else if(keyWordSearch === 'movie-this') {
            omdbSearch();
        } else if(keyWordSearch === 'concert-this') {
            concertSearch();
        }
        
    })
}




