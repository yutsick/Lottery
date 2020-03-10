export default function () {


	let $flickity = $('.block-slider').flickity({
		cellSelector: '.block-slider__item',
		cellAlign: 'left',
		wrapAround: true,
		contain: false,
		draggable: true,
		pageDots: true,
		prevNextButtons: true
	});

	// Disable previous button by default
	$flickity.find('.previous').addClass('disabled');

	$flickity.on('select.flickity', function () {
		let $this = $(this);
		let flkty = $this.data('flickity');
		let $previousButton = $this.find('.previous');

		if (flkty.selectedIndex == 0) {
			$previousButton.addClass('disabled');
		} else {
			$previousButton.removeClass('disabled');
		}
	});

	// Slider for post inner page
	let $flickityPostSlider = $('.post-slider').flickity({
		cellSelector: '.post-slider__item',
		cellAlign: 'left',
		wrapAround: true,
		contain: false,
		draggable: true,
		pageDots: true,
		adaptiveHeight: false,
		prevNextButtons: true
	});

	// Change caption position for mobile
	let maxHeight = Math.max.apply(null, $(".post-slider__caption").map(function () {
		return $(this).outerHeight();
	}).get());
	const captionHeightFn = () => {
		let curItem = $flickityPostSlider.data('flickity').selectedElement;

		if ( $(window).width() < 768 ) {

			$(curItem).closest('.post-slider').css('padding-bottom', (maxHeight));
			$(curItem).find('.post-slider__caption').css({
				'bottom': - (maxHeight),
				'height': maxHeight
			});
			$(".flickity-page-dots").css('bottom', (maxHeight + 20));

		} else {
			$(curItem).closest('.post-slider').css('padding-bottom', 0);
			$(".flickity-page-dots").css('bottom', 20);
			$(curItem).find('.post-slider__caption').css({
				'bottom': 0,
				'height': "auto"
			});
		}
	};

	// Disable previous button by default
	$flickityPostSlider.find('.previous').addClass('disabled');

	$flickityPostSlider.on('select.flickity', function () {
		let $this = $(this);
		let flkty = $this.data('flickity');
		let $previousButton = $this.find('.previous');
		console.log(flkty.selectedIndex);

		if (flkty.selectedIndex == 0) {
			$previousButton.addClass('disabled').fadeOut();
		} else {
			$previousButton.removeClass('disabled').fadeIn();
		}
		captionHeightFn();
	});

	if ($(".post-slider")[0]){
		captionHeightFn();
		$(window).resize(function() {
			captionHeightFn();
		});
	}
}


