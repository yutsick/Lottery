export default function () {
	var lotteryOrderInput = $('.lottery-order-form .form-control');

	//inputs
	lotteryOrderInput.on('focus', function () {
		$(this).addClass('focused');
		$('.page-overlay').addClass('active');
	})
	lotteryOrderInput.on('blur', function () {
		$(this).removeClass('focused');

		$('.page-overlay').removeClass('active');
	});

	$('.lottery-order-form button[type="submit"]').on('click', function () {
		var th = $(this),
			thisForm = th.closest('.lottery-order-form');

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