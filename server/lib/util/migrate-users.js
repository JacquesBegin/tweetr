
// this module was created for a one time use to migrate user
// information from the already created tweets into a separate
// database collection that stores user information. The new
// users collection will store user information when a new user
// is created.

module.exports = function migrateUsers(db) {
  return {

    migrate: function() {
      db.connectToServer(err => {
        console.log("here now");
        if (err) {
          callback(err, null);
        }
        var database = db.getDb();
        database.collection("tweets").find().forEach(function(aTweet) {
          database.collection("users").insert({name: aTweet.user.name, handle: aTweet.user.handle, avatars: aTweet.user.avatars});
        })
        // // commented out db.close while running, db was closing before the
        // // migration to users table
        // // db.closeDb();
      });
    }

  }

}