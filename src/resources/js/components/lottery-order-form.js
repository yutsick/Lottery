export default function () {
	var lotteryOrderInput = $('.lottery-order-form .form-control'),
		submitButton = $('.lottery-order-form').find('[type="submit"]'),
		tabsFinish = 0;

	//change address
	$('.form-tab-first .change-address-btn').on('click', function () {
		$(this).closest('.address-field').hide();
		$(this).closest('.form-tabs__content').find('.address-inputs').show();
		$('.form-tab-first .address-inputs .form-control').prop('required', true);
		checkFirsStep();
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
		$('.page-overlay').addClass('active');
	});
	customSelect.on('select2:closing', function (e) {
		$('.page-overlay').removeClass('active')
	});
	customSelect.on('select2:select', function (e) {
		checkSecondStep();
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

			setTimeout(function () {
				accItem.find('.form-control').each(function () {
					$(this).prop('required', false);
					$(this).prop('disabled', true);
					// $(this).val('').removeClass('filled');
				});
				thisAccItem.find('.form-control').each(function () {
					$(this).prop('required', true);
					$(this).prop('disabled', false);
				});
				customSelect.each(function () {
					$(this).val('').trigger('change');
					$(this).next('.select2').removeClass('choice-done')
				})
				accItem.find('.form-group').removeClass('has-feedback').removeClass('has-success');
				thisAccItem.find('.form-group').addClass('has-feedback');
				checkSecondStep();
			})
		}
	});

	//first step
	function checkFirsStep() {
		var numRequiredInputs = $('.form-tab-first .form-control[required]').length,
			numFilledInputs = $('.form-tab-first .form-control[required]').closest('.form-group.has-success').length;

		if (numFilledInputs !== 0 && numFilledInputs === numRequiredInputs) {
			$('.go-payment-step').removeClass('disabled');
		} else {
			$('.go-payment-step').addClass('disabled');
		}
	}

	$('.form-tab-first .form-control').on('keyup focus', function () {
		checkFirsStep();
	});

	$('.go-payment-step').on('click', function () {
		var th = $(this),
			thisTab = th.closest('.form-tabs__content');

		tabsFinish = 1;

		if (th.hasClass('disabled')) {
			submitButton.trigger('click');
			th.closest('.form-tabs__content').find('.form-info-text').hide();
			th.closest('.form-tabs__content').find('.form-error-text').show();
		} else {
			th.closest('.form-tabs__content').find('.form-info-text').show();
			th.closest('.form-tabs__content').find('.form-error-text').hide();
			thisTab.fadeOut(300, function () {
				$('.form-tab-second').fadeIn(300, function () {
					tabsFinish = 0;
					$(this).find('.form-group').removeClass('has-error').removeClass('has-danger');
				});
			});
			$('.form-tab-second').find('.form-group').removeClass('has-error').removeClass('has-danger');
			$('.form-tab-second').find('.form-group .with-errors .list-unstyled').hide();
		}
	});

	//second step
	function checkSecondStep() {
		var numRequiredInputs = $('.form-tab-second .form-control[required]').length,
			numFilledInputs = $('.form-tab-second .form-control[required]').closest('.form-group.has-success').length;

		if (numFilledInputs === numRequiredInputs) {
			$('.go-last-step').removeClass('disabled');
		} else {
			$('.go-last-step').addClass('disabled');
		}
	}

	$('.form-tab-second .form-control').on('keyup focus', function () {
		checkSecondStep();
	});

	$('.go-last-step').on('click', function () {
		var th = $(this),
			thisTab = th.closest('.form-tabs__content');

		if (th.hasClass('disabled')) {
			th.closest('.form-tabs__content').find('.form-info-text').hide();
			th.closest('.form-tabs__content').find('.form-error-text').show();
		} else {
			th.closest('.form-tabs__content').find('.form-info-text').show();
			th.closest('.form-tabs__content').find('.form-error-text').hide();
			thisTab.fadeOut(300, function () {
				$('.form-tab-last').fadeIn(300, function () {
					tabsFinish = 0;
				});
			});
			setTimeout(function(){
				$('.lottery-order-form .show-modal').trigger('click');
			}, 4000);
		}
		submitButton.trigger('click');
	});

	$('.lottery-order-form').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {

		} else {
			let $this = $(this);
			let formData = $this.serialize();
			let formDataArray = $this.serializeArray();
			let url = $this.attr('action');

			$.ajax({
				type: "POST",
				url: url,
				data: formData,
				success: function (data) {
				},
				error: function () {

				},
				complete: function () {

				}
			});
		}

		return false;
	});
}