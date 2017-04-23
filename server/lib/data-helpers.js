"use strict";


// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, newUser, callback) {
      db.connectToServer(err => {
        if (err) {
          callback(err, null);
        }
        var database = db.getDb();
        database.collection("tweets").insertOne(newTweet);
        database.collection("users").insertOne(newUser);
        db.closeDb();
      });
        callback(null, true);
    },

    // Get all tweets in `db`
    getTweets: function(callback) {
      db.connectToServer(err => {
        if (err) {
          callback(err, null);
        }
        var database = db.getDb();
        database.collection("tweets").find().toArray((err, tweets) => {
          db.closeDb();
          callback(null, tweets);
        });
      });
    },

    // Get all users in `db`
    getUsers: function(callback) {
      db.connectToServer(err => {
        if (err) {
          callback(err, null);
        }
        var database = db.getDb();
        database.collection("users").find().toArray((err, users) => {
          db.closeDb();
          callback(null, users);
        });
      });
    }
  }
}
