# Liri
Liri Bot

Liri is a command line node app that takes in one of four parameters and returns the relative data. 
Possible calls include 
concert-this    spotify-this-song   movie-this  do-what-it-says

Deployment
1. Clone repo
2. Run npm install
3. At command prompt run node liri.js <pass arguments as listed above>

Screenshots
concert-this
![concert-this screenshot](/concert-this.png)


spotify-this-song
![spotify-this-song screenshot](/spotify-this-song.png)


movie-this
![movie-this screenshot](/movie-this.png)


do-what-it-says
![do-what-it-says screenshot](/do-what-it-says.png)


Technologies Used:
* NodeJS
* Javascript
* Spotify API
* OMDB API
* BandsInTown API
* NPM spotify-web-api-node
* NPM dotenv
* NPM axios
* NPM fs
* NPM moment
Author:
* Robert Weston

Functionality:
* concert-this
  * When calling this make sure that the name of the band is in quotes. The concert-this case will search through the bandsintown API for that band and return all the concert dates and their venues, and venue locations through the rest of the year.
* spotify-this-song
  * To call this place the song name in quotes at the end of the command line argument. The spotify-this-song case will search through the NPM spotify-web-api-node and get the top twenty songs that make the song that you searched for.
* movie-this
  * To call this function call the name of the movie you want to search at the end of the command line argument. The movie-this case will search through the OMDB API to find that movie and return relevant information.
* do-what-it-says
  * This function doesn't require any additional command line arugments to run. It will fun a function that will read a .txt file and run the arguments provided there. As an exmaple the current txt file random.txt will run the spotify-this-song case.
* All the returned information will be logged in the log.txt file