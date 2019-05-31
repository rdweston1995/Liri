require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotfiy(keys.spotify);

var axios = require("axios");

switch(process.argv[2]){
    case 'concert-this':
        //Bands in Town API
        var artist = process.argv[2];
        var bandsInTownAPI = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


}