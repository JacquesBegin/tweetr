$(document).ready(function() {

  $(this).on("keyup", function() {
    var length = $(event.target).val().length;
    var counter = $(event.target).parent().children(".counter");
    var maxTweetLength = 140;
    $(counter).text(maxTweetLength - length);

    if (length <= maxTweetLength) {
      $(counter).css("color", "#244751");
    } else {
      $(counter).css("color", "red");
    }
  });
});