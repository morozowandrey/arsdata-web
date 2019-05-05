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

    firstNumValue === NaN ? privateSetSlidesNumbers(firstNumValue, lastNumValue) : privateSetSlidesNumbers('01', lastNumValue);
    if (slideIndex) {
      publicGlide.go(`=${slideIndex}`);
    }
  });

  publicGlide.on('run', function () {
    let firstSlideNum = '0'.concat((publicGlide.index + 1).toString());
    firstNumNode.html(firstSlideNum);
    privateStartSliderAnimations();
  });

  publicGlide.on('run.after', function (event) {
    privateStopSlidersAnimations();

    if (window.location.pathname === "/solutions.html") {
      if (publicGlide.index == 0) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'predictive_maintenance_slider'
        });
      } else if (publicGlide.index == 1) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'condition_monitoring_slider'
        });
      } else if (publicGlide.index == 2) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'sensor_data_slider'
        });
      } else if (publicGlide.index == 3) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'hvac_slider'
        });
      } else if (publicGlide.index == 4) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'machine_learning_slider'
        });
      } else if (publicGlide.index == 5) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'embedded_development_slider'
        });
      } else if (publicGlide.index == 6) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'data_processing_slider'
        });
      } else if (publicGlide.index == 7) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'visualization_slider'
        });
      }
    }

    if (window.location.pathname === "/technologies.html") {
      if (publicGlide.index == 0) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'technologies_category',
          eventAction: 'embedded_slider'
        });
      } else if (publicGlide.index == 1) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'technologies_category',
          eventAction: 'computation_slider'
        });
      } else if (publicGlide.index == 2) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'technologies_category',
          eventAction: 'storage_slider'
        });

      } else if (publicGlide.index == 3) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'technologies_category',
          eventAction: 'modeling_slider'
        });

      } else if (publicGlide.index == 4) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'technologies_category',
          eventAction: 'visualization_slider'
        });

      }
    }

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

  if (window.location.pathname === "/solutions.html") {
    ga('send', {
      hitType: 'event',
      eventCategory: 'solutions_category',
      eventAction: 'predictive_maintenance_slider'
    });
    publicGlide.mount();
  }

  if (window.location.pathname === "/technologies.html") {
    ga('send', {
      hitType: 'event',
      eventCategory: 'technologies_category',
      eventAction: 'embedded_slider'
    });
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




// GOOGLE ANALITICS

// NAVIGATION
$(".nav-about_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'about_button'
  });
});
$(".nav-solutions_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'solutions_button'
  });
});
$(".nav-technology_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'technology_button'
  });
});
$(".nav- contact_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'contact_button'
  });
});


// CALL TO ACTION
$(".start_project_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'start_project_button'
  });
});
$(".read_more_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'read_more_button'
  });
});


// HOW IT WORKS
$(".howitworks-options-bullet__caption").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'how_it_works_button'
  });
});


//SOLUTIONS
$("#predictive_maintenance_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'predictive_maintenance_button'
  });
});
$("#condition_monitoring_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'condition_monitoring_button'
  });
});
$("#sensor_data_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'sensor_data_button'
  });
});
$("#hvac_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'hvac_button'
  });
});
$("#machine_learning_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'machine_learning_button'
  });
});
$("#embedded_development_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'embedded_development_button'
  });
});
$("#data_processing_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'data_processing_button'
  });
});
$("#visualization_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'visualization_button'
  });
});


// TECHNOLOGIES
$("#embedded_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'embedded_button'
  });
});
$("#computation_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'computation_button'
  });
});
$("#storage_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'storage_button'
  });
});
$("#modeling_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'modeling_button'
  });
});
$("#visualization_technologies_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'visualization_technologies_button'
  });
});


// CONTACT FORM
$(".send_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'send_button'
  });
});
$(".send_message_button").click(function (e) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'main_page_category',
    eventAction: 'send_message_button'
  });
});


function PopUp(hideOrshow) {
  if (hideOrshow == 'hide') {
    document.getElementById('cookies-popup').style.display = "none";
  }
  else if (localStorage.getItem("popupWasShown") == null) {
    localStorage.setItem("popupWasShown", true);
    document.getElementById('cookies-popup').removeAttribute('style');
  }
}
window.onload = function () {
  // localStorage.removeItem("popupWasShown")‰
  setTimeout(function () {
    PopUp('show');
  }, 0);
}


function hideNow(e) {
  if (e.target.id == 'cookies-popup') document.getElementById('cookies-popup').style.display = 'none';
}