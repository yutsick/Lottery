export default function () {
	var lotteryOrderInput = $('.lottery-order-form .input-item[required]');

	//change address
	$('.form-tab-first .change-address-btn').on('click', function () {
		$(this).closest('.address-field').hide();
		$(this).closest('.form-tabs__content').find('.address-inputs').show();
	});

	$('.form-tab-second .change-address-btn').on('click', function () {
		var th = $(this),
			thisTab = th.closest('.form-tabs__content');

		thisTab.fadeOut(300, function () {
			$('.form-tab-first').fadeIn(300, function () {
				tabsFinish = 0;
			});
		});

		$('.form-tab-first .address-field').hide();
		$('.form-tab-first .address-inputs').show();
	});

	//inputs
	function IsEmail(email) {
		var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
		return pattern.test(email)
	}

	lotteryOrderInput.on('focus change', function(){
		$(this).addClass('focused');
		$('.page-overlay').addClass('active');
		$(this).closest('.input-group').removeClass('has-error');
	})
	lotteryOrderInput.on('blur', function () {
		var lengthNum = +$(this).attr('data-length'),
			valNum = $(this).val().length;

		$(this).removeClass('focused');
		$('.page-overlay').removeClass('active');

		if ($(this).attr('data-length')) {
			if (valNum < lengthNum) {
				$(this).removeClass('filled');
			} else {
				$(this).addClass('filled');
				$(this).closest('.input-group').find('.error-message').hide();
			}
		} else if ($(this).val() === '') {
			$(this).removeClass('filled');
		} else {
			$(this).addClass('filled');
		}
	});

	$('.email-input').on('blur keyup', function () {
		var email = $(this).val();

		if (IsEmail(email)) {
			$(this).closest('.input-group').find('.error-message').hide();
			$(this).closest('.input-group').removeClass('has-error');
			$(this).addClass('filled');
		} else {
			$(this).removeClass('filled');
		}
	})

	//select
	var customSelect = $('.custom-select');

	customSelect.each(function () {
		$(this).select2({
			minimumResultsForSearch: -1
		}).data('select2').$dropdown.addClass('select-dropdown-container');
	})

	customSelect.on('select2:opening', function (e) {
		$('.page-overlay').addClass('active')
	});
	customSelect.on('select2:closing', function (e) {
		$('.page-overlay').removeClass('active')
	});


	//input mask
	var Inputmask = require('inputmask');

	var socialNumber = new Inputmask({
		placeholder: '______-____',
		mask: '9{6}-9{4}',
		showMaskOnFocus: true,
		showMaskOnHover: false,
		// clearMaskOnLostFocus: false,
		autoUnmask: true,
	});
	socialNumber.mask('.social-number-input');

	var zipCode = new Inputmask({
		placeholder: '___ __',
		mask: '9{3}-9{2}',
		showMaskOnFocus: true,
		showMaskOnHover: false,
		// clearMaskOnLostFocus: false,
		autoUnmask: true,
	});
	zipCode.mask('.zip-cod-input');

	var cardNum = new Inputmask({
		placeholder: '____ ____ ____ ____',
		mask: '9{4} 9{4} 9{4} 9{4}',
		showMaskOnFocus: true,
		showMaskOnHover: false,
		// clearMaskOnLostFocus: false,
		autoUnmask: true,
	});
	cardNum.mask('.card-number-input');

	var ccvCode = new Inputmask({
		placeholder: '___',
		mask: '9{3}',
		showMaskOnFocus: true,
		showMaskOnHover: false,
		// clearMaskOnLostFocus: false,
		autoUnmask: true,
	});
	ccvCode.mask('.ccv-code-input');

	var clearingCode = new Inputmask({
		placeholder: '____',
		mask: '9{4}',
		showMaskOnFocus: true,
		showMaskOnHover: false,
		// clearMaskOnLostFocus: false,
		autoUnmask: true,
	});
	clearingCode.mask('.clearing-input');



	//first step
	var tabsFinish = 0,
		formTab = $('.lottery-order-form').find('.form-tabs__content');

	//cart fields check
	formTab.each(function () {
		var thTab = $(this),
			btn = thTab.find('.go-payment-step');

		thTab.find('.input-item[required]').addClass('not-valid');

		function checkInput() {
			thTab.find('.input-item[required]').each(function () {
				var lengthNum = +$(this).attr('data-length'),
					valNum = $(this).val().length,
					email = $(this).val();

				if ($(this).attr('data-length')) {
					if (valNum < lengthNum) {
						$(this).addClass('not-valid');
					} else {
						$(this).removeClass('not-valid');
					}
				} else if ($(this).hasClass('.email-input') || !IsEmail(email)) {
					$(this).addClass('not-valid');
				} else if ($(this).val() !== '') {
					$(this).removeClass('not-valid')
				} else {
					$(this).addClass('not-valid')
				}
			});
		}

		setInterval(function () {
			checkInput();
			var sizeNotValid = thTab.find('.not-valid').length;
			if (sizeNotValid > 0) {
				if (btn.hasClass('btn-disabled')) {
					return false
				} else {
					btn.addClass('btn-disabled')
				}
			} else {
				btn.removeClass('btn-disabled')
			}
		}, 500);


		btn.on('click', function () {
			var th = $(this),
				thisTab = th.closest('.form-tabs__content'),
				email = thisTab.find('.email-input').val();

			if ($(this).hasClass('btn-disabled')) {
				thTab.find('.not-valid').closest('.input-group').addClass('has-error');
				thTab.find('.not-valid').closest('.input-group').find('.error-message').show();
				return false
			} else {
				thisTab.fadeOut(300, function () {
					$('.form-tab-second').fadeIn(300, function () {
						tabsFinish = 0;
					});
				});
			}
		});
	})

	//second step
	$('.go-last-step').on('click', function () {
		var th = $(this),
			thisTab = th.closest('.form-tabs__content');

		// thisTab.fadeOut(300, function () {
		// 	$('.form-tab-last').fadeIn(300, function () {
		// 		tabsFinish = 0;
		// 	});
		// });
		//
		// setTimeout(function(){
		// 	$(location).attr('href', 'http://google.com')
		// }, 5000);
	});



}