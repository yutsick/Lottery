export default function () {
	$('.js-action-register').click(function () {
		let $page = $('#page-wrapper');
		if ($page.hasClass('logged-out')) {
			$('#modal-login').modal();
		} else {
			return true;
		}
		return false;
	});

	// Hide open modals when toggle.
	$('.modal').on('show.bs.modal', function (e) {
		$('.modal').modal('hide');
	});

	// Reset modal-pages and inputs on opening.
	$('.modal#modal-payment-method').on('show.bs.modal', function (e) {
		let $modal = $(this);
		let $modalPages = $modal.find('.modal-page');

		$modalPages.removeClass('modal-page--active');
		$modalPages.first().addClass().addClass('modal-page--active');

		$modal.find('form').trigger('reset');
	});

	// Modal-pages functionality.
	$('.js-change-modal-page').on('click', function () {
		let $this = $(this);
		let $modal = $this.parents('.modal');
		let page = $this.data('modal-page');
		let $modalPages = $modal.find('.modal-page');

		$modalPages.removeClass('modal-page--active');

		$modal.find('#' + page).addClass('modal-page--active');
	})
}