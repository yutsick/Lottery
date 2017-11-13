export default function() {
	// Animate section from right
	$('.js-load-section').on('click', function () {
		let $section = $(this).closest('.section');

		$section.removeClass('js-load-from-left').addClass('js-load-from-right');
	});

	// Animate section from left
	$('.js-hide-section').on('click', function (e) {
		let $section = $(this).closest('.section');

		$('.js-load-section').removeClass('active');
		$section.removeClass('js-load-from-right').addClass('js-load-from-left');
		e.preventDefault();
	});
}