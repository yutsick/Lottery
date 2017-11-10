export default function() {
	$('.js-wallet-amount').bind('click', function () {
		// Add data-attr as input value
		$(this).parent().find('input').val($(this).data('amount'));

		// Add active class to current button
		$(this).addClass('wallet-transfer__btn--active').siblings().removeClass('wallet-transfer__btn--active');
	});
}