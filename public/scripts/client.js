/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //function to render tweets

  const renderTweets = function (tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
    return;
  }
  // function to prevent cross site scripting

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // function to create tweet element using string literal

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
    <p class='text-area-tweet'>${escape(data.content.text)}</p>
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
// jquery for hadnling tweet submit

  $("#submit-tweet").submit(function (event) {
    const string = $(this).serialize();
    const newString = string.replaceAll('%20', ' ');
    console.log(newString)
    if (newString === `text=`) {
      event.preventDefault();
      $('#label').hide();
      $('#error-empty').show();
      $('#error-too-many').hide()
    }
    else if (newString.length > 145) {
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

