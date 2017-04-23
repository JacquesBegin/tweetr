const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

var db;

// module to connect, get, and close the mongo database

module.exports = {

  connectToServer: function(callback) {
    MongoClient.connect(MONGODB_URI, (err, database) => {
      if (err) {
        console.error(`Failed to connect: ${MONGODB_URI}`);
        throw err;
      }

      console.log(`Connected to mongodb: ${MONGODB_URI}`);
      db = database;
      return callback(err);
    });
  },
  getDb: function() {
    return db;
  },
  closeDb: function() {
    db.close();
    console.log(`Closed connection to mongodb: ${MONGODB_URI}`);
  }
};
