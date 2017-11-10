export default function () {
	$(document).on("click", ".js-show-invoice-history-details", function () {
		$(this).parents('tr').toggleClass('dropdown-open');
	});
}