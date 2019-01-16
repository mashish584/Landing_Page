"use strict";

$(document).ready(function() {
	$(".page-content--carousel").slick({
		centerMode: true,
		centerPadding: "60px",
		slidesToShow: 3,
		arrows: true,
		prevArrow: '<button class="carousel-prev fa fa-chevron-left"></button>',
		nextArrow: '<button class="carousel-next fa fa-chevron-right"></button>',
		responsive: [
			{
				breakpoint: 996,
				settings: {
					arrows: true,
					centerMode: true,
					centerPadding: "40px",
					slidesToShow: 2
				}
			},
			{
				breakpoint: 648,
				settings: {
					arrows: true,
					centerMode: true,
					centerPadding: "40px",
					slidesToShow: 1
				}
			}
		]
	});
});
