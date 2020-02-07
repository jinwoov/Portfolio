'use strict';

$('#profile-photo').mouseover(() => {
  $('#name').css("font-weight", "bold");
  $('#name').css("font-size", "1.6em");
});
$('#profile-photo').mouseleave(() => {
  $('#name').css("font-weight", "normal");
  $('#name').css("font-size", "1.5em");
});
