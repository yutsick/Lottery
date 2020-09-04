export default function () {
	var lotteryOrderInput = $('.lottery-order-form .form-control'),
		submitButton = $('.lottery-order-form').find('[type="submit"]'),
		tabsFinish = 0;

	//change address
	$('.form-tab-first .change-address-btn').on('click', function () {
		$(this).closest('.address-field').hide();
		$(this).closest('.form-tabs__content').find('.address-inputs').show();
		$('.form-tab-first .address-inputs .form-control').prop('required', true);
		$('.form-tab-first .address-inputs .form-control')[0].focus();
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
		$('.form-tab-first .address-inputs .form-control').prop('required', true);
		$('.form-tab-first .address-inputs .form-control')[0].focus();
		checkFirsStep();
	});

	//inputs
	lotteryOrderInput.on('focus', function () {
		$(this).addClass('focused');
		$('.page-overlay').addClass('active');
	})
	lotteryOrderInput.on('blur', function () {
		$(this).removeClass('focused');

		$('.page-overlay').removeClass('active');

		if ($(this).val() === '') {
			$(this).removeClass('filled');
		} else {
			$(this).addClass('filled');
		}
	});

	//select
	var customSelect = $('.lottery-order-form select');

	customSelect.each(function () {
		var th = $(this);

		th.select2({
			minimumResultsForSearch: -1
		}).data('select2').$dropdown.addClass('select-dropdown-container');

		th.on("select2:select", function() {
			th.next('.select2').addClass('choice-done');
		});
	})

	customSelect.on('select2:opening', function (e) {
		$('.page-overlay').addClass('active')
	});
	customSelect.on('select2:closing', function (e) {
		$('.page-overlay').removeClass('active')
	});


	//accordion
	$('.lottery-order-form .acc-title').on('click', function (){
		var th = $(this),
			accBlock = th.closest('.acc-second'),
			accTitle = accBlock.find('.acc-title'),
			accBody = accBlock.find('.acc-body'),
			accItem = th.closest('.acc-second').find('.acc-item'),
			thisAccItem = th.closest('.acc-item');

		if (!th.hasClass('active')) {
			accTitle.removeClass('active');
			accBody.slideUp(300);
			th.addClass('active');
			th.closest('.acc-item').find('.acc-body').slideDown(300);
			accItem.find('.form-control').prop('required', false);
			// accItem.find('.form-control').prop('disabled', false);
			thisAccItem.find('.form-control').prop('required', true);
			// thisAccItem.find('.form-control').prop('disabled', true);
		}
	});

	//first step
	function checkFirsStep() {
		setTimeout(function () {
			var numRequiredInputs = $('.form-tab-first .form-control[required]').length,
				numFilledInputs = $('.form-tab-first .form-control[required]').closest('.form-group.has-success').length;

			if (numFilledInputs !== 0 && numFilledInputs === numRequiredInputs) {
				$('.go-payment-step').removeClass('disabled');
			} else {
				$('.go-payment-step').addClass('disabled');
			}
		}, 500)
	}

	$('.form-tab-first .form-control').on('keyup focus', function () {
		checkFirsStep();
	});

	$('.go-payment-step').on('click', function () {
		var th = $(this),
			thisTab = th.closest('.form-tabs__content');

		tabsFinish = 1;

		if ($(this).hasClass('disabled')) {
			submitButton.trigger('click');
			return false
		} else {
			thisTab.fadeOut(300, function () {
				$('.form-tab-second').fadeIn(300, function () {
					tabsFinish = 0;
				});
			});
		}
	});

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