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

app.get("/movies/populate", (request, response) => {
    if(!collection){
        return response.status(500).send('The database is not connected');
        console.log('error, pas de collection')
      }
      imdb(DENZEL_IMDB_ID).then((val)=>{
        movies = val;
        collection.insertMany(movies,(error,result)=>{
          if(error){
            return res.status(500).send(error);
            console.log('error: could not load movies')
          }
          console.log('populating successful of '+ result.result.n + "  movies");
          retour = {"total" : result.result.n};
          response.send(retour);
        });
      });    
});