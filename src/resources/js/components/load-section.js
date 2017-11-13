export default function() {
	// Animate section from right
	$('.js-load-section').on('click', function () {
		let $section = $(this).closest('.section');
		let $navigation = $section.find('.nav');

		$navigation.hide().removeClass('js-load-from-left');
		$section.addClass('js-load-from-right');
	});

	// Animate section from left
	$('.js-hide-section').on('click', function (e) {
		let $section = $(this).closest('.section');
		let $navigation = $section.find('.nav');

		$('.js-load-section').removeClass('active');
		$navigation.show().addClass('js-load-from-left');
		$section.removeClass('js-load-from-right');
		e.preventDefault();
	});
}