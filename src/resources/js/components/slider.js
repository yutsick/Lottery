export default function() {
	$('.block-slider').flickity({
		cellSelector: '.block-slider__item',
		cellAlign: 'left',
		wrapAround: true,
		contain: false,
		draggable: true,
		pageDots: true,
		prevNextButtons: true
	});
}
