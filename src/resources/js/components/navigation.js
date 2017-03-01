module.exports = {
	init() {
		toggle_nav();
		reset_nav_on_resize();
		toggle_sub_nav();

		$(window).on('resize', function () {
			reset_nav_on_resize();
		});

		var $page_wrapper = $('#page-wrapper');
		var active_class = 'js-is-active';
		var trigger = false;

		function reset_nav_on_resize() {
			let win = $(this);
			let $nav_items = $('.sidebar-navigation li');

			// Check if window is going from small to large and reset navigation states
			if ((win.width() >= 480) && (trigger == false)) {

				// Only if the sub menu is not active
				if (!$nav_items.hasClass('js-is-active')) {
					$page_wrapper.removeClass(active_class);
					trigger = true;
				}
			}

			if ((win.width() < 480) && (trigger == true)) {
				trigger = false;
			}
		}

		function toggle_sub_nav() {
			$('.sidebar-navigation').find('> li > a:not(.not-interactive)').click(function () {

				let $this_nav_item = $(this);
				let $this_nav_item_sub_menu = $this_nav_item.parent('li');

				// Check if the clicked item has a sub menu, else got o the links href
				if ($this_nav_item_sub_menu.has('ul').length >= 1)	 {

					// Hide or activate it
					if ($this_nav_item.hasClass(active_class)) {
						$this_nav_item.removeClass(active_class);
						$this_nav_item.parent('li').removeClass(active_class);
						$page_wrapper.removeClass(active_class);
					}
					else {
						let $nav_items = $('.sidebar-navigation li');

						$nav_items.each( function () {
							var $nav_item = $(this);
							$nav_item.removeClass(active_class);
							$nav_item.find('> a').removeClass(active_class);
						});

						$this_nav_item.addClass(active_class);
						$this_nav_item.parent('li').addClass(active_class);
						$page_wrapper.addClass(active_class);
					}
					return false;
				}
				else {
					return true;
				}

			});
		}

		function toggle_nav() {
			$('a.top-menu__toggle').click(function () {
				$page_wrapper.toggleClass(active_class);
				return false;
			});

			$('.overlay').click(function () {
				if ($page_wrapper.hasClass(active_class)) {
					let $nav_items = $('.sidebar-navigation li');
					$nav_items.each( function () {
						var $nav_item = $(this);
						$nav_item.removeClass(active_class);
						$nav_item.find('> a').removeClass(active_class);
					});
					$page_wrapper.removeClass(active_class);
				}
				else {
					//return true;
				}
				return false;
			});
		}
	}
};
