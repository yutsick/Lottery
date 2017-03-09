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

			/* FORMS */

			// Show hide password
			$('.action-show-password').click(function () {
				let $password_button = $(this);
				let $password_input  = $password_button.parents('.input-group-btn').prev('.form-control');

				if ( $password_button.hasClass('js-is-active') ) {
					$password_input.attr('type', 'password');
					$password_button.removeClass('js-is-active');
					console.log($password_input);
				}
				else {
					$password_input.attr('type', 'text');
					$password_button.addClass('js-is-active');
				}
				return false;
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
