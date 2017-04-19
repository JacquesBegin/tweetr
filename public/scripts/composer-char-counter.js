$(document).ready(function() {

  $("section.new-tweet form textarea").on("keyup", function() {
    console.log("hello");
    var length = $(this).val().length;
    var counter = $(this).parent().children(".counter");
    var maxTweetLength = 140;
    $(counter).text(maxTweetLength - length);

    if (length <= maxTweetLength) {
      $(counter).css("color", "#244751");
    } else {
      $(counter).css("color", "red");
    }
  });
});