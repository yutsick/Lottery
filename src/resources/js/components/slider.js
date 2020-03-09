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
		prevNextButtons: true
	});

	// Disable previous button by default
	$flickityPostSlider.find('.previous').addClass('disabled');


	const captionHeightFn = () => {
		let curItem = $flickityPostSlider.data('flickity').selectedElement;
		let curItemHeight = $(curItem).find('.post-slider__caption').outerHeight();

		if ( $(window).width() < 768 ) {
			// $(curItem).closest('.post-slider').css('padding-bottom', (curItemHeight + 20));
			$(".flickity-page-dots").css('bottom', (curItemHeight + 20));
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


	window.onresize = function() {
		captionHeightFn();
	};
}


