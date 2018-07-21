$(document).ready(function(){

	// Stage Padding Owl Carousel Slider	

	$('.Slider .owl-carousel').owlCarousel({
		items: 1,
		stagePadding: 100,
		loop:true,
		margin:40,
		responsiveClass: true,
		responsiveRefreshRate: true,
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
			},
			1920 : {
				items: 2,
				stagePadding: 400,
			}
		}
	})	

});
