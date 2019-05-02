const ars = (function () {

  firstNumNode = $('.glide-slides-numbers__first');
  lastNumNode = $('.glide-slides-numbers__last');
  slides = $(".glide__slide:not(.glide__slide--clone)");
  firstNumValue = '01';
  lastNumValue = '0'.concat(slides.length.toString());
  currentSlide = null;

  function privateSetSlidesNumbers(firstNum, lastNum) {
    firstNumNode.html(firstNum);
    lastNumNode.html(lastNum);
  }

  function privateStartSliderAnimations() {
    $('.glide-slides-numbers-line__fill').addClass('blast');
    $('.slide-text').addClass('visio');
  }

  function privateStopSlidersAnimations() {
    $('.glide-slides-numbers-line__fill').removeClass('blast');
    $('.slide-text').removeClass('visio');
  }

  let publicGlide = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    gap: 0,
    animationDuration: 1000,
    animationTimingFunc: 'cubic-bezier(0.85, 0.15, 0.15, 0.85)'
  });

  publicGlide.on('mount.after', function () {
    privateSetSlidesNumbers(firstNumValue, lastNumValue);
  });

  publicGlide.on('run', function () {
    let firstSlideNum = '0'.concat((publicGlide.index + 1).toString());
    firstNumNode.html(firstSlideNum);
    privateStartSliderAnimations();
  });

  publicGlide.on('run.after', function () {
    privateStopSlidersAnimations();
  });

  function publicToAnchor(currentNode, event) {
    const $target = $(currentNode.getAttribute('href'));
    if ($target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: $target.offset().top
      }, 500, 'easeInOutQuad');
    }
  }

  function publicToggleNav() {
    $(this).toggleClass('open');
    $('.navigation-desktop').toggleClass('collapse');
    $('.navigation-mobile').toggleClass('open');
    $('main').toggleClass('hidden');
  }

  if (window.location.pathname === "/services.html" || window.location.pathname === "/technologies.html") {
    publicGlide.mount();
  }

  return {
    glide: publicGlide,
    toAnchor: publicToAnchor,
    toggleNav: publicToggleNav,
  };
})();



// FORM LOGIC
let valideteForm = function (formValue) {
  let namePattern = /^[A-Za-z]+$/;
  let mailPattern = /^[a-z0-9]\w+\.?\w*@[a-z]+\.[a-z]{2,8}$/;

  if (namePattern.test(formValue.name)) {
    $('#formname').css('border-bottom', '1px solid #4E4E4E');
  } else {
    $('#formname').css('border-bottom', '1px solid red');
    return false
  }

  if (mailPattern.test(formValue.email)) {
    $('#formemail').css('border-bottom', '1px solid #4E4E4E');
  } else {
    $('#formemail').css('border-bottom', '1px solid red');
    return false
  }

  if (formValue.message == '') {
    $('#formmessage').css('border-bottom', '1px solid red');
    return false
  } else {
    $('#formmessage').css('border-bottom', '1px solid #4E4E4E');
  }

  if (formValue.termsAndConditions) {
    $('.form-radio-box').removeClass('errorCheckbox');
  } else {
    $('.form-radio-box').addClass('errorCheckbox');
    return false
  }

  return true;
}.bind(this);


//----------------EVENTS----------------//

// TOGGLE HAMBURGER & COLLAPSE NAV
$('.navigation-mobile').click(function () {
  ars.toggleNav();
});

// REMOVE X & COLLAPSE NAV ON ON CLICK
$('.navigation-desktop__item').click(function () {
  $(".navigation-desktop").removeClass('open');
  $('.navigation-desktop').removeClass('collapse');
  $('.navigation-mobile').removeClass('open');
  $('main').removeClass('hidden');
});

// LINKS TO ANCHORS
$('a[href^="#"]').click(function (event) {
  let currentNode = this;
  ars.toAnchor(currentNode, event);
});

// FORM SUBMIT
$("#submit-button").click(function (event) {
  let formValue = $(this.form).serializeArray().reduce(function (obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {});

  if (valideteForm(formValue)) {
    $(".contact-content-form__text").text("Thank you! We will we will get back to you as soon as possible ⚡️");
    $(".contact-content-form__text").addClass('success');
    // $.ajax({
    //   url: "",
    //   method: "POST",
    //   data: formValue,
    //   success: function (data) {
    //     $("#formsubmit").text("Thank you!");
    //   }
    // });
  };

  event.preventDefault();
});