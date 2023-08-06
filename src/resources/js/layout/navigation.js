export default function () {
	toggle_nav();
	reset_nav_on_resize();
	click_top_nav_item();
	click_sub_menu_item();
	click_sub_menu_item_collapsed();
	showHideMenu();
	if($('#user__login-credentials').length != 0){
		showPassword();
		loginBankId();
	}

	if($('#deposit').length != 0){
		activateDepositButton();
	} 

	if($('#transfer').length != 0){
		activateTransferButton();
	}
	
	if($('[data-target-screen]').length != 0){
		setTargetScreen();
	}

	$(document).ready(function(){
		let $submenu = $('.menu__list-item.submenu');
		newMenuToggle($submenu);

		window.addEventListener("resize", mainHeight);
		mainHeight();



	});
	
	const mainHeight = () => {
		const elem = $('#nav-new .main-content');
		$(elem).css('height', `${Math.max(document.body.scrollHeight, document.body.offsetHeight, window.innerHeight)}px`); 

	};

	


	$(window).on('resize', function () {
		reset_nav_on_resize();
	});

	let $body = $('body');
	let $page_wrapper = $('#page-wrapper');
	let $sidebar = $('#sidebar');
	let $nav = $('.sidebar-navigation');
	let $nav_items = $('.sidebar-navigation li');
	let active_class = 'js-is-active';
	let navigation_trigger = false;
	let mobile_width = 767;
	

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
					} else {
						toggle_sub_menu('close');
					}
					$this.removeClass(active_class);
					$this.parent('li').removeClass(active_class);
				} else {
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
		$('.sidebar-navigation').find('li.has-sub-menu ul a:not(.not-interactive):not(.collapsed)').click(function () {
			let $this = $(this);
			let link_href = $this.attr('href');

			if (link_href) {
				let hash = '#' + link_href.replace(/^.*?(#|$)/, '');
				let $section = $(hash);
				if ($section.length) {
					toggle_sub_menu('close');
					scroll_to_section($section);
					return false;
				}
			}
		});
	}

	// Click sub menu item with hash and scroll to section
	function click_sub_menu_item_collapsed() {
		$('.sidebar-navigation').find('li.has-sub-menu a[data-toggle="collapse"]').click(function () {
			let $collapsed = $sidebar.find('.collapse');

			$collapsed.each(function () {
				let $this = $(this);
				if (!$this.hasClass('collapsed')) {
					$this.collapse('hide');
				}
			})
		});
	}

	function scroll_to_section(section) {
		let $top = $('.top-menu');
		let top_height = 0;

		if ($top.is(':visible')) {
			top_height = parseInt($top.outerHeight());
		}

		let section_top = parseInt(section.offset().top);

		$('body,html').animate({
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
		} else if (state_navigation == 'open') {
			$page_wrapper.addClass(active_class);
			$body.addClass('js-overlay-is-active');
		}

		// Collapse all sub menus
		$sidebar.find('.collapse').collapse('hide');

		if (state_sidebar == 'active') {
			$sidebar.addClass(active_class);
			$nav.addClass('js-active-sidebar');
		} else {
			$sidebar.removeClass(active_class);
			$nav.removeClass('js-active-sidebar');
		}
	}

	function newMenuToggle($submenu){
		
		$submenu.on('click', function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active')
			} else {
				$submenu.removeClass('active');
				$(this).addClass('active');
			}
			
		})
		
	}

	// show / hide password

	function showPassword(){
		const passwordInput = document.querySelector('#user_pass');
		const emailInput = document.querySelector('#user_email');
		const passInput = document.querySelector('#user_pass');
		const eyeIcon = document.querySelector('.pass-icon');
		const emailErrorTooltip = document.querySelector('.error-tooltip.email-error');
		const passErrorTooltip = document.querySelector('.error-tooltip.pass-error');
		const login = document.querySelector('#login');
		const loader = document.querySelector('#login .loader');
		const accepted = document.querySelector('#login .approved');
		const declined = document.querySelector('#login .declined');
		login.addEventListener('click', () => {
			$(loader).show();
			$(declined).hide();
			$(accepted).hide();
			setTimeout(() => {
				if (emailInput.value == 'error'){
					emailErrorTooltip.style.display ='block';
					emailInput.classList.add('error');
					$(loader).hide();
					$(declined).show();

				} 
				if (passInput.value == 'error'){
					passErrorTooltip.style.display ='block';
					passInput.classList.add('error');
					$(loader).hide();
					$(declined).show();

			} 
			if (passInput.value != 'error' && emailInput.value != 'error') {

					$(loader).hide();
					$(accepted).show();
				}
			}, 1000)
			//email error
			
		});



		// eye icon visibility
		passwordInput.addEventListener('input', () => {
			if (passwordInput.value.length > 0) {
				eyeIcon.style.display = 'block';
			} else {
				eyeIcon.style.display = 'none';
			}
		});

		// password visibility
		eyeIcon.addEventListener('click', () => {
			if (passwordInput.type === 'password') {
				passwordInput.type = 'text';
				eyeIcon.classList.add('show-password');
			} else {
				passwordInput.type = 'password';
				eyeIcon.classList.remove('show-password');
			}
		})
	}



	function activateTransferButton (){
		const emptyField = document.querySelector('#transfer #user_transfer');
		const btnDisabled = document.querySelector('#transfer .transfer .btn__disabled');
		const btnEnabled = document.querySelector('#transfer .transfer .btn__enabled');

		emptyField.addEventListener('input', () => {
			if (emptyField.value.length > 0){
				$(btnDisabled).hide();
				$(btnEnabled).show();
			} else {
				$(btnDisabled).show();
				$(btnEnabled).hide();
			}
		})
	};

	function activateDepositButton (){
		const depositStart = document.querySelector('#deposit');
		const emptyField = document.querySelector('#user_depo');

		const buttonStateZero = document.querySelector('#deposit [data-button-state = "0"]');
		const buttonStateOne = document.querySelector('#deposit [data-button-state = "1"]');
		const buttonStateTwo = document.querySelector('#deposit [data-button-state = "2"]');
		const buttonStateThree = document.querySelector('#deposit [data-button-state = "3"]');
		const depositDone = document.querySelector('#deposit__done');

		emptyField.addEventListener('input', () => {
			if (emptyField.value.length > 0){
				$(buttonStateZero).hide();
				$(buttonStateOne).show();
			} else {
				$(buttonStateZero).show();
				$(buttonStateOne).hide();
			}
		})

		$(buttonStateOne).on('click', () => {
			$(buttonStateOne).hide();
			$(buttonStateTwo).show();
			setTimeout(() => {
				$(buttonStateTwo).hide();
				$(buttonStateThree).show();

				setTimeout(() => {
					$(depositStart).hide();
					$(depositDone).show();
					
				}, 1500)

			}, 1000)
		})
	}

	function setTargetScreen(){
		$('[data-target-screen]').on('click', function(){
			$($(this).data('current-screen')).fadeTo('slow',0);
			$($(this).data('current-screen')).hide();
			$($(this).data('target-screen')).fadeTo('slow',1);
		})
	}

	function showHideMenu(){
		$('.user__icon').on('click', () => {
			//$('#user-menu').show();
			if($('#user-menu').hasClass('open')){
				$('#user-menu').removeClass('open');
			} else {
				$('#user-menu').addClass('open');
			}
			
		})

		$('.close-user-menu').on('click', () => {
				$('#user-menu').removeClass('open');
				//$('#user-menu').hide();
		})

		$('button.toggle-nav').on('click', () => {
			$('.side-menu').toggleClass('open');
		})
	}

	function loginBankId(){
		$('[data-target-screen="#user__login-bank-id" ]').on('click', () => {
			$('#user__login-bank-id .bank-loader').show();
			$('#user__login-bank-id .accepted').hide();
			$('#user__login-bank-id .declined').hide();
			setTimeout(() => {
				$('#user__login-bank-id .bank-loader').hide();
				$('#user__login-bank-id .accepted').show();
				setTimeout (() => {
					$('#user__login-bank-id .accepted').hide();
					$('#user__login-bank-id .declined').show();
				}, 1000)
			}, 1000)
		})
		
	}
}

