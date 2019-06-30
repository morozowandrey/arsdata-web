const ArsModule = (function () {

  firstNumNode = $('.glide-slides-numbers__first');
  lastNumNode = $('.glide-slides-numbers__last');
  slides = $(".glide__slide:not(.glide__slide--clone)");
  firstNumValue = '01';
  lastNumValue = '0'.concat(slides.length.toString());
  currentSlide = null;

  /* =================== private methods ================= */

  function privateSetSlidesNumbers(firstNum, lastNum) {
    firstNumNode.html(firstNum);
    lastNumNode.html(lastNum);
  }

  function privateStartSliderAnimations() {
    $('.glide-slides-numbers-line__fill').addClass('sliderAnim');
    $('.slide-text').addClass('sliderTextAnim');
  }

  function privateStopSlidersAnimations() {
    $('.glide-slides-numbers-line__fill').removeClass('sliderAnim');
    $('.slide-text').removeClass('sliderTextAnim');
  }

  function privateInitSolutionsSlider() {
    if ($('#solutionsPage').length != 0) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'solutions_category',
        eventAction: 'predictive_maintenance_slider'
      });
      pivateGlide.mount();
    }
  }

  function privateInitTechSlider() {
    if ($('#techPage').length != 0) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'technologies_category',
        eventAction: 'embedded_slider'
      });
      pivateGlide.mount();
    }
  }

  function _(id) { return document.getElementById(id); }

  let pivateGlide = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    gap: 0,
    animationDuration: 1000,
    animationTimingFunc: 'cubic-bezier(0.85, 0.15, 0.15, 0.85)'
  });

  pivateGlide.on('mount.after', function () {
    let slideIndex = window.location.href.split('#')[1];
    let firstNumValue = '0'.concat(parseInt(slideIndex) + 1);

    firstNumValue === NaN ? privateSetSlidesNumbers(firstNumValue, lastNumValue) : privateSetSlidesNumbers('01', lastNumValue);
    if (slideIndex) {
      pivateGlide.go(`=${slideIndex}`);
    }
  });

  pivateGlide.on('run', function () {
    let firstSlideNum = '0'.concat((pivateGlide.index + 1).toString());
    firstNumNode.html(firstSlideNum);
    privateStartSliderAnimations();
  });

  pivateGlide.on('run.after', function (event) {
    privateStopSlidersAnimations();

    if ($('#solutionsPage').length != 0) {
      if (pivateGlide.index == 0) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'predictive_maintenance_slider'
        });
      } else if (pivateGlide.index == 1) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'condition_monitoring_slider'
        });
      } else if (pivateGlide.index == 2) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'sensor_data_slider'
        });
      } else if (pivateGlide.index == 3) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'hvac_slider'
        });
      } else if (pivateGlide.index == 4) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'machine_learning_slider'
        });
      } else if (pivateGlide.index == 5) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'embedded_development_slider'
        });
      } else if (pivateGlide.index == 6) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'data_processing_slider'
        });
      } else if (pivateGlide.index == 7) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'solutions_category',
          eventAction: 'visualization_slider'
        });
      }
    }

    if ($('#techPage').length != 0) {
      if (pivateGlide.index == 0) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'technologies_category',
          eventAction: 'embedded_slider'
        });
      } else if (pivateGlide.index == 1) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'technologies_category',
          eventAction: 'computation_slider'
        });
      } else if (pivateGlide.index == 2) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'technologies_category',
          eventAction: 'storage_slider'
        });

      } else if (pivateGlide.index == 3) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'technologies_category',
          eventAction: 'modeling_slider'
        });

      } else if (pivateGlide.index == 4) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'technologies_category',
          eventAction: 'visualization_slider'
        });

      }
    }

  });

  /* =================== public methods ================== */

  function publicCheckSize() {
    width = null;
    if (window.innerWidth) {
      if (window.innerWidth >= 1440) {
        width = "wide";
      }
      if (window.innerWidth <= 1440) {
        width = "xxl";
      }
      if (window.innerWidth <= 1366) {
        width = "xl";
      }
      if (window.innerWidth <= 1024) {
        width = "lg";
      }
      if (window.innerWidth <= 768) {
        width = "md";
      }
      if (window.innerWidth <= 576) {
        width = "sm";
      }
      if (window.innerWidth <= 360) {
        width = "xs";
      }
    }
    return width;
  }

  function publicToAnchor(currentNode, event) {
    const $target = $(currentNode.getAttribute('href'));

    const $targetSoutions = currentNode.getAttribute('href').split('#')[1]
    if ($target.length) {
      event.preventDefault();
      if ($targetSoutions == "solutions") {
        $('html, body').stop().animate({
          scrollTop: $target.offset().top - 20
        }, 500, 'easeInOutQuad');
      } else if ($targetSoutions == "technology") {
        $('html, body').stop().animate({
          scrollTop: $target.offset().top
        }, 500, 'easeInOutQuad');
      }
      else {
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

  function publicValideteForm(formValue) {
    let namePattern = /^[A-Za-z]+$/;
    let mailPattern = /^[a-z0-9]\w+\.?\w*@[a-z]+\.[a-z]{2,8}$/;

    if (namePattern.test(formValue.get("n"))) {
      $('#formname').css('border-bottom', '1px solid #BFBFBF');
      $('#formNameLable').hide();
    } else {
      $('#formname').css('border-bottom', '1px solid #E63A0F');
      $('#formNameLable').show();
      $('#formNameLable').text("please enter a valid name");
      return false
    }

    if (mailPattern.test(formValue.get("e"))) {
      $('#formemail').css('border-bottom', '1px solid #BFBFBF');
      $('#formEmailLable').hide();
    } else {
      $('#formemail').css('border-bottom', '1px solid #E63A0F');
      $('#formEmailLable').show();
      $('#formEmailLable').text("please enter a valid email address");
      return false
    }

    if ($('#termsAndConditions').is(":checked")) {
      $('.form-radio-box').removeClass('errorCheckbox');
    } else {
      $('.form-radio-box').addClass('errorCheckbox');
      return false
    }

    return true;
  }

  function publicSuccessFormSubmit(response) {
    let submitBtn = $("#submit-button");
    if (submitBtn.attr("soul") === "contacts-form") {
      $("#submit-button").hide();
      $(".form-success-text").text("Your message was sent");
      $(".form-success-text").addClass('form-success-text_visible');
    } else {
      $(".contact-content-form__caption").text("Your message was sent");
      $(".contact-content-form__text").text("We will get back to you as soon as possible");
    }
  }

  function publicGetErrorMessage(that, jqXHR, exception) {
    let submitBtn = $("#submit-button");
    if (submitBtn.attr("soul") === "contacts-form") {
      $('.form-error-text').show();
      $('.form-error-text').text("Your message wasn’t sent");
    } else {
      $(".contact-content-form__caption").addClass("error");
      $(".contact-content-form__caption").text("Your message wasn’t sent");
    }
  }

  function publicSubmitForm() {
    event.preventDefault();
    $('.form-error-text').hide();
    $(".contact-content-form__caption").text("Got questions? — get in touch");
    $(".contact-content-form__caption").removeClass("error");

    var formdata = new FormData();
    formdata.append("n", _("formname").value);
    formdata.append("e", _("formemail").value);
    formdata.append("m", _("formmessage").value);
    formdata.append("c", _("termsAndConditions").value);

    if (publicValideteForm(formdata)) {
      var ajax = new XMLHttpRequest();
      ajax.open("POST", "server.php");
      ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
          if (ajax.responseText == "nullsuccess") {
            publicSuccessFormSubmit();
          } else {
            publicGetErrorMessage();
          }
        }
      }
      ajax.send(formdata);
    }
  }

  function publicHandleCookiesPopUp(hideOrshow) {
    if (hideOrshow == 'hide') {
      document.getElementById('cookies-popup').style.display = "none";
      localStorage.setItem("popupWasShown", true);
    }
    else if (localStorage.getItem("popupWasShown") == null) {
      document.getElementById('cookies-popup').removeAttribute('style');
    }
  }

  function init() {
    privateInitTechSlider();
    privateInitSolutionsSlider();
  }

  return {
    checkSize: publicCheckSize,
    toAnchor: publicToAnchor,
    toggleNav: publicToggleNav,
    valideteForm: publicValideteForm,
    successFormSubmit: publicSuccessFormSubmit,
    getErrorMessage: publicGetErrorMessage,
    handleCookiesPopUp: publicHandleCookiesPopUp,
    submitForm: publicSubmitForm,
    init: init
  };
})();

$(document).ready(function () {
  ArsModule.init();

  // localStorage.removeItem("popupWasShown");
  setTimeout(function () {
    ArsModule.handleCookiesPopUp('show');
  }, 0);

  if (document.getElementById('cookiePage') || document.getElementById('termsPage') || document.getElementById('policyPage')) {
    //Scroll back to top

    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength / height);
      progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on('scroll', function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery('.progress-wrap').addClass('active-progress');
      } else {
        jQuery('.progress-wrap').removeClass('active-progress');
      }
    });
    jQuery('.progress-wrap').on('click', function (event) {
      event.preventDefault();
      jQuery('html, body').animate({ scrollTop: 0 }, duration);
      return false;
    })
  }

});

//----------------EVENTS----------------//

// TOGGLE HAMBURGER & COLLAPSE NAV
$('.navigation-mobile').click(function () {
  ArsModule.toggleNav();
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
  ArsModule.toAnchor(currentNode, event);
});

$(document).ready(function (event) {

  const windowWidth = ArsModule.checkSize();

  //ANIMATIONS TRIGGERS
  if (document.getElementById('homePage')) {

    const aboutIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        // ABOUT BLOCK ANIMATIONS
        if (entry.target.id == 'about' && entry.isIntersecting) {
          $('.about-content-text, .about-content__link').addClass("aboutTextFadeIn");
          $('.read_more_button').addClass("aboutTextFadeIn");

          $('.about-content-text__link_1').addClass("aboutUsTextSlideIn_1");
          $('.about-content-text__link_2').addClass("aboutUsTextSlideIn_2");
          $('.about-content-text__link_3').addClass("aboutUsTextSlideIn_3");

          $('.about-content-text-animbox_1').addClass("aboutUsBgSlideIn_1");
          $('.about-content-text-animbox_2').addClass("aboutUsBgSlideIn_2");
          $('.about-content-text-animbox_3').addClass("aboutUsBgSlideIn_3");

          if (windowWidth == "md" || windowWidth == "sm" || windowWidth == "xs") {
            $('.about-background').addClass("bgSlideInMobile");
          } else {
            $('.about-background').addClass("bgSlideInWide");
          }
        }

      }
    }, { threshold: 0.3 });

    const howitworksIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        // HOWITWORKS ANIMATIONS
        if (entry.target.id == 'howitworks' && entry.isIntersecting) {
          $('.howitworks__caption').addClass('fadeInUp');
          $('.howitworks-options').addClass('fadeInUpDelay');
        }

      }
    }, { threshold: 0.2 });

    const solutionsIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        // SOLUTIONS ANIMATIONS
        if (entry.target.id == 'solutions' && entry.isIntersecting) {
          $('.solutions__caption').addClass('fadeInUp');
        }

      }
    }, { threshold: 0.2 });

    const solutionsGridIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        // SOLUTIONS ANIMATIONS
        if (entry.target.id == 'solutionsGrid' && entry.isIntersecting) {
          $('.solutions-grid-item__caption').addClass('fadeIn');
          $('.solutions-grid').addClass('fadeInUpDelay');
        }

      }
    }, { threshold: 0.5 });

    const technologyIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        // TECHNOLOGIES ANIMATIONS
        if (entry.target.id == 'technology' && entry.isIntersecting) {
          $('.technology__caption, .technology__subcaption').addClass('fadeInUp');
          $('.technology-grid').addClass('fadeInUpDelay');
        }

      }
    }, { threshold: 0.4 });

    const contactIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        // CONTACTS ANIMATIONS
        if (entry.target.id == 'contact' && entry.isIntersecting) {
          if (windowWidth == "md" || windowWidth == "sm" || windowWidth == "xs") {
            $('.contact-background').addClass("bgSlideInMobile");
          } else {
            $('.contact-background').addClass("bgSlideInWide");
          }
          $('.contact-content-info, .contact-content-form').addClass('contactFadeIn');
        }

      }
    }, { threshold: 0.3 });

    aboutIo.observe(document.getElementById('about'));
    howitworksIo.observe(document.getElementById('howitworks'));
    solutionsIo.observe(document.getElementById('solutions'));
    solutionsGridIo.observe(document.getElementById('solutionsGrid'));
    technologyIo.observe(document.getElementById('technology'));
    contactIo.observe(document.getElementById('contact'));
  }

  if (document.getElementById('contactsPage')) {
    const contactPageIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        if (entry.target.id == 'contactPage' && entry.isIntersecting) {
          $('.contact-page-content').addClass('fadeInUpFixed');
        }

      }
    }, { threshold: 0.3 });

    contactPageIo.observe(document.getElementById('contactPage'));
  }

  if (document.getElementById('aboutUsPage')) {
    const aboutUsPageIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        if (entry.target.id == 'aboutUsPage' && entry.isIntersecting) {
          $('.about-page-content').addClass('fadeInUpFixed');
        }

      }
    }, { threshold: 0 });

    const aboutUsContactIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        if (entry.target.id == 'contact' && entry.isIntersecting) {
          $('.contact-content-info, .contact-content-form').addClass('contactFadeIn');
          if (windowWidth == "md" || windowWidth == "sm" || windowWidth == "xs") {
            $('.contact-background').addClass("bgSlideInMobile");
          } else {
            $('.contact-background').addClass("bgSlideInWide");
          }
        }

      }
    }, { threshold: 0.3 });

    aboutUsPageIo.observe(document.getElementById('aboutUsPage'));
    aboutUsContactIo.observe(document.getElementById('contact'));
  }

  if (document.getElementById('techPage')) {
    const techPageIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        if (entry.target.id == 'techPage' && entry.isIntersecting) {
          $('.slider').addClass('fadeInUpSlider');
        }

      }
    }, { threshold: 0.3 });

    const techPageContactIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        if (entry.target.id == 'contact' && entry.isIntersecting) {
          $('.contact-content-info, .contact-content-form').addClass('contactFadeIn');
          if (windowWidth == "md" || windowWidth == "sm" || windowWidth == "xs") {
            $('.contact-background').addClass("bgSlideInMobile");
          } else {
            $('.contact-background').addClass("bgSlideInWide");
          }
        }

      }
    }, { threshold: 0.3 });

    techPageIo.observe(document.getElementById('techPage'));
    techPageContactIo.observe(document.getElementById('contact'));
  }

  if (document.getElementById('solutionsPage')) {
    const solutionsPageIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        if (entry.target.id == 'solutionsPage' && entry.isIntersecting) {
          $('.slider').addClass('fadeInUpSlider');
        }

      }
    }, { threshold: 0.3 });

    const solutionsPageContactIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        if (entry.target.id == 'contact' && entry.isIntersecting) {
          $('.contact-content-info, .contact-content-form').addClass('contactFadeIn');
          if (windowWidth == "md" || windowWidth == "sm" || windowWidth == "xs") {
            $('.contact-background').addClass("bgSlideInMobile");
          } else {
            $('.contact-background').addClass("bgSlideInWide");
          }
        }

      }
    }, { threshold: 0.3 });

    solutionsPageIo.observe(document.getElementById('solutionsPage'));
    solutionsPageContactIo.observe(document.getElementById('contact'));
  }

  if (document.getElementById('termsPage')) {
    const termsPageIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        if (entry.target.id == 'termsPage' && entry.isIntersecting) {
          
        }

      }
    }, { threshold: 0.3 });

    termsPageIo.observe(document.getElementById('termsPage'));
  }

  if (document.getElementById('policyPage')) {
    const policyPageIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        if (entry.target.id == 'policyPage' && entry.isIntersecting) {
          
        }

      }
    }, { threshold: 0.3 });

    policyPageIo.observe(document.getElementById('policyPage'));
  }

  if (document.getElementById('cookiePage')) {
    const cookiePageIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        if (entry.target.id == 'cookiePage' && entry.isIntersecting) {
          $('.contact-page-content').addClass('fadeInUpFixed');
        }

      }
    }, { threshold: 0.3 });

    cookiePageIo.observe(document.getElementById('cookiePage'));
  }

  if (document.getElementById('pageNotFound')) {
    const cookiePageIo = new IntersectionObserver(entries => {
      for (const entry of entries) {

        if (entry.target.id == 'pageNotFound' && entry.isIntersecting) {
          $('.nopage').addClass('fadeInUp');
        }

      }
    }, { threshold: 0.3 });

    cookiePageIo.observe(document.getElementById('pageNotFound'));
  }


});

// $(document).on('mousemove', function (e) {
//   $('#cursor').css({
//     left: e.pageX-15,
//     top: e.pageY-15
//   });
// });


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

function throttle(func, wait) {
  var time = Date.now();
  return function () {
    let context = this, args = arguments;
    if ((time + wait - Date.now()) < 0) {
      func.apply(context, args);;
      time = Date.now();
    }
  }
} 