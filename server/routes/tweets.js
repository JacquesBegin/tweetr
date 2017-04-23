"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();
const randomize = require("randomatic");


// // these require's are necessary to perform database collection
// // migration and document field add/update
// const db = require("../lib/mongo-db-connection.js");
// const mUsers = require("../lib/util/migrate-users.js")(db);
// const addU = require("../lib/util/add-userId-to-tweet.js")(db);

    // // Use these function calls to migrate data between collections
    // // and add/update fields to a document
    // mUsers.migrate();
    // addU.addUID();


module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    let allTweets = [];
    let allUsers = [];
    let tweetArray = [];

    // Two calls to the database to get tweets and users.
    // Compile data from tweets and users to create a new object
    // for each tweet that the frontend can use to display tweet
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        for (var i of tweets) {
        allTweets.push(i);
        }
        DataHelpers.getUsers((err, users) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            for (var j of users) {
            allUsers.push(j);
            }
            for (var aTweet of allTweets) {
              for (var aUser of allUsers) {
                if (JSON.stringify(aTweet.userId) === JSON.stringify(aUser.userId)) {
                  let compiledTweetInfo = {_id: aTweet._id, content: aTweet.content, created_at: aTweet.created_at, name: aUser.name, handle: aUser.handle, avatars: aUser.avatars};
                  tweetArray.push(compiledTweetInfo);
                }
              }
            }
            const sortNewestFirst = (a, b) => a.created_at - b.created_at;
            tweetArray.sort(sortNewestFirst);
            res.json(tweetArray);
          }
        });
      }
    });
  });


  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    user["userId"] = randomize("Aa0", 10);
    const tweet = {
      userId: user["userId"],
      content: req.body.text,
      created_at: new Date().getTime()
    };

    // Currently saving a tweet will also save the user to the
    // users collection. This is possible because everytime a
    // tweet is posted, a new user is created automatically.
    // Future implementation will remove user creation in this
    // action because user will have to be logged in to create
    // tweets. At that time, userId will be saved to the tweet
    // from the session information
    DataHelpers.saveTweet(tweet, user, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}
