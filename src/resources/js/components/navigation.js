module.exports = {
	init() {
		toggle_nav();
		reset_nav_on_resize();
		toggle_sub_nav();
		top_show_hide();

		$(window).on('resize', function () {
			reset_nav_on_resize();
		});
		var $body = $('body');
		var $page_wrapper = $('#page-wrapper');
		var $sidebar = $('#sidebar');
		var active_class = 'js-is-active';
		var trigger = false;
		var mobile_width = 768;

		// Reset navigation on resize window
		function reset_nav_on_resize() {
			let $win = $(this);
			let $nav_items = $('.sidebar-navigation li');

			// Check if window is going from small to large and reset navigation states
			if (($win.width() >= mobile_width) && (trigger == false)) {

				// Only if the sub menu is not active
				$nav_items.each(function () {
					let $nav_item = $(this);
					$nav_item.removeClass(active_class);
					$nav_item.find('> a').removeClass(active_class);
				});
				$body.removeClass('js-overlay-is-active');
				$page_wrapper.removeClass(active_class);
				$sidebar.removeClass(active_class);
				trigger = true;
			}

			if (($win.width() <= mobile_width) && (trigger == true)) {
				trigger = false;
			}
		}

		// Toggle sub navigation
		function toggle_sub_nav() {
			$('.sidebar-navigation').find('> li > a:not(.not-interactive)').click(function () {
				let $win = $(window);
				let $this_nav_item = $(this);
				let $this_nav_item_sub_menu = $this_nav_item.parent('li');

				// Check if the clicked item has a sub menu, else got o the links href
				if ($this_nav_item_sub_menu.has('ul').length >= 1) {

					// Collapse all sub menus
					$('.collapse').collapse('hide');

					// Hide or show sub menu
					if ($this_nav_item.hasClass(active_class)) {
						$this_nav_item.removeClass(active_class);
						$this_nav_item.parent('li').removeClass(active_class);
						$sidebar.removeClass(active_class);


						// Hide overlay on large screens
						if ($win.width() > mobile_width) {
							$body.removeClass('js-overlay-is-active');
							$page_wrapper.removeClass(active_class);
						}
					}
					else {
						let $nav_items = $('.sidebar-navigation li');
						$nav_items.each(function () {
							let $nav_item = $(this);
							$nav_item.removeClass(active_class);
							$nav_item.find('> a').removeClass(active_class);
						});

						$this_nav_item.addClass(active_class);
						$this_nav_item.parent('li').addClass(active_class);
						$sidebar.addClass(active_class);
						$body.addClass('js-overlay-is-active');
						$page_wrapper.addClass(active_class);
					}
					return false;
				}
				else {
					return true;
				}
			});
		}

		// Toggle navigation
		function toggle_nav() {
			$('a.js-toggle-sidebar').click(function () {
				$body.addClass('js-overlay-is-active');
				$page_wrapper.toggleClass(active_class);
				return false;
			});

			$('.overlay').click(function () {
				if ($page_wrapper.hasClass(active_class)) {
					let $nav_items = $('.sidebar-navigation li');
					$nav_items.each(function () {
						var $nav_item = $(this);
						$nav_item.removeClass(active_class);
						$nav_item.find('> a').removeClass(active_class);
					});
					$body.removeClass('js-overlay-is-active');
					$page_wrapper.removeClass(active_class);
					$sidebar.removeClass(active_class);
				}
				else {
					//return true;
				}
				return false;
			});
		}

		// Hide Header on on scroll down
		function top_show_hide() {
			var didScroll;
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
					$top_account.removeClass('top-down').addClass('top-up');
				} else {
					if (st + $win.height() < $(document).height()) {
						$top_account.removeClass('top-up').addClass('top-down');
					}
				}
				lastScrollTop = st;
			}
		}
	}
};
