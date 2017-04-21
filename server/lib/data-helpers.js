"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.connectToServer(err => {
        if (err) {
          callback(err, null);
        }
        var database = db.getDb();
        database.collection("tweets").insertOne(newTweet);
        db.closeDb();
      });
        callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.connectToServer(err => {
        if (err) {
          callback(err, null);
        }
        var database = db.getDb();
        database.collection("tweets").find().toArray((err, tweets) => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets.sort(sortNewestFirst));
        });
        db.closeDb();
      });
    }
  };
}
