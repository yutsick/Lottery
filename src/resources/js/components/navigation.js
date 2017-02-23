module.exports = {
	init() {
		console.log('Hello navigation');
		toggle_menu();
		// toggle_menu_on_resize();

		$(window).on('resize', function () {
			// toggle_menu_on_resize();
		});

		var $body = $('body');
		var $navigation = $('#sidebar-wrapper');
		var trigger = false;

		function toggle_menu_on_resize() {
			let win = $(this);

			if ((win.width() >= 1025) && (trigger == false)) {
				$navigation.removeClass('active');
				$body.removeClass('js-noscroll');
				trigger = true;
			}

			if ((win.width() <= 1024) && (trigger == true)) {
				trigger = false;
			}
		}

		function toggle_menu() {
			$('a.menu__toggle').click( function () {
				console.log('click');
				$navigation.toggleClass('js-active');
				// $body.toggleClass('js-noscroll');
				return false;
			});
		}
	}
};
