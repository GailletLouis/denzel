const URL_MONGO = 'mongodb+srv://louis:1234@webapp-admoy.mongodb.net/test?retryWrites=true'; // URL of my cluster
const MongoClient = require('mongodb').MongoClient;
const CLUSTER_NAME = 'Webapp'; // cluster name
const DB_NAME = 'moviedb';
const COLLECTION_NAME = 'denzelmovies';

const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';

//listen part of API
MongoClient.connect(URL_MONGO,{ useNewUrlParser: true }, function(err, client) {
    if(err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    console.log('Connected to ' + DB_NAME + ' database, to collection ' + COLLECTION_NAME);
    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
    client.close();
 });