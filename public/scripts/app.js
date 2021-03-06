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

    // calculate length of time since tweet was created and
    // append a message that is appropriate for a particular
    // duration
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

    // the article that will hold all tweet elements
    var $tweet = $("<article>").addClass("tweet").attr("data-tweetId", `${tweetData._id}`);

    // the tweet header and content that needs to display in the header
    var $header = $("<header>").addClass("tweet-header");
    var $headerImg = $("<img>").attr("src", `${tweetData.avatars.regular}`);
    var $headerH2 = $("<h2>").text(`${tweetData.name}`);
    var $headerHandle = $("<span>").addClass("handle-name").text(`${tweetData.handle}`);

    // the tweet message content
    var $message = $("<p>").addClass("tweet-message").text(`${tweetData.content}`);

    // the tweet footer and content that needs to display in the footer
    var $footer = $("<footer>").addClass("tweet-footer");

    // get the age of the post to display on the tweet
    var postAgeMessage = getTimeSincePostCreation(`${tweetData.created_at}`);

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
    var allTweets = [];
    for (var i of tweets) {
      allTweets.push(createTweetElement(i));
    }
    allTweets.reverse();
    $("section#all-tweets").html(allTweets);
  }

  // get all tweets from database and pass to renderTweets
  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      data: {
        format: "json"
      },
      success: function(data) {
        renderTweets(data);

        // // Event listener for when like button is clicked.
        // // Need to implement icon color change and send
        // // data to database to track user likes on an
        // // individual tweet
        // $("i.fa.fa-heart").on("click", function(event) {
        //   event.preventDefault();
        //   var likeButton = $("i.fa.fa-heart");
        // });
      }
    })
  }

  // load tweets to the frontend when the document is ready
  loadTweets();

  // validation to ensure that the form has data and that
  // the length of the data does not exceed 140 characters
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
        success: function() {
          $("section.new-tweet textarea").val("");
          $("section.new-tweet .counter").text("140");
          loadTweets();
        }
      });
    }
  });

  // slider functionality for the compose post form
  $("nav .compose-button").click(function(event) {
    var textarea = $("section.new-tweet");
    if (textarea.is(":visible")) {
      textarea.slideUp( "fast" );
    } else {
      textarea.slideDown( "fast" );
      $("body").scrollTop(0);
      $("section.new-tweet textarea").select();
    }
  });
});

