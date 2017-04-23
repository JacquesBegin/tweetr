// this module is for manipulating the database to add new
// fields to existing collections or replace documents with
// new data


const randomize = require("randomatic");

module.exports = function addUserId(db) {
  return {

    addUID: function() {
      db.connectToServer(err => {
        console.log("here now");
        if (err) {
        }
        var database = db.getDb();
        database.collection("tweets").find().forEach(function(aTweet) {
          let tweetUser = JSON.stringify(aTweet.userId);
          database.collection("users").find().forEach(function(aUser) {
            // let user_Id = randomize("Aa0", 10);
            if (tweetUser === JSON.stringify(aUser._id)) {
              console.log("here");
              database.collection("tweets").update(aTweet, {$set : {userId: aUser.userId}});
              // database.collection("tweets").update(aTweet, { userId: aUser._id, content: aTweet.content.text, created_at: aTweet.created_at });
            }
            // database.collection("users").update(aUser, {$set : {userId: user_Id}});

          });

        })
        // // commented out db.close while running, db was closing before the
        // // migration to users table
        // // db.closeDb();
      });
    }

  }

}

