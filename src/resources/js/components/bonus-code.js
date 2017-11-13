export default function () {
	if ($('.bonus-code').length) {
		$('#bonus-code-form').validator().on('submit', function (e) {
			if (e.isDefaultPrevented()) {
			} else {
				let $this = $(this);
				let formData = $this.serialize();
				let url = $this.attr('action');
				let method = $this.attr('method');
				let $submitButton = $this.find('[type="submit"]');

				// disable submit button
				$submitButton.prop('disabled', true);
				$this.find('input').prop('disabled', true);

				$.ajax({
					type: method,
					url: url,
					data: formData,
					success: function (data) {
						// disable submit button
						$submitButton.prop('disabled', false);
						$this.find('input').prop('disabled', false);

						$('.bonus-code__message').hide();

						if (data.d.BRSuccess) {
							$('.bonus-code__success').show();
							$('.bonus-code__form').hide();
						} else {
							$('.bonus-code__error').show();
						}

					},
					error: function () {
						// something went wrong on the backend?
						$submitButton.prop('disabled', false);
					},
					complete: function () {
					}
				});
			}
			return false;
		});

		$('.js-another-bonus-code').on('click', function () {
			$('#bonus-code-form').trigger('reset');
			$('.bonus-code__form').show();
			$('.bonus-code__message').hide();
		});
	}
}