$(document).ready(function() {
	$(".page-content--carousel").slick({
		centerMode: true,
		centerPadding: "60px",
		slidesToShow: 3,
		arrows: true,
		prevArrow: `<button class="carousel-prev fa fa-chevron-left"></button>`,
		nextArrow: `<button class="carousel-next fa fa-chevron-right"></button>`,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: "40px",
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: "40px",
					slidesToShow: 1
				}
			}
		]
	});
});
