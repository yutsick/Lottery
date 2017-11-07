export default function () {
	$('.js-data-list-toggle').bind('click', function () {
		$(this).parents('.data-list__cell--actions')
			.toggleClass('data-list__cell--active');
	});
}