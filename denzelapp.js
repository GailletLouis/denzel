const Express = require("express");
var app = Express();
const URL_MONGO = 'mongodb+srv://louis:1234@webapp-admoy.mongodb.net/test?retryWrites=true'; // URL of my cluster
const MongoClient = require('mongodb').MongoClient;
const CLUSTER_NAME = 'Webapp'; // cluster name
const DB_NAME = 'moviedb';
const COLLECTION_NAME = 'denzelmovies';

const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';

var collection;

//connection to mongodb
app.listen(9292, () => {
    MongoClient.connect(URL_MONGO,{ useNewUrlParser: true }, function(err, client) {
        if(err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        console.log('Connected to ' + DB_NAME + ' database, to collection ' + COLLECTION_NAME);
        collection = client.db(DB_NAME).collection(COLLECTION_NAME);
    });
});

//populate the database with a request
// Request in cmd : curl -H "Accept: application/json" http://localhost:9292/movies/populate
app.get("/movies/populate", (request, response) => {
    TestCollectionConnection(response);
      imdb(DENZEL_IMDB_ID).then((val)=>{
        movies = val;
        collection.insertMany(movies,(error,result)=>{
          if(error){
            return response.status(500).send(error);
            console.log('error: could not load movies')
          }
          console.log('populating successful of '+ result.result.n + "  movies");
          retour = {"total" : result.result.n};
          response.send(retour);
        });
      });    
});

// get a mush watch movie (random selection, metascore greater than 70)
app.get("/movies", (request, response) => {
    TestCollectionConnection(response);
    collection.find({ metascore: { $gte: 70 } }).toArray((error, result) => {
        
        if (error) {
            return res.status(500).send(error);
            console.log('error: could not request a must watch movie')
        }

        var index = Math.floor(Math.random() * result.length); // produce a random index between 0 and the index of the last movie
        var movie = result[index];
        response.send(movie); // send the movie to client
      });    
});

function TestCollectionConnection(response){
    if(!collection){
        return response.status(500).send('The database is not connected');
        console.log('error, collection not availabe')
      }
}