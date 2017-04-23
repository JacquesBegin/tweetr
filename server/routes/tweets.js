"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

const db = require("../lib/mongo-db-connection.js");
const mUsers = require("../lib/util/migrate-users.js")(db);
const addU = require("../lib/util/add-userId-to-tweet.js")(db);


module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    // mUsers.migrate();
    // addU.addUID();
    let allTweets = [];
    let allUsers = [];
    let tweetArray = [];
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // console.log("yoyoyoyoyoyoy", tweets);
        for (var i of tweets) {
        allTweets.push(i);
        }
        DataHelpers.getUsers((err, users) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            // console.log("yoyoyoyoyoyoy", users);
            for (var j of users) {
            allUsers.push(j);
            }
            console.log("WHATATATATTAATT");
            for (var aTweet of allTweets) {
                // console.log("let me have it!!!!!!!", aTweet);
              for (var aUser of allUsers) {
                // console.log("let me have it!!!!!!!", aUser);
                if (JSON.stringify(aTweet.userId) === JSON.stringify(aUser._id)) {
                  let compiledTweetInfo = {_id: aTweet._id, content: aTweet.content, created_at: aTweet.created_at, name: aUser.name, handle: aUser.handle, avatars: aUser.avatars};
                  tweetArray.push(compiledTweetInfo);
                }
              }
            }
            console.log(tweetArray);
            res.json(tweetArray);
          }
        });
      }
    });
  });


  // tweetsRoutes.post("/", function(req, res) {
  //   if (!req.body.text) {
  //     res.status(400).json({ error: 'invalid request: no data in POST body'});
  //     return;
  //   }

  //   const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
  //   const tweet = {
  //     user: user,
  //     content: {
  //       text: req.body.text
  //     },
  //     created_at: new Date().getTime()
  //   };

  //   DataHelpers.saveTweet(tweet, (err) => {
  //     if (err) {
  //       res.status(500).json({ error: err.message });
  //     } else {
  //       res.status(201).send();
  //     }
  //   });
  // });

  return tweetsRoutes;

}
