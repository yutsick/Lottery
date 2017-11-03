export default function() {
	$('.js-wallet-transfer').bind('click', function () {
        // Account
		let $accountFirst = $(this).prev();
		let $accountFirstData = $accountFirst.data('account');
        let $accountFirstHtml = $accountFirst.find('.wallet-transfer__account');
		let $accountSecond = $(this).next();
		let $accountSecondData = $accountSecond.data('account');
        let $accountSecondHtml = $accountSecond.find('.wallet-transfer__account');

		// Balance
		let $balanceFirst = $(this).prev().find('.wallet-transfer__balance');
		let $balanceFirstData = $balanceFirst.data('balance');
		let $balanceSecond = $(this).next().find('.wallet-transfer__balance');
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
	});
}