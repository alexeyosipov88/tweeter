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
    for (let tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
    return;
  }
  const createTweetElement = (data) => {
    const htmlTemplate = `
    <article class="tweet"> 
    <header>
      <div class="name-and-avatar">
        <div>${data.user.name}</div>
        <div><img class="avatar" src="${data.user.avatars}"></div>
      </div>
      <div class="loginID">${data.user.handle}</div> 
    </header>
    <p>${data.content.text}</p>
    <footer>
      <div class="date-of-the-tweet">${data.created_at}</div>
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
      alert("Tweet is epmty!")
      return;
    } 
    if ($(this).serialize().length > 145) {
      event.preventDefault();
      alert("Tweet is more than 140 characters")
      return;
    } 
    event.preventDefault();
    $.ajax({
      url: '/tweets',
      type: 'post',
      dataType: 'json',
      data: $(this).serialize(),
    })
      .then(function (result) {
      console.log('Success: ', morePostsHtml);

    });
  });


  /* const loadTweets = (callback) => {
  callback();
  $.ajax({
      url: '/tweets',
      type: "GET",
      dataType: "json",
      success: function (data) {
        loadTweets(data);
      }
    })
    return data;
  } */

  /* $('.tweet').hover(function () {
    $(this).css('box-shadow', '10px 5px 5px grey')
  }, function () {
    $(this).css('box-shadow', 'unset')
  });

  $('.icons-on-tweets').hover(function () {
    $(this).css('color', 'orange');
  }, function () {
    $(this).css('color', 'unset');
  }) 

  $('.fas.fa-retweet').hover(function () {
    $(this).css('color', 'orange');
  }, function () {
    $(this).css('color', 'unset');
  })

  $('.fas.fa-heart').hover(function () {
    $(this).css('color', 'orange');
  }, function () {
    $(this).css('color', 'unset');
  }) */
 
  $('.date-of-the-tweet').html(timeago.format($('.data-of-the-tweet').val()));



});

