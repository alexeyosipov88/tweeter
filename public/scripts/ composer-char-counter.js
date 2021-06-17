$(document).ready(function() {
  $('textarea').on('keyup', function() {
    $(this).parents('html').find('.counter').html(140 -$(this).val().length);
    if ($(this).val().length > 140) {
      $(this).parents('html').find('.counter').css('color', 'red')
    } else {
      $(this).parents('html').find('.counter').css('color', 'unset')
    }
  })
});