export default function () {
	$('.js-data-list-toggle').bind('click', function () {
		$(this).parents('.data-list__cell--actions')
			.toggleClass('data-list__cell--active');

		$(this).parents('.data-list__cell--actions')
			.next('.data-list__cell--mobile-actions')
			.toggleClass('data-list__cell--active')
			.find('.data-list__sub-actions')
			.slideToggle();
	});

	$(document).on("click", ".js-toggle-data-list-dropdown", function () {
		$(this).parents('li')
			.find('.data-list__dropdown')
			.toggleClass('data-list__dropdown--active')
			.slideToggle();
	});
}