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

module.exports = { renderTweets, escape, createTweetElement, loadTweets }

