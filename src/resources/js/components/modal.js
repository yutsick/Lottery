require('bootstrap-validator');

module.exports = {
	init() {
		toggle_modal();

		// Reset navigation on resize window
		function toggle_modal() {

			// Modals
			$('.logged-in .action-register').click(function () {
				$('#modal-login').modal();
			});

			// Hide open modals when toggle
			$('.modal').on('show.bs.modal', function (e) {
				$('.modal').modal('hide');
			});

			// Submit
			$('.modal-body__form').validator().on('submit', function (e) {
				if (e.isDefaultPrevented()) {
					console.log('Something is wrong');
					return false;
				} else {
					$('.modal').modal('hide');
					console.log('Everything is good');
					return false;
				}
			});
		}
	}
};
