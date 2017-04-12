module.exports = {
	init() {
		top_show_hide();

		// Hide Header on on scroll down
		function top_show_hide() {
			var didScroll;
			var mobile_width = 768;
			var lastScrollTop = 0;
			var delta = 5;
			var $top_menu = $('.top-menu');
			var $top_account = $('.top-account');
			var top_height = parseInt($top_menu.outerHeight() + $top_account.outerHeight());

			$(window).scroll(function () {
				let $win = $(this);

				if ($win.width() <= mobile_width) {
					didScroll = true;
				}
			});

			setInterval(function () {
				if (didScroll) {
					hasScrolled();
					didScroll = false;
				}
			}, 250);

			function hasScrolled() {
				let st = $(this).scrollTop();
				let $win = $(window);
				if (Math.abs(lastScrollTop - st) <= delta)
					return;

				if (st > lastScrollTop && st > top_height) {
					$top_account.removeClass('js-top-down').addClass('js-top-up');
				} else {
					if (st + $win.height() < $(document).height()) {
						$top_account.removeClass('js-top-up').addClass('js-top-down');
					}
				}
				lastScrollTop = st;
			}
		}
	}
};
