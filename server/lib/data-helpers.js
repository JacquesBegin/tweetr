"use strict";

const ObjectId = require('mongodb').ObjectId;

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
        // var counter = 0;
        // var tweetArray = [];
        database.collection("tweets").find().toArray((err, tweets) => {
          callback(null, tweets);
        });
      });
    },
          // let tweetsLength = tweets.length;
          // console.log("length: ", tweetsLength);
          // for (var aTweet of tweets) {
          //   console.log(aTweet);
          //   database.collection("users").find().toArray((err, users) => {
          //     for (var aUser of users) {
          //       // console.log(aUser);
          //       // console.log("length: ", users.length);
          //       if (JSON.stringify(aTweet.userId) === JSON.stringify(aUser._id)) {
          //         let compiledTweetInfo = {_id: aTweet._id, content: aTweet.content, created_at: aTweet.created_at, name: aUser.name, handle: aUser.handle, avatars: aUser.avatars};
          //         tweetArray.push(compiledTweetInfo);
          //         // console.log(counter);
          //       }
          //     }
          //   ++counter;
          //   if (counter >= tweetsLength) {
          //     const sortNewestFirst = (a, b) => a.created_at - b.created_at;
          //     callback(null, tweetArray.sort(sortNewestFirst));
          //   }
          //   });
          // }



    getUsers: function(callback) {
      db.connectToServer(err => {
        if (err) {
          callback(err, null);
        }
        var database = db.getDb();
        database.collection("users").find().toArray((err, users) => {
        callback(null, users);
        });
      });
    }
  }
}


        // database.tweets.count((count) => {
        // console.log("count:", count);

        // })
        // var tweetArray = compileTweetData(database, (array) => {
        // database.collection("tweets").find().forEach(function(aTweet) {
        //   database.collection("users").find().forEach(function(aUser) {
        //     if (JSON.stringify(aTweet.userId) === JSON.stringify(aUser._id)) {
        //       let compiledTweetInfo = {_id: aTweet._id, content: aTweet.content, created_at: aTweet.created_at, name: aUser.name, handle: aUser.handle, avatars: aUser.avatars};
        //       tweetArray.push(compiledTweetInfo);
        //     }
        //   }).then(function() {
        //   const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        //   callback(null, array.sort(sortNewestFirst));
        // });
        // })


        // var tweetArray = [];
        // console.log("In getTweets");

        // console.log(users);

        // database.collection("tweets").find().toArray((err, tweets) => {
        // });


  // function compileTweetData(database, callback) {
  //   let users = database.collection("users").find().toArray();
  //   let tweets = database.collection("tweets").find().toArray();

  //   console.log(users);
  //   console.log(tweets);

  //   return []
  // }



        // let cursorTweet = database.collection("tweets").find();
        // let cursorUser = database.collection("users").find();


        // cursorTweet.forEach(function(tweet) {
        //   console.log(tweet.userId);
        //   let u_id = new ObjectId(tweet.userId);

        //   let tweetUser = database.collection("users").find({_id: u_id});
        //   if (tweetUser) {
        //     console.log(tweetUser);
        //   }
          // cursorUser.forEach(function(user) {
            // console.log(user);
            // if (JSON.stringify(tweet.userId) === JSON.stringify(user._id)) {
            //   let compiledTweetInfo = {_id: tweet._id, content: tweet.content, created_at: tweet.created_at, name: user.name, handle: user.handle, avatars: user.avatars};
            //   tweetArray.push(compiledTweetInfo);
            // }
          // })
        // console.log(tweetArray);



        // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        // callback(null, tweetArray.sort(sortNewestFirst));







        // database.collection("tweets").find().toArray((err, tweets) => {
        // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        // callback(null, tweets.sort(sortNewestFirst));
        // });
        // db.closeDb();

