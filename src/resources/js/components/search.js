export default function () {
	$('.account-search .js-action-search').click(function () {
		let $search_container = $(this).parents('.account-search');
		let $search_input = $search_container.find('.form-control');

		if ($search_container.hasClass('js-is-active')) {
			return true;
		}
		else {
			$search_container.addClass('js-is-active');
			$search_input.focus();
		}
	});

	$('.navigation-search i').click(function () {
		let $search_container = $(this).parents('.navigation-search');
		let $search_input = $search_container.find('.form-control');

		if ($search_container.hasClass('js-is-active')) {
			if ($search_input.val()) {
				return true;
			}
			else {
				$search_container.removeClass('js-is-active');
			}
		}
		else {
			$search_container.addClass('js-is-active');
			$search_input.focus();
		}
	});
}
