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
		let $previousButton = $this.find('.previous')

		if (flkty.selectedIndex == 0) {
			$previousButton.addClass('disabled');
		}
		else {
			$previousButton.removeClass('disabled');
		}
	})
}
