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
    |___Form Input Focus Materialize Effect
    |___Animate Progressbar on Scroll
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
		autoplay: false,
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




    /* Progressbar */
    var $prg_fill = $('.Progressbar__count[data-percentage]');
	var $queue = $({});
	$prg_fill.each(function () {
		var progress = $(this);
		var percentage = Math.ceil($(this).attr('data-percentage'));		
		$({countNum: 0}).animate({countNum: percentage}, {
			duration: 2000,
			easing:'linear',
			step: function() {
				// What todo on every count
				var pct = '';
				if(percentage == 0){
					pct = Math.floor(this.countNum) + '%';
				}else{
					pct = Math.floor(this.countNum+1) + '%';
				}
				progress.text(pct) && progress.parent().siblings().children().css('width',pct);	
			}
		})
	})




	/* Portfolio Isotope Filter */  
	$('.filter__content').isotope({
		itemSelector: '.filter__grid',
	});
	// filter items on button click
	$('.filter__group').on( 'click', '.filter__button', function() {
		var filterValue = $(this).attr('data-filter');
		$('.filter__content').isotope({ filter: filterValue });
		$('.filter__button').removeClass('active');
		$(this).addClass('active');
	});

	


	/* Images Loaded - Isotope height calculation */  
	// init Isotope
	var $grid = $('.filter__content').isotope({
		itemSelector: '.filter__grid',
		percentPosition: true,
	});
	// layout Isotope after each image loads
	$grid.imagesLoaded().progress( function() {
	  $grid.isotope('layout');
	});		

    function toggleNav(bool) {
        $('.cd-nav-container, .cd-overlay').toggleClass('is-visible', bool);
    }




	/* Burger Menu Menu */ 
    // open left menu clicking the left menu icon
    $('.burger-icon--left').on('click', function(event){
        event.preventDefault();
        toggleLeftNav(true);
        $("body").css({'overflow':'hidden'});
    });
    
    // open right menu clicking the right menu icon
    $('.burger-icon--right').on('click', function(event){
        event.preventDefault();
        toggleRightNav(true);
        $("body").css({'overflow':'hidden'});
	});
	
    $('.burger-icon').on('click', function(event){
        event.preventDefault();
        burgerIcon(true);
    });
    
    $('.cd-close-nav, .cd-overlay').on('click', function(event){
        event.preventDefault();
        toggleLeftNav(false);
        toggleRightNav(false);
        burgerIcon(false);
        $("body").css({'overflow':'auto'});
	});
	
    function burgerIcon(bool) {
        $('.burger-icon').toggleClass('is-visible', bool);
    }

    function toggleLeftNav(bool) {
        $('.burger-menu--left, .cd-overlay').toggleClass('is-visible', bool);
    }

    function toggleRightNav(bool) {
        $('.burger-menu--right, .cd-overlay').toggleClass('is-visible', bool);
	}



	/* Light Gallery Popup Images */ 
	$('#lightgallery').lightGallery();



	
    /* ==========================
       PRE-LOADER
    =============================*/

    // will fade loading animation
    $("#object").delay(600).fadeOut(300);
    // will fade loading background                 
	$("#loading").delay(1000).fadeOut(500);	
	

})(jQuery);

