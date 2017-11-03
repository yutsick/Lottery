export default function() {
	$('.js-wallet-amount').bind('click', function () {
		// Add data-attr as input value
		$(this).siblings('input').val($(this).data('amount'));
	});
}