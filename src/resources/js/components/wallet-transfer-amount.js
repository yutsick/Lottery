export default function() {
	$('.js-wallet-amount').bind('click', function () {
		// Add data-attr as input value
		$(this).parent().find('input').val($(this).data('amount'));

		// Add active class to current button
		$(this).addClass('wallet-transfer__btn--active').siblings().removeClass('wallet-transfer__btn--active');

		// Enable submit button when selecting a value
		$(this).siblings('.wallet-transfer__submit').removeClass('disabled');
	});

	// Remove active class when emptying the input field
	$('.wallet-transfer__form-wrapper .js-action-empty-input').bind('click', function () {
		$('.js-wallet-amount').removeClass('wallet-transfer__btn--active');
	});
}