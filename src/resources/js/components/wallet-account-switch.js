export default function() {
	$('.js-wallet-switch').bind('click', function () {
		let $icon = $('.wallet-switch__icon');

		// Account
		let $accountFirst = $(this).prev();
		let $accountFirstData = $accountFirst.data('account');
		let $accountFirstHtml = $accountFirst.find('.wallet-switch__account');
		let $accountSecond = $(this).next();
		let $accountSecondData = $accountSecond.data('account');
		let $accountSecondHtml = $accountSecond.find('.wallet-switch__account');

		// Balance
		let $balanceFirst = $(this).prev().find('.wallet-switch__balance');
		let $balanceFirstData = $balanceFirst.data('balance');
		let $balanceSecond = $(this).next().find('.wallet-switch__balance');
		let $balanceSecondData = $balanceSecond.data('balance');

		// Switch account values on click
		$accountFirstHtml.html($accountFirstHtml.html() == $accountFirstData ? $accountSecondData : $accountFirstData);
		$accountFirst.attr('data-account', $accountFirst.attr('data-account') == $accountFirstData ? $accountSecondData : $accountFirstData);

		$accountSecondHtml.html($accountSecondHtml.html() == $accountSecondData ? $accountFirstData : $accountSecondData);
		$accountSecond.attr('data-account', $accountSecond.attr('data-account') == $accountSecondData ? $accountFirstData : $accountSecondData);

		// Switch balance values on click
		$balanceFirst
			.html($balanceFirst.html() == $balanceFirstData ? $balanceSecondData : $balanceFirstData)
			.attr('data-balance', $balanceFirst.attr('data-balance') == $balanceFirstData ? $balanceSecondData : $balanceFirstData);

		$balanceSecond
			.html($balanceSecond.html() == $balanceSecondData ? $balanceFirstData : $balanceSecondData)
			.attr('data-balance', $balanceSecond.attr('data-balance') == $balanceSecondData ? $balanceFirstData : $balanceSecondData);

		// Add animation class
		$icon.addClass('js-wallet-switch__animation');

		// Remove animation class after transition ends
		$icon.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
			$(this).removeClass('js-wallet-switch__animation');
		});
	});
}