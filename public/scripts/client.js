/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  const renderTweets = function (tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
    return;
  }
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (data) => {
    const htmlTemplate = `
    <article class="tweet"> 
    <header>
      <div class="name-and-avatar">
        <div>${data.user.name}</div>
        <div><img class="avatar" src="${escape(data.user.avatars)}"></div>
      </div>
      <div class="loginID">${data.user.handle}</div> 
    </header>
    <p class='text-area-tweet'>${data.content.text}</p>
    <footer>
      <div class="date-of-the-tweet">${moment(data.created_at).fromNow()}</div>
      <div class="icons-on-tweets">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
  `
    return $(htmlTemplate);
  }
// function to load tweets from the database

  const loadTweets = () => {
    let promise = new Promise(function (resolve, reject) {
      $.ajax({
        url: '/tweets',
        type: "GET",
        dataType: "json",
        success: function (data) {
          resolve(data);
        }
      })
    });
   promise.then((data) => {
     renderTweets(data);
   })
  }
  loadTweets();

  $("#submit-tweet").submit(function (event) {
    if ($(this).serialize() === `text=`) {
      event.preventDefault();
      $('#label').hide();
      $('#error-empty').show();
      $('#error-too-many').hide()
    } 
      else if ($(this).serialize().length > 145) {
      event.preventDefault();
      $('#error-too-many').show();
      $('#error-empty').hide();
      $('#label').hide();
    } else {
      $('#error-empty').hide()
      $('#error-too-many').hide()
      $('#label').show();
      event.preventDefault();
      $.ajax({
        url: '/tweets',
        type: 'post',
        dataType: 'json',
        data: $(this).serialize(),
      })
      .then(
        loadTweets()
        )
      $('form')[0].reset();
      $('.counter').html('140');
     } 
  });
  autosize($("textarea"));
  
});

