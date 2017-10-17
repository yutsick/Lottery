export default function () {
	$('.js-action-register').click(function () {
		let $page = $('#page-wrapper');
		if ($page.hasClass('logged-out')) {
			$('#modal-login').modal();
		}
		else {
			return true;
		}
		return false;
	});

	// Hide open modals when toggle
	$('.modal').on('show.bs.modal', function (e) {
		$('.modal').modal('hide');
	});
}

