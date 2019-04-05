// LINKS TO ANCHORS
$('a[href^="#"]').on('click', function (event) {

  const $target = $(this.getAttribute('href'));

  if ($target.length) {
    event.preventDefault();
    $('html, body').stop().animate({
      scrollTop: $target.offset().top
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


// FORM LOGIC

let valideteForm = function (formValue) {
  let namePattern = /^[A-Za-z]+$/;
  let mailPattern = /^[a-z0-9]\w+\.?\w*@[a-z]+\.[a-z]{2,8}$/;

  if (namePattern.test(formValue.name)) {
    $('#formname').css('border-bottom', '1px solid #0052FF');
  } else {
    $('#formname').css('border-bottom', '1px solid red');
    return false
  }

  if (mailPattern.test(formValue.email)) {
    $('#formemail').css('border-bottom', '1px solid #0052FF');
  } else {
    $('#formemail').css('border-bottom', '1px solid red');
    return false
  }

  if (formValue.message == '') {
    $('#formmessage').css('border-bottom', '1px solid red');
    return false
  } else {
    $('#formmessage').css('border-bottom', '1px solid #0052FF');
  }

  if (formValue.termsAndConditions) {
    $('.form-radio-box').removeClass('errorCheckbox');
  } else {
    $('.form-radio-box').addClass('errorCheckbox');
    return false
  }
  
  return true;
}.bind(this);

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