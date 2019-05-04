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
    let slideIndex = window.location.href.split('#')[1];
    let firstNumValue = '0'.concat(parseInt(slideIndex) + 1);
    if (slideIndex) {
      publicGlide.go(`=${slideIndex}`);
    }
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
    
    const $targetSoutions = currentNode.getAttribute('href').split('#')[1]
    console.log($targetSoutions);
    if ($target.length) {
      event.preventDefault();
      if ($targetSoutions == "solutions") {
        $('html, body').stop().animate({
          scrollTop: $target.offset().top - 20
        }, 500, 'easeInOutQuad');
      } else {
        $('html, body').stop().animate({
          scrollTop: $target.offset().top - 50
        }, 500, 'easeInOutQuad');
      }
    }
  }

  function publicToggleNav() {
    $(this).toggleClass('open');
    $('.navigation-desktop').toggleClass('collapse');
    $('.navigation-mobile').toggleClass('open');
    $('main').toggleClass('hidden');
  }

  if (window.location.pathname === "/solutions.html" || window.location.pathname === "/technologies.html") {
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
    $('#formname').css('border-bottom', '1px solid #BFBFBF');
    $('#formNameLable').hide();
  } else {
    $('#formname').css('border-bottom', '1px solid #E63A0F');
    $('#formNameLable').show();
    $('#formNameLable').text("please enter a valid name");
    return false
  }

  if (mailPattern.test(formValue.email)) {
    $('#formemail').css('border-bottom', '1px solid #BFBFBF');
    $('#formEmailLable').hide();
  } else {
    $('#formemail').css('border-bottom', '1px solid #E63A0F');
    $('#formEmailLable').show();
    $('#formEmailLable').text("please enter a valid email address");
    return false
  }

  // if (formValue.message == '') {
  //   $('#formmessage').css('border-bottom', '1px solid #E63A0F');
  //   return false
  // } else {
  //   $('#formmessage').css('border-bottom', '1px solid #BFBFBF');
  // }

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
  $('.form-error-text').hide();
  $(".contact-content-form__caption").text("Got questions? — get in touch");
  $(".contact-content-form__caption").removeClass("error");

  let formValue = $(this.form).serializeArray().reduce(function (obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {});

  if (valideteForm(formValue)) {
    console.log("valid data");
    console.log(formValue);

    let that = this;
    // let submitBtn = $(this.form).find("#submit-button");
    // if (submitBtn.attr("soul") === "contacts-form") {
    //   $("#submit-button").hide();
    //   $(".form-success-text").text("Your message was sent");
    //   $(".form-success-text").addClass('form-success-text_visible');
    // } else {
    //   $(".contact-content-form__caption").text("Your message was sent");
    //   $(".contact-content-form__text").text("We will get back to you as soon as possible");
    // }

    $.ajax({
      url: "",
      method: "POST",
      data: formValue,
      success: function (response) {
        successFormSubmit(response).bind(this);
      },
      error: function (jqXHR, exception) {
        getErrorMessage(that, jqXHR, exception);
      },
    });
  };

  function successFormSubmit(response) {
    console.log(response, response.responseText);

    let submitBtn = $(this.form).find("#submit-button");
    if (submitBtn.attr("soul") === "contacts-form") {
      $("#submit-button").hide();
      $(".form-success-text").text("Your message was sent");
      $(".form-success-text").addClass('form-success-text_visible');
    } else {
      $(".contact-content-form__caption").text("Your message was sent");
      $(".contact-content-form__text").text("We will get back to you as soon as possible");
    }
  }

  function getErrorMessage(that, jqXHR, exception) {
    var msg = '';
    if (jqXHR.status === 0) {
      msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
      msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
      msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
      msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
      msg = 'Time out error.';
    } else if (exception === 'abort') {
      msg = 'Ajax request aborted.';
    } else {
      msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }

    let submitBtn = $(that.form).find("#submit-button");
    if (submitBtn.attr("soul") === "contacts-form") {
      $('.form-error-text').show();
      $('.form-error-text').text("Your message wasn’t sent");
    } else {
      $(".contact-content-form__caption").addClass("error");
      $(".contact-content-form__caption").text("Your message wasn’t sent");
    }

    console.log(jqXHR, msg);
  }

  event.preventDefault();
});