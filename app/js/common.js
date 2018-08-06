/*********************************************************************************

	Template Name: Rafoz Farzo - Multipurpose Bootstrap 4 Template
	Template URI:   
	Description: Rafoz Farzo is a best templete for your corporate/business website which comes with unique design and user friendly code.  
	Author: Alissio
	Author URI: 
	Version: 1.0

    Note: This is scripts js. All custom scripts here.

**********************************************************************************/

/*===============================================================================

    [ INDEX ]
	|
    |___Stage Padding Owl Carousel Slider
    |___Button Ripple Effect
    |___Sticky Header
    |
	[END INDEX ]

================================================================================*/

(function ($) {
    'use strict';


    /* Stage Padding Owl Carousel Slider */
	$('.Slider .owl-carousel').owlCarousel({
		items: 1,
		stagePadding: 100,
		loop: true,
		dots: true,
		autoplay: true,
		autoplaySpeed: 2000,	
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		margin: 40,
		responsive : {
			0 : {
				items: 1,
				margin:20,
				stagePadding: 0,
			},
			768 : {
				items: 1,
				stagePadding: 250,
			},
			960 : {
				items: 1,
				stagePadding: 250,
			},
			1200 : {
				items: 1,
				stagePadding: 400,
			},
			1400 : {
				items: 1,
				stagePadding: 400,
			},
			1600 : {
				items: 1,
				stagePadding: 500,
			}
		}
	})	




	/* Button Ripple Effect */
	$(".Slider__button").click(function (e) {
		// Remove any old one
		$(".ripple").remove();
		// Setup
		var posX = $(this).offset().left,
			posY = $(this).offset().top,
			buttonWidth = $(this).width(),
			buttonHeight =  $(this).height();
		// Add the element
		$(this).prepend("<span class='ripple'></span>");
		// Make it round!
		if(buttonWidth >= buttonHeight) {
			buttonHeight = buttonWidth;
		} else {
			buttonWidth = buttonHeight; 
		}
		// Get the center of the element
		var x = e.pageX - posX - buttonWidth / 2;
		var y = e.pageY - posY - buttonHeight / 2;
		// Add the ripples CSS and start the animation
		$(".ripple").css({
			width: buttonWidth,
			height: buttonHeight,
			top: y + 'px',
			left: x + 'px'
		}).addClass("rippleEffect");
	});


    /* Sticky Header */
    $(window).on('scroll', function () {
        var scrollPos = $(this).scrollTop();
        if (scrollPos > 300) {
            $('.sticky-header').addClass('is-sticky');
        } else {
            $('.sticky-header').removeClass('is-sticky');
        }
	});	
	
	
    /* Form Input Focus Materialize Effect */
	$('.Form__input').focus(function () {
		var $field = $(this).closest('.Form__group');
		$field.addClass('Form__group--focus');		
	}).blur(function () {
		var $field = $(this).closest('.Form__group');
		$field.removeClass('Form__group--focus');
		if (this.value) {
			$field.addClass('Form__group--focus');
		} else {
			$field.removeClass('Form__group--focus');
		}
	});	
	
	


})(jQuery);

	
	
