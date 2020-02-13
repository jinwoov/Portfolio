'use strict';


$(document).scroll(function() {
  if ($(document).scrollTop() >= 400) {
    $('#totop').css("display", "block");
  } else {
    $('#totop').css("display", "none");
  }
})

$(window).resize(() => {
  if ($(window).width() > 960) {
    $('.menu').show();
  } else {
    $('.menu').hide();
  }
});

$('#totop').on("click", clickTop);
function clickTop(e) {
  console.log('hitme');
  $('#ball').show();
}

function myFunction(x) {
  x.classList.toggle("change");
  $('.menu').toggle(500, 'linear');
}
if ($(window).width() < 960) {
  $('.menu').hide();
}
$('#ball').hide();
