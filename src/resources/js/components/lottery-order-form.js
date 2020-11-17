export default function () {
	var lotteryOrderInput = $('.lottery-order-form .form-control'),
		tabsFinish = 0;

	//back to first step
	$('.lottery-order-form .go-first-step').on('click', function () {
		var th = $(this),
			thisTab = th.closest('.form-tabs__content');

		thisTab.fadeOut(300, function () {
			$('.form-tab-first').fadeIn(300, function () {
				tabsFinish = 0;
			});
		});
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
	var customSelect = $('.lottery-order-form select'),
		customSelect2 = $('.choose-bankid-device select');

	customSelect.each(function () {
		var th = $(this);

		th.select2({
			minimumResultsForSearch: -1
		}).data('select2').$dropdown.addClass('select-dropdown-container');

		th.on("select2:select", function() {
			th.next('.select2').addClass('choice-done');
		});
	})

	customSelect2.each(function () {
		var th = $(this);

		th.select2({
			minimumResultsForSearch: -1
		}).data('select2').$dropdown.addClass('select-dropdown-container-2');
	})


	customSelect.on('select2:opening', function (e) {
		$('.page-overlay').addClass('active');
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

			setTimeout(function () {
				accItem.find('.form-control').each(function () {
					$(this).prop('required', false);
					$(this).prop('disabled', true);
				});
				thisAccItem.find('.form-control').each(function () {
					$(this).prop('required', true);
					$(this).prop('disabled', false);
				});
				accItem.find('select').each(function () {
					$(this).val('').trigger('change');
					$(this).next('.select2').removeClass('choice-done')
				})
				accItem.find('.form-group').removeClass('has-feedback').removeClass('has-success');
				thisAccItem.find('.form-group').addClass('has-feedback');
			})
		}
	});

	//first step
	$('.go-delivery-step').on('click', function () {
		var th = $(this),
			thisTab = th.closest('.form-tabs__content');

		tabsFinish = 1;

		if (th.hasClass('disabled')) {
			th.closest('.form-tabs__content').find('.form-info-text').hide();
			th.closest('.form-tabs__content').find('.form-error-text').show();
		} else {
			th.closest('.form-tabs__content').find('.form-info-text').show();
			th.closest('.form-tabs__content').find('.form-error-text').hide();
			thisTab.fadeOut(300, function () {
				$('.form-tab-second').fadeIn(300, function () {
					tabsFinish = 0;
				});
			});
		}
	});

	//second step
	function checkDelivery() {
		if ($('#tickets-digitally').is(':checked')) {
			$('.payment-by-invoice').hide();
		} else {
			$('.payment-by-invoice').show();
		}
	}
	checkDelivery();

	$('.form-tab-second .custom-radio__input').on('change', function () {
		checkDelivery();
	});

	$('.go-payment-step').on('click', function () {
		var th = $(this),
			thisTab = th.closest('.form-tabs__content');

		tabsFinish = 1;

		if (th.hasClass('disabled')) {

		} else {
			thisTab.fadeOut(300, function () {
				$('.form-tab-third').fadeIn(300, function () {
					tabsFinish = 0;
					$(this).find('.form-group').removeClass('has-error').removeClass('has-danger');
				});
			});
			$('.form-tab-third').find('.form-group').removeClass('has-error').removeClass('has-danger');
			$('.form-tab-third').find('.form-group .with-errors .list-unstyled').hide();
		}
	});


	//third step
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
	});

	//order form simple
	$('.lottery-order-form-simple button[type="submit"]').on('click', function () {
		var th = $(this),
			thisForm = th.closest('.lottery-order-form-simple');

		if (th.hasClass('disabled')) {
			thisForm.find('.form-info-text').hide();
			thisForm.find('.form-error-text').show();
		} else {
			thisForm.find('.form-info-text').show();
			thisForm.find('.form-error-text').hide();
			th.closest('.product-single').hide();
			$('.s-lottery-selection-detail').addClass('message-visible');
		}
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