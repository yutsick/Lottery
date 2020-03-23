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

	$('.modal-login').on('shown.bs.modal', function (e) {
		$('.modal-backdrop').addClass('modal-backdrop-login');
	});

	// Hide open modals when toggle.
	$('.modal').on('show.bs.modal', function (e) {
		$('.modal').modal('hide');
	});

	// Modal-pages functionality.
	$('.js-change-modal-page').on('click', function () {
		let $this = $(this);
		let $modal = $this.parents('.modal');
		let page = $this.data('modal-page');
		let $modalPages = $modal.find('.modal-page');

		$modalPages.removeClass('modal-page--active');

		$modal.find('#' + page).addClass('modal-page--active');
	});


	let $termsOfServiceModal = $('#modal__terms-of-services');
	if($termsOfServiceModal.length > 0) {
		let openedByDefault = $termsOfServiceModal.data('opened-by-default');
		if(openedByDefault){
			$termsOfServiceModal.modal('show');
		}
	}
}