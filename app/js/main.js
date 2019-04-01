// LINKS TO ANCHORS
$('a[href^="#"]').on('click', function (event) {

  const $target = $(this.getAttribute('href'));

  if ($target.length) {
    event.preventDefault();
    $('html, body').stop().animate({
      scrollTop: $target.offset().top-5
    }, 500, 'easeInOutQuad');
  }
});

// TOGGLE HAMBURGER & COLLAPSE NAV
$('.navigation-mobile').on('click', function () {
  $(this).toggleClass('open');
  $('.navigation-desktop').toggleClass('collapse');
});

// REMOVE X & COLLAPSE NAV ON ON CLICK
$('.navigation-desktop a').on('click', function () {
  $('.navigation-mobile').removeClass('open');
  $('.navigation-desktop').removeClass('collapse');
});