/*
Template: Gemzie - Diamond Manufacturing HTML Template
Author: peacefulqode.com
Version: 1.0
Design and Developed by: Peacefulqode

*/

/*================================================
[  Table of contents  ]
==================================================

==> Page Loader
==> Hover Active
==> Back To Top
==> WOW 
==> Moving Button
==> Isotope
==> Sticky Header
==> Owl Carousel
==> Accordion
==> moving scroll slider
==> Magnific Popup
==> Bg Extend
==> counter

==================================================
[ End table content ]
================================================*/

(function (jQuery) {
  ("use strict");
  jQuery(window).on("load", function (e) {
    /*==================================================
    [ Page Loader ]
    ==================================================*/
    jQuery("#pq-loading").fadeOut();
    jQuery("#pq-loading").delay(0).fadeOut("slow");

    var Scrollbar = window.Scrollbar;
    /*==================================================
    [ Hover Active ]
    ==================================================*/

    jQuery(".pq-hover-active").each(function () {
      var $container = jQuery(this);

      // Activate the second child initially
      $container.find(".pq-hover-item:nth-child(1)").addClass("pq-active");

      // Handle hover events for items within this container
      $container.find(".pq-hover-item").on({
        mouseenter: function () {
          $container.find(".pq-hover-item").removeClass("pq-active");
          jQuery(this).addClass("pq-active");
        },
      });
    });

    /*==================================================
        [ Back To Top ]
        ==================================================*/
    jQuery(window).on("scroll", function () {
      var scrollTop = jQuery(this).scrollTop();
      var docHeight = jQuery(document).height();
      var winHeight = jQuery(window).height();
      var scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

      if (scrollTop > 250) {
        jQuery("#top").fadeIn(400);
      } else {
        jQuery("#top").fadeOut(400);
      }

      // Update the conic-gradient for the circular progress
      var progress = scrollPercent;
      jQuery("#top").css(
        "background",
        `conic-gradient(#D4A65E ${progress}%, #1C2E16 ${progress}%)`
      );
    });

    // Scroll to top on button click
    jQuery("#top").on("click", function () {
      jQuery("body,html").animate({ scrollTop: 0 }, 100);
      return false;
    });

    /*==================================================
    [ WOW ]
    ==================================================*/

    new WOW().init();

    /*==================================================
    [ Moving Button ]
    ==================================================*/

    // moving button js
    var strength = jQuery(".pq-moving-start").height() - 10;
    // console.log(strength);
    var magnets = document.querySelectorAll(".pq-moving-button");
    // console.log(magnets);
    magnets.forEach((magnet) => {
      magnet.addEventListener("mousemove", moveMagnet);
      magnet.addEventListener("mouseout", function (event) {
        TweenMax.to(event.currentTarget, 1, {
          x: 0,
          y: 0,
          ease: Power4.easeOut,
        });
      });
    });
    function moveMagnet(event) {
      var magnetButton = event.currentTarget;
      var bounding = magnetButton.getBoundingClientRect();
      TweenMax.to(magnetButton, 1, {
        x:
          ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
          strength,
        y:
          ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
          strength,
        ease: Power4.easeOut,
      });
    }

    /*==================================================
    [ Isotope ]
    ==================================================*/

    jQuery(".pq-masonry").isotope({
      itemSelector: ".pq-masonry-item",
      masonry: {
        columnWidth: ".grid-sizer",
        // gutter: 0
      },
    });
    jQuery(".pq-grid").isotope({
      itemSelector: ".pq-grid-item",
    });
    jQuery(".pq-filter-button-group").on(
      "click",
      ".pq-filter-btn",
      function () {
        var filterValue = jQuery(this).attr("data-filter");
        // console.log(filterValue);
        jQuery(".pq-masonry").isotope({
          filter: filterValue,
        });
        jQuery(".pq-grid").isotope({
          filter: filterValue,
        });
        jQuery(".pq-filter-button-group .pq-filter-btn").removeClass("active");
        jQuery(this).addClass("active");
        updateFilterCounts();
      }
    );
    var initial_items = 5;
    var next_items = 3;
    if (jQuery(".pq-masonry").length > 0) {
      var initial_items = jQuery(".pq-masonry").data("initial_items");
      var next_items = jQuery(".pq-masonry").data("next_items");
    }
    if (jQuery(".pq-grid").length > 0) {
      var initial_items = jQuery(".pq-grid").data("initial_items");
      var next_items = jQuery(".pq-grid").data("next_items");
    }
    function showNextItems(pagination) {
      var itemsMax = jQuery(".visible_item").length;
      var itemsCount = 0;
      jQuery(".visible_item").each(function () {
        if (itemsCount < pagination) {
          jQuery(this).removeClass("visible_item");
          itemsCount++;
        }
      });
      if (itemsCount >= itemsMax) {
        jQuery("#showMore").hide();
      }
      if (jQuery(".pq-masonry").length > 0) {
        jQuery(".pq-masonry").isotope("layout");
      }
      if (jQuery(".pq-grid").length > 0) {
        jQuery(".pq-grid").isotope("layout");
      }
    }
    // function that hides items when page is loaded
    function hideItems(pagination) {
      var itemsMax = jQuery(".pq-filter-items").length;
      // console.log(itemsMax);
      var itemsCount = 0;
      jQuery(".pq-filter-items").each(function () {
        if (itemsCount >= pagination) {
          jQuery(this).addClass("visible_item");
        }
        itemsCount++;
      });
      if (itemsCount < itemsMax || initial_items >= itemsMax) {
        jQuery("#showMore").hide();
      }
      if (jQuery(".pq-masonry").length > 0) {
        jQuery(".pq-masonry").isotope("layout");
      }
      if (jQuery(".pq-grid").length > 0) {
        jQuery(".pq-grid").isotope("layout");
      }
    }
    jQuery("#showMore").on("click", function (e) {
      e.preventDefault();
      showNextItems(next_items);
    });
    hideItems(initial_items);
    function updateFilterCounts() {
      // get filtered item elements
      if (jQuery(".pq-masonry").length > 0) {
        var itemElems = jQuery(".pq-masonry").isotope(
          "getFilteredItemElements"
        );
      }
      if (jQuery(".pq-grid").length > 0) {
        var itemElems = jQuery(".pq-grid").isotope("getFilteredItemElements");
      }
      var count_items = jQuery(itemElems).length;
      // console.log(count_items);
      if (count_items > initial_items) {
        jQuery("#showMore").show();
      } else {
        jQuery("#showMore").hide();
      }
      if (jQuery(".pq-filter-items").hasClass("visible_item")) {
        jQuery(".pq-filter-items").removeClass("visible_item");
      }
      var index = 0;
      jQuery(itemElems).each(function () {
        if (index >= initial_items) {
          jQuery(this).addClass("visible_item");
        }
        index++;
      });
      if (jQuery(".pq-masonry").length > 0) {
        jQuery(".pq-masonry").isotope("layout");
      }
      if (jQuery(".pq-grid").length > 0) {
        jQuery(".pq-grid").isotope("layout");
      }
    }

    /*==================================================
        [ Sticky Header ]
        ==================================================*/

    var view_width = jQuery(window).width();
    if (!jQuery("header").hasClass("pq-header-default") && view_width >= 1023) {
      var height = jQuery("header").height();
      jQuery(".pq-breadcrumb-style-1").css("padding-top", height * 2.3);
    }
    if (jQuery("header").hasClass("pq-header-default")) {
      jQuery(window).scroll(function () {
        var scrollTop = jQuery(window).scrollTop();
        if (scrollTop > 300) {
          jQuery(".pq-bottom-header").addClass(
            "pq-header-sticky animated fadeInDown animate__faster"
          );
        } else {
          jQuery(".pq-bottom-header").removeClass(
            "pq-header-sticky animated fadeInDown animate__faster"
          );
        }
      });
    }
    if (jQuery("header").hasClass("pq-has-sticky")) {
      jQuery(window).scroll(function () {
        var scrollTop = jQuery(window).scrollTop();
        if (scrollTop > 300) {
          jQuery(".pq-bottom-header").addClass(
            "pq-header-sticky animated fadeInDown animate__faster"
          );
        } else {
          jQuery(".pq-bottom-header").removeClass(
            "pq-header-sticky animated fadeInDown animate__faster"
          );
        }
      });
    }

    /*======================================
    [ Owl Carousel ]
    ======================================*/

    jQuery(".owl-carousel").each(function () {
      var app_slider = jQuery(this);
      var rtl = false;
      var prev = "ion-ios-arrow-back";
      var next = "ion-ios-arrow-forward";
      var prev_text = "Prev";
      var next_text = "Next";
      if (jQuery("body").hasClass("pq-is-rtl")) {
        rtl = true;
        prev = "ion-ios-arrow-forward";
        next = "ion-ios-arrow-back";
      }
      if (app_slider.data("prev_text") && app_slider.data("prev_text") != "") {
        prev_text = app_slider.data("prev_text");
      }
      if (app_slider.data("next_text") && app_slider.data("next_text") != "") {
        next_text = app_slider.data("next_text");
      }
      app_slider.owlCarousel({
        rtl: rtl,
        center: app_slider.data("center"),
        items: app_slider.data("desk_num"),
        loop: app_slider.data("loop"),
        margin: app_slider.data("margin"),
        nav: app_slider.data("nav"),
        dots: app_slider.data("dots"),
        loop: app_slider.data("loop"),
        autoplay: app_slider.data("autoplay"),
        autoplayHoverPause: true,
        autoplayTimeout: app_slider.data("autoplay-timeout"),
        navText: [
          "<i class='" + prev + "'></i>",
          "<i class='" + next + "'></i>",
        ],
        responsiveClass: true,
        responsive: {
          // breakpoint from 0 up
          0: {
            items: app_slider.data("mob_sm"),
            nav: true,
            dots: false,
          },
          // breakpoint from 480 up
          480: {
            items: app_slider.data("mob_num"),
            nav: true,
            dots: false,
          },
          // breakpoint from 786 up
          786: {
            items: app_slider.data("tab_num"),
          },
          // breakpoint from 1023 up
          1023: {
            items: app_slider.data("lap_num"),
          },
          1199: {
            items: app_slider.data("desk_num"),
          },
        },
      });
    });

    /*==================================================
    [ Accordion]
     ==================================================*/

    jQuery(
      ".pq-accordion-block .pq-accordion-box .pq-accordion-details"
    ).hide();
    jQuery(".pq-accordion-block .pq-accordion-box:first")
      .addClass("pq-active")
      .children()
      .slideDown("slow");
    jQuery(".pq-accordion-block .pq-accordion-box").on("click", function () {
      if (jQuery(this).children("div.pq-accordion-details").is(":hidden")) {
        jQuery(".pq-accordion-block .pq-accordion-box")
          .removeClass("pq-active")
          .children("div.pq-accordion-details")
          .slideUp("slow");
        jQuery(this)
          .toggleClass("pq-active")
          .children("div.pq-accordion-details")
          .slideDown("slow");
      }
    });

    /*==================================================
    [ moving scroll slider]
     ==================================================*/

    gsap.defaults({ overwrite: "auto" });
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ nullTargetWarn: false });

    function initGallery() {
      // Check if the screen width is greater than 767px (for mobile)
      if (window.innerWidth > 767) {
        // Clear previous ScrollTriggers if any exist
        ScrollTrigger.getAll().forEach((st) => st.kill());

        // Proceed with animation for desktop and tablet views
        gsap.utils
          .toArray(".g-slider--one, .g-slider--two")
          .forEach((section, index) => {
            const galleryList = section.querySelector(
              ".g-slider--one-list, .g-slider--two-list"
            );

            // Calculate the x and xEnd values differently for each slider
            const [x, xEnd] =
              index % 2 === 0
                ? [0, -section.offsetWidth / 10.5] // Left-to-right for the first slider
                : [10.5, section.offsetWidth / 10.5]; // Right-to-left for the second slider

            // Animate the galleryList items using ScrollTrigger
            gsap.fromTo(
              galleryList,
              { x },
              {
                x: xEnd,
                scrollTrigger: {
                  trigger: section,
                  scrub: 1,
                },
              }
            );
          });
      } else {
        // Kill all ScrollTrigger animations on mobile view
        ScrollTrigger.getAll().forEach((st) => st.kill());
        console.log("Slider disabled for mobile view.");
      }
    }

    // Initialize the gallery on load
    initGallery();

    // Add event listener to handle screen resizing and reinitialize the gallery
    window.addEventListener("resize", function () {
      initGallery(); // Re-run the function when the window is resized
    });

    /*==================================================
    [ Magnific Popup ]
    ==================================================*/

    jQuery(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });

    jQuery(".gallery").each(function () {
      // the containers for all your galleries
      jQuery(this).magnificPopup({
        delegate: "a", // the selector for gallery item
        type: "image",
        gallery: {
          enabled: true,
        },
      });
    });

    /*==================================================
    [ Bg Extend ]
    ==================================================*/
    gsap.registerPlugin(ScrollTrigger);
    const ht_elm = gsap.utils.toArray(".pq-bg-expand");
    if (ht_elm.length == 0) return;
    ScrollTrigger.matchMedia({
      "(min-width: 1099px)": function () {
        ht_elm.forEach((box, i) => {
          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: box,
              start: "top 100%",
              end: "+=700px",
              scrub: 1,
            },
            defaults: {
              ease: "none",
            },
          });
          tl.fromTo(
            box,
            {
              clipPath: "inset(0% 7% 0% 7%)",
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 3,
            }
          );
        });
      },
    });

    /*==================================================
    [ counter]
     ==================================================*/

    jQuery(window).on("scroll", function () {
      jQuery(".pq-counter").each(function () {
        var $this = jQuery(this);
        var elementTop = $this.offset().top;
        var windowBottom = jQuery(window).scrollTop() + jQuery(window).height();
        // Check if the counter element is in the viewport
        if (windowBottom > elementTop) {
          if (!$this.hasClass("counted")) {
            // Check if the animation has already run
            $this.addClass("counted"); // Mark this counter as processed

            // Animate the counter
            $this.find(".pq-count").each(function () {
              var $count = jQuery(this),
                countTo = $count.attr("data-count");
              var Toduration = parseInt($count.attr("data-pq-duration")); // Parse duration

              jQuery({ countNum: 0 }).animate(
                {
                  countNum: countTo,
                },
                {
                  duration: Toduration,
                  easing: "swing",
                  step: function () {
                    $count.text(Math.floor(this.countNum)); // Update the number during animation
                  },
                  complete: function () {
                    $count.text(this.countNum); // Set the final value
                  },
                }
              );
            });
          }
        }
      });
    });
  });
})(jQuery);
