'use strict';

$('#profile-photo').mouseover(() => {
  $('#name').css("font-weight", "bold");
});
$('#profile-photo').mouseleave(() => {
  $('#name').css("font-weight", "normal");
});
