import isMobile from '../utilities/isMobile';

export default function() {

	// Get current element value, add as html on target
	$('.js-get-value').on('click', function () {
		let $value = $(this).val();
		let $target = $('.js-add-value');

		$target.html($value);

		// Close the dropdown menu
		$(this).parents('.dropdown').removeClass('open').find('.filter-dropdown__button').attr('aria-expanded', false);

		if (isMobile()) {
			$('body').removeClass('modal-open js-overlay-is-active');
			$(".modal-backdrop").remove();
			$(".dropdown-backdrop").remove();
		}

		// Remove backdrop
		if ($('.modal-backdrop')) {
			$('.modal-backdrop').remove();
		}
	});
}