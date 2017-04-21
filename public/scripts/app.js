/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    console.log( "ready!" );


  // calculate the time since the tweet was created relative to
  // the current date
  function getTimeSincePostCreation(createdDate) {
    var time = new Date().getTime();
    var timeAgoInSeconds = ((time - createdDate) / 1000);
    var timeAgoInMinutes = (timeAgoInSeconds / 60);
    var timeAgoInHours = (timeAgoInMinutes / 60);
    var timeAgoInDays = (timeAgoInHours / 24);


    var timeDifference = new Date(time - createdDate);
    // console.log("YEAR", timeDifference.getFullYear() - 1970);
    // console.log("DAYS", timeDifference.getTime() / (1000 * 60 * 60 * 24));

    if (timeAgoInSeconds < 60) {
      ageMessage = "less than a minute ago";
    } else if (timeAgoInSeconds < 120) {
        ageMessage = `${Math.floor(timeAgoInMinutes)} minute ago`;
    } else if (timeAgoInMinutes < 60) {
        ageMessage = `${Math.round(timeAgoInMinutes)} minutes ago`;
    } else if (timeAgoInHours < 24) {
        ageMessage = `${Math.round(timeAgoInHours)} hours ago`;
    } else {
        ageMessage = `${Math.round(timeAgoInDays)} days ago`;
    }
    return ageMessage;
  }

  // display individual tweets by appending HTML elements and
  // setting values from parameter values
  function createTweetElement(tweetData) {

    var $tweet = $("<article>").addClass("tweet");

    // the tweet header and content that needs to display in the header
    var $header = $("<header>").addClass("tweet-header");
    var $headerImg = $("<img>").attr("src", `${tweetData.user.avatars.regular}`);
    var $headerH2 = $("<h2>").text(`${tweetData.user.name}`);
    var $headerHandle = $("<span>").addClass("handle-name").text(`${tweetData.user.handle}`);

    // the tweet message content
    var $message = $("<p>").addClass("tweet-message").text(`${tweetData.content.text}`);

    // the tweet footer and content that needs to display in the footer
    var $footer = $("<footer>").addClass("tweet-footer");

    // get the age of the post to display on the tweet
    var postAgeMessage = getTimeSincePostCreation(tweetData.created_at);

    // assemble the footer action links for flag, retweet, and heart
    var $footerAge = $("<span>").addClass("tweet-age").text(`${postAgeMessage}`);
    var $footerActions = $("<span>").addClass("tweet-actions");
    var $footerActionFlagAnchor = $("<a>").attr("href", "");
    var $footerActionFlagIcon = $("<i>").addClass("fa fa-flag").attr("aria-hidden", "true");
    $footerActionFlagAnchor.append($footerActionFlagIcon);
    var $footerActionRetweetAnchor = $("<a>").attr("href", "");
    var $footerActionRetweetIcon = $("<i>").addClass("fa fa-retweet").attr("aria-hidden", "true");
    $footerActionRetweetAnchor.append($footerActionRetweetIcon);
    var $footerActionHeartAnchor = $("<a>").attr("href", "");
    var $footerActionHeartIcon = $("<i>").addClass("fa fa-heart").attr("aria-hidden", "true");
    $footerActionHeartAnchor.append($footerActionHeartIcon);
    $footerActions.append($footerActionFlagAnchor, $footerActionRetweetAnchor, $footerActionHeartAnchor);

    // assemble all header elements together
    $header.append($headerImg, $headerH2, $headerHandle);

    // assemble all footer elements together
    $footer.append($footerAge, $footerActions);

    // assemble all article elements together
    $tweet.append($header, $message, $footer);

    return $tweet;
  }

  // get all tweets and send to the frontend
  function renderTweets(tweets) {
    console.log("2:", typeof tweets);
    var allTweets = [];
    for (var i of tweets) {
      allTweets.push(createTweetElement(i));
    }
    allTweets.reverse();

    $("section#all-tweets").html(allTweets);
  }

  // get all tweets from database and pass to renderTweets function
  // to print to screen
  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      data: {
        format: "json"
      },
      success: function(data) {
        renderTweets(data);
      }
    })
  }

  loadTweets();

  function validateTweetFormInput() {
    var userInput = $("section.new-tweet textarea").val();
    var formErrors = $(".form-errors");
    formErrors.text("");
    if (userInput === "" || userInput === null) {
      $(".form-errors").html("<em>Enter text to submit</em>");
      return false;
    } else if (userInput.length > 140) {
      $(".form-errors").html("<em>Maximum tweet length exceeded</em>");
      return false;
    }
    return true;
  }

  // when submit is clicked on new tweet form, prevent default
  // behavior and send data using AJAX to prevent page reload
  $("section.new-tweet form").submit(function(event) {
    event.preventDefault();
    if (!validateTweetFormInput()) {
    } else {
        $.ajax({
          method: "POST",
          url: "/tweets",
          data: $("section.new-tweet textarea").serialize(),
          success: function(tweet) {
            $("section.new-tweet textarea").val("");
            // var newTweet = createTweetElement(tweet);
            // $("section#all-tweets").prepend(newTweet);
            loadTweets();
          }
          // ,
          // error: function(err)
        });
    }
  });

  $("nav .compose-button").on("click", function(event) {
    var textarea = $("section.new-tweet");
    if (textarea.is(":visible")) {
      textarea.slideUp( "fast" );
    } else {
      textarea.slideDown( "fast" );
      $("body").scrollTop(0);
      $("section.new-tweet textarea").select();;
    }
  })

});

