'use strict';

$(document).ready(() => {
  $('body').fadeIn('slow');
});

$(document).scroll(function() {
  if ($(document).scrollTop() >= 200) {
    $('#totop').css("display", "block");
  } else {
    $('#totop').css("display", "none");
  }
})

