export default function () {


	let $flickity = $('.block-slider').flickity({
		cellSelector: '.block-slider__item',
		cellAlign: 'left',
		wrapAround: true,
		contain: false,
		draggable: true,
		pageDots: true,
		prevNextButtons: true,
		on: {
			ready: function() {
				captionHeightFn()
			}
		}
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
		adaptiveHeight: true,
		prevNextButtons: true
	});

	// Disable previous button by default
	$flickityPostSlider.find('.previous').addClass('disabled');

	let maxHeight = Math.max.apply(null, $(".post-slider__caption").map(function () {
		return $(this).outerHeight();
	}).get());

	const captionHeightFn = () => {
		let curItem = $flickityPostSlider.data('flickity').selectedElement;

		// console.log(maxHeight);
		if ( $(window).width() < 768 ) {
			$(curItem).closest('.post-slider').css('padding-bottom', (maxHeight));
			$(curItem).find('.post-slider__caption').css({
				'bottom': - (maxHeight),
				'height': maxHeight
			});
			$(".flickity-page-dots").css('bottom', (maxHeight + 20));
		} else {
			$(".flickity-page-dots").css('bottom', 20);
		}
	};



	$flickityPostSlider.on('select.flickity', function () {
		let $this = $(this);
		let flkty = $this.data('flickity');
		let $previousButton = $this.find('.previous');

		if (flkty.selectedIndex == 0) {
			$previousButton.addClass('disabled');
		} else {
			$previousButton.removeClass('disabled');
		}
		captionHeightFn();
	});

	captionHeightFn();
	window.onresize = function() {
		captionHeightFn();
	};
}


