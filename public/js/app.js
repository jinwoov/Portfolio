'use strict';

$('#profile-photo').mouseover(() => {
  $('#name').css("font-weight", "bold");
  $('#name').css("font-size", "1.6em");
});
$('#profile-photo').mouseleave(() => {
  $('#name').css("font-weight", "normal");
  $('#name').css("font-size", "1.5em");
});

$(document).scroll(function() {
  if ($(document).scrollTop() >= 200) {
    $('#totop').css("display", "block");
  } else {
    $('#totop').css("display", "none");
  }
})

