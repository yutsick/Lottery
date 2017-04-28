export default function () {
	toggle_nav();
	reset_nav_on_resize();
	click_top_nav_item();
	click_sub_menu_item();

	$(window).on('resize', function () {
		reset_nav_on_resize();
	});

	let $body = $('body');
	let $page_wrapper = $('#page-wrapper');
	let $sidebar = $('#sidebar');
	let $nav_items = $('.sidebar-navigation li');
	let active_class = 'js-is-active';
	let navigation_trigger = false;
	let mobile_width = 768;

	// Reset navigation on resize window
	function reset_nav_on_resize() {
		let $window = $(window);

		// Check if window is going from small to large and reset navigation states
		if (($window.width() >= mobile_width) && (navigation_trigger == false)) {
			toggle_sub_menu('close');
			navigation_trigger = true;
		}

		if (($window.width() < mobile_width) && (navigation_trigger == true)) {
			navigation_trigger = false;
		}
	}

	// Toggle sub navigation
	function click_top_nav_item() {
		$('.sidebar-navigation').find('> li > a:not(.not-interactive)').click(function () {
			let $this = $(this);
			let $this_sub_menu = $this.parent('li').find('ul');
			let window_width = $(window).width();

			// Check if the clicked item has a sub menu, else got to the links href
			if ($this_sub_menu.length >= 1) {
				// Close or open sub menu
				if ($this.hasClass(active_class)) {
					if (window_width <= mobile_width) {
						toggle_sub_menu();
					}
					else {
						toggle_sub_menu('close');
					}
					$this.removeClass(active_class);
					$this.parent('li').removeClass(active_class);
				}
				else {
					toggle_sub_menu('open', 'active');
					$this.addClass(active_class);
					$this.parent('li').addClass(active_class);
				}

				return false;
			}
		});
	}

	// Toggle navigation
	function toggle_nav() {
		$('a.js-toggle-sidebar').click(function () {
			toggle_sub_menu('open');
			return false;
		});

		$('.overlay').click(function () {
			if ($page_wrapper.hasClass(active_class)) {
				toggle_sub_menu('close');
			}
			return false;
		});
	}

	// Click sub menu item with hash and scroll to section
	function click_sub_menu_item() {
		$('.sidebar-navigation').find('li.has-sub-menu a:not(.not-interactive):not(.collapsed)').click(function () {
			let $this = $(this);
			let link_href = $this.attr('href');
			let $section = $(link_href);

			if (/^#/.test(link_href) === true) {
				if ($section.length) {
					toggle_sub_menu('close');
					scroll_to_section($section);
					return false;
				}
			}
		});
	}

	function scroll_to_section(section) {
		let $top = $('.top-menu');
		let top_height = 0;
		if ($top.is(':visible')) {
			top_height = parseInt($top.outerHeight())
		}
		;

		let section_top = parseInt(section.offset().top);

		$('body').animate({
			scrollTop: section_top - top_height
		}, {
			easing: 'swing',
			duration: 'slow'
		});
	}

	function toggle_sub_menu(state_navigation, state_sidebar) {
		$nav_items.removeClass(active_class);
		$nav_items.find('> a').removeClass(active_class);

		if (state_navigation == 'close') {
			$body.removeClass('js-overlay-is-active');
			$page_wrapper.removeClass(active_class);

			// Collapse all sub menus
			$sidebar.find('.collapse').collapse('hide');
		}
		else if (state_navigation == 'open') {
			$page_wrapper.addClass(active_class);
			$body.addClass('js-overlay-is-active');
		}

		if (state_sidebar == 'active') {
			$sidebar.addClass(active_class);
		}
		else {
			$sidebar.removeClass(active_class);
		}
	}
}

