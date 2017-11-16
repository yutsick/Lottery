export default function () {
	// Reset modal-pages and inputs on opening.
	$('.modal#modal-payment-method').on('show.bs.modal', function (e) {
		let $modal = $(this);
		let $modalPages = $modal.find('.modal-page');

		$modalPages.removeClass('modal-page--active');
		$modalPages.first().addClass().addClass('modal-page--active');

		$modal.find('form').trigger('reset');
		$modal.find('form :submit').addClass('disabled');
	});

	// Add subscription ID to subscription payment forms when modal has opened.
	$('.js-open-subscription-modal').on('click', function () {
		let subscriptionId = $(this).data('subscription-id');
		let modalTarget = $(this).data('target');
		let $modal = $(modalTarget);

		$modal.find('form').data('subscription-id', subscriptionId);
	});

	// Update form action and appends the id of the subscription to the URL.
	$('#modal-payment-method form').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
		} else {
			let $form = $(this);
			let subscriptionId = $form.data('subscription-id');
			let action = $form.attr('action');

			$form.attr('action', action + subscriptionId);
		}
	});
}