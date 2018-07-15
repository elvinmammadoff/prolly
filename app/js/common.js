$(document).ready(function(){

	// Stage Padding Owl Carousel Slider	

	$('.Slider .owl-carousel').owlCarousel({
		stagePadding: 600,
		loop:true,
		margin:40,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:1
			}
		}
	})	

});
