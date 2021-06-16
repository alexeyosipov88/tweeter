$(document).ready(function() {
  $('textarea').on('keydown', function() {
    $(this).parents('html').find('.counter').html(139 - ($(this).val().length - 1));
    if ($(this).val().length > 139  ) {
      $(this).parents('html').find('.counter').css('color', 'red')
    }
  })
});