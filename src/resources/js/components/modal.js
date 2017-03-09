module.exports = {
	init() {
		toggle_modal();

		// Reset navigation on resize window
		function toggle_modal() {
			$('#modal-create-account').modalSteps();

			// Modals
			$('.logged-in .action-register').click(function () {
				$('#modal-login').modal();
			});

			// Hide open modals when toggle
			$('.modal').on('show.bs.modal', function (e) {
				$('.modal').modal('hide');
			});
		}
	}
};
