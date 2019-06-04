require("dotenv").config();

//variables
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

var filename = "./log.txt";
var spotify = new Spotify(keys.spotify);

switch(process.argv[2]){
    case 'concert-this':
        //Bands in Town API
        //Example ~~~~ node liri.js concert-this <artist/band name here>
        var artist = process.argv[3];
        var bandsInTownAPI = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        var dataArr = [];
        fs.appendFile("log.txt", "\n\n=======================================\nConcerts for " + artist + "\n", function(err){
            if(err){
                return console.log(err);
            }
        });
        axios.get(bandsInTownAPI).then(function(response){
            for (key in response){
                dataArr.push(response[key]);
            }
            for(key in dataArr[5]){
                var date = new Date(dataArr[5][key].datetime);
                fs.appendFile("log.txt", "\nVenue: " + dataArr[5][key].venue.name 
                + "\nVenue Location: " + dataArr[5][key].venue.city + ", " + dataArr[5][key].venue.region 
                + "\nDate: " + moment(date).format("L")
                + "\n=======================================", function(err){
                    if(err){
                        return console.log(err);
                    }
                })
                console.log("Venue: " + dataArr[5][key].venue.name 
                + "\nVenue Location: " + dataArr[5][key].venue.city + ", " + dataArr[5][key].venue.region 
                + "\nDate: " + moment(date).format("L")
                + "\n=======================================");
                //Need to fix date format with moment.js
            }            
        }).catch(function(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
              console.log(error.config);
        });
        break;
    case 'spotify-this-song':
        var songName = process.argv[3];
        if(songName === undefined){
            songName = "The Sign";
            //Needs fixing
        }
        var dataArr = [];
        fs.appendFile("log.txt", "\n\n===================================================================\nSpotify Songs matching "
         + songName + "\n", function(err){
            if(err){
                return console.log(err);
            }
        })
        spotify.search({type: 'track', query: songName}, function(err, data){
            if(err){
                return console.log("Error occrurred: " + err);
            }
            for(key in data){
                dataArr.push(data[key]);
            }
            for(var i = 0; i < dataArr[0].items.length; i++){
                fs.appendFile("log.txt", "\nArtist: " + dataArr[0].items[i].artists[0].name
                + "\nSong: " + dataArr[0].items[i].name
                + "\nAlbum: " + dataArr[0].items[i].album.name
                + "\nSpotify Link: " + dataArr[0].items[i].external_urls.spotify 
                + "\n===================================================================", function(err){
                    if(err){
                        return console.log(err);
                    }
                })
                console.log("\nArtist: " + dataArr[0].items[i].artists[0].name
                + "\nSong: " + dataArr[0].items[i].name
                + "\nAlbum: " + dataArr[0].items[i].album.name
                + "\nSpotify Link: " + dataArr[0].items[i].external_urls.spotify 
                + "\n===================================================================");
            }
        });
        break;
    case 'movie-this':
        var movieName = process.argv[3];
        if(movieName === undefined){
            movieName = "Mr.Nobody";
        }else{
            movieName = movieName.split(" ").join("+");
        }
        var omdbURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieName;
        var dataArr = [];
        fs.appendFile("log.txt", "\n\n======================================\n", function(err){
            if(err){
                return console.log(err);
            }
        });
        axios.get(omdbURL).then(function(response){
            for(key in response){
                dataArr.push(response[key]);
            }
            //console.log(response);  
            fs.appendFile("log.txt", "Title: " + dataArr[5].Title 
            + "\nYear: " + dataArr[5].Year 
            + "\nIMDB Rating: " + dataArr[5].Ratings[0].Value
            + "\nRotten Tomatoes: " + dataArr[5].Ratings[1].Value
            + "\nCountry of Origin: " + dataArr[5].Country
            + "\nLanguage: " + dataArr[5].Language
            + "\nPlot: " + dataArr[5].Plot 
            + "\nActors: " + dataArr[5].Actors
            + "\n======================================", function(err){
                if(err){
                    return console.log(err);
                }
            });       
            console.log("Title: " + dataArr[5].Title 
            + "\nYear: " + dataArr[5].Year 
            + "\nIMDB Rating: " + dataArr[5].Ratings[0].Value
            + "\nRotten Tomatoes: " + dataArr[5].Ratings[1].Value
            + "\nCountry of Origin: " + dataArr[5].Country
            + "\nLanguage: " + dataArr[5].Language
            + "\nPlot: " + dataArr[5].Plot 
            + "\nActors: " + dataArr[5].Actors
            + "\n======================================");
        }).catch(function(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
              console.log(error.config);
        });
        break;
    case 'do-what-it-says':
        fs.readFile("random.txt", "utf-8", function(error, data){
            if(error){
                return console.log(error);
            }
            var dataArr = data.split(",");
            var song = dataArr[1];
            spotifyThis(song);
        });
        break;
}

function spotifyThis(songName){
    if(songName === undefined){
        songName = "The Sign";
        //Needs fixing
    }
    var dataArr = [];
    fs.appendFile("log.txt", "\n\n===================================================================\nSpotify Songs matching "
     + songName + "\n", function(err){
        if(err){
            return console.log(err);
        }
    })
    spotify.search({type: 'track', query: songName}, function(err, data){
        if(err){
            return console.log("Error occrurred: " + err);
        }
        for(key in data){
            dataArr.push(data[key]);
        }
        for(var i = 0; i < dataArr[0].items.length; i++){
            fs.appendFile("log.txt", "\nArtist: " + dataArr[0].items[i].artists[0].name
            + "\nSong: " + dataArr[0].items[i].name
            + "\nAlbum: " + dataArr[0].items[i].album.name
            + "\nSpotify Link: " + dataArr[0].items[i].external_urls.spotify 
            + "\n===================================================================", function(err){
                if(err){
                    return console.log(err);
                }
            })
            console.log("\nArtist: " + dataArr[0].items[i].artists[0].name
            + "\nSong: " + dataArr[0].items[i].name
            + "\nAlbum: " + dataArr[0].items[i].album.name
            + "\nSpotify Link: " + dataArr[0].items[i].external_urls.spotify 
            + "\n===================================================================");
        }
    });
}

        