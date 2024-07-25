export default function () {
	$('.js-toggle-content').on('click', function () {
		let $id = $(this).attr('data-content');
		let $content = $('#' + $id);

		if ($(this).hasClass('js-is-active')) {
			$(this)
				.removeClass('js-is-active')
				.find('.block-promotion-minified--btn').removeClass('js-is-active');
			$content.removeClass('js-is-visible');
		} else {
			$(this)
				.addClass('js-is-active')
				.find('.block-promotion-minified--btn').addClass('js-is-active');
			$content.addClass('js-is-visible');
		}
	});

	// Hide content and display button again
	$('.js-hide-content').on('click', function () {
		let $id = $(this).attr('data-content');
		let $content = $('#' + $id);

		if ( $content.hasClass('js-is-visible')) {
			$content.removeClass('js-is-visible');
			$('.js-toggle-content').removeClass('js-is-active');
		} else {
			$content.addClass('js-is-visible');
		}
	});
	
}


