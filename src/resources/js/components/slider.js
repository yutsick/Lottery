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

	let flkty = $flickity.data('flickity');
	let $previousButton = $flickity.find('.previous')

	// Disable previous button on by default
	$previousButton.addClass('disabled');

	$flickity.on('select.flickity', function () {
		if (flkty.selectedIndex == 0) {
			$previousButton.addClass('disabled');
		}
		else {
			$previousButton.removeClass('disabled');
		}
	})
}
