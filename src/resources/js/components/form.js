require('bootstrap-validator');

module.exports = {
	init() {
		form_validate();
		form_show_password();
		form_empty_input();

		function form_validate() {
			$('#create-account-modal').validator().on('submit', function (e) {
				var $form = $(this);

				if (e.isDefaultPrevented()) {
					$form.validator('validate');
				} else {
					$('#modal-create-account-step-2').modal();
				}
				return false;
			});

			$('#create-account-modal-step-2').validator().on('submit', function (e) {
				var $form = $(this);

				if (e.isDefaultPrevented()) {
					$form.validator('validate');
				} else {
					$('#modal-create-account-step-3').modal();
				}
				return false;
			});

			$('#create-account-modal-step-3').validator().on('submit', function (e) {
				var $form = $(this);

				if (e.isDefaultPrevented()) {
					$form.validator('validate');
				} else {
					$('#modal-create-account-finish').modal();
				}
				return false;
			});
		}

		function form_show_password() {
			$('.js-action-show-password').click(function () {
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
		}

		function form_empty_input() {
			$('.js-action-empty-input').click(function () {
				let $input = $(this).next();
				console.log($input);
				let $input_container = $input.parent('.inner-addon');

				$input.val('');
				$input_container.removeClass('js-has-content');
			});

			$('.inner-addon ').on('focus', '.form-control', function () {
				let $input_containers = $('.inner-addon');
				let $input = $(this);
				let $input_container = $input.parent('.inner-addon');
				let input_value = $input.val();

				if (input_value) {
					$input_containers.removeClass('js-has-content');
					$input_container.addClass('js-has-content');
				}
				else {
					$input_containers.removeClass('js-has-content');
				}
			});

			$('.inner-addon .form-control').bind('keyup', function(e) {
				let $input = $(this);
				let $input_container = $input.parent('.inner-addon');
				let input_value = $input.val();

				if (input_value) {
					$input_container.addClass('js-has-content');
				}
				else {
					$input_container.removeClass('js-has-content');
				}
			});
		}
	}
};
