/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  $('.tweet').hover(function(){
    $(this).css('box-shadow', '10px 5px 5px grey')
  }, function() {
    $(this).css('box-shadow', 'unset')
  });
  $('.fas.fa-flag').hover(function() {
    $(this).css('color', 'orange');
  }, function() {
    $(this).css('color', 'unset');
  })

  $('.fas.fa-retweet').hover(function() {
    $(this).css('color', 'orange');
  }, function() {
    $(this).css('color', 'unset');
  })

  $('.fas.fa-heart').hover(function() {
    $(this).css('color', 'orange');
  }, function() {
    $(this).css('color', 'unset');
  })

  $('.date-of-the-tweet').html(timeago.format(new Date()));


});
