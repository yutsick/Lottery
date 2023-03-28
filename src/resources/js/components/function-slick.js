export default function () {
	$("#productCategorySlider").slick({
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		arrow: true,
		variableWidth: true,
		slidesToShow: 7,
		slidesToScroll: 1,

		responsive: [
			{
				breakpoint: 1380,
				settings: {
					slidesToShow: 7,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 20,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 1,
				},
			},
		],
	});

	$("#productCategorySlider").addClass("left");

	$("#productCategorySlider").on(
		"afterChange",
		function (event, slick, currentSlide, nextSlide) {
			if (currentSlide == 0) {
				$("#productCategorySlider").addClass("left");
			} else if (
				slick.currentSlide >=
				slick.slideCount - slick.options.slidesToShow
			) {
				$("#productCategorySlider").addClass("righet");
			} else {
				$("#productCategorySlider").removeClass("righet");
				$("#productCategorySlider").removeClass("left");
			}
		}
	);
}
