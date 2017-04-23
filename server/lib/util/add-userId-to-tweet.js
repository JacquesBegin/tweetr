module.exports = function addUserId(db) {
  return {

    addUID: function() {
      db.connectToServer(err => {
        console.log("here now");
        if (err) {
        }
        var database = db.getDb();
        database.collection("tweets").find().forEach(function(aTweet) {
          let tweetUser = aTweet.user.name;
          database.collection("users").find().forEach(function(aUser) {
            if (tweetUser === aUser.name) {
              database.collection("tweets").update(aTweet, { userId: aUser._id, content: aTweet.content.text, created_at: aTweet.created_at });
            }
          });

        })
        // // commented out db.close while running, db was closing before the
        // // migration to users table
        // // db.closeDb();
      });
    }

  }

}

