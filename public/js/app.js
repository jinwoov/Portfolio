'use strict';


$(document).scroll(function () {
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

////
$(document).on("scroll", function () {
  let pageTop = $(document).scrollTop()
  let pageBottom = pageTop + $(window).height()
  let tags = $("section#profile")

  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i]

    if ($(tag).position().top < pageBottom) {
      $(tag).addClass("visible")
    } else {
      $(tag).removeClass("visible")
    }
  }
})