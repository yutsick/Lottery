module.exports = {
	init() {
		toggle_menu();
		toggle_menu_on_resize();

		$(window).on('resize', function () {
			toggle_menu_on_resize();
		});

		var $page_wrapper = $('#page-wrapper');
		var trigger = false;

		function toggle_menu_on_resize() {
			let win = $(this);

			if ((win.width() >= 480) && (trigger == false)) {
				$page_wrapper.removeClass('js-navigation-active');
				trigger = true;
			}

			if ((win.width() < 480) && (trigger == true)) {
				trigger = false;
			}
		}

		function toggle_menu() {
			$('a.menu__toggle, #logotype').click( function () {
				$page_wrapper.toggleClass('js-navigation-active');
				return false;
			});
		}
	}
};
