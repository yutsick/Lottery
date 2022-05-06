export default function () {
	form_validate();
	form_show_password();
	form_empty_input();
	form_active_search();
	toggle_profile_inputs();
	modalHistory();


	if ($('.my-pages').length) {
		validate_my_profile();
	}

	function modalHistory() {
		const stack = [];
		$('.btn-hash').click(function () {
			const previousModal = $(this).closest(".modal-login").attr("id");
			const previousModalAsId = `#${previousModal}`;
			stack.push(previousModalAsId);
		});


		$('.btn-back').click(function (event) {
			$(stack[stack.length - 1]).addClass("out");
			setTimeout(function () {
				$(stack[stack.length - 1]).modal();
				stack.pop();
			}, 200)
		});

		$('.modal-login button.close').click(function () {
			stack.length = 0;
		});
	}

	$('.modal-login input').focusin(function () {
		const hasError = $(this).closest('.form-group').hasClass('has-error');
		if (!hasError) {
			$(this).closest('.form-group').addClass("focused");
		}
	}).focusout(function () {
		$(this).closest('.form-group').removeClass("focused");
	});

	function form_validate() {

		$('#modal-recover-password').validator().on('submit', function (e) {
			if (e.isDefaultPrevented()) {
			} else {
				$('#modal-recover-password-options').modal();
			}
			return false;
		});

		$('#modal-recover-password-options .group-forgot-password button').on('click', function (e) {
			$('#modal-recover-password-options-success').modal();
			return false;
		});

		$('.account-form').validator().on('submit', function (e) {
			let $form = $(this);
			let $formError = $form.closest('.modal-main-center').find('.modal-main__subTitle .modal-form__error');
			let $formSuccess = $form.closest('.modal-main-center').find('.modal-main__subTitle .modal-form__success');

			if (e.isDefaultPrevented()) {
				$formSuccess.hide();
				$formError.fadeIn();
			} else {
				$formError.hide();
				$formSuccess.fadeIn();
			}
		});

		$('#create-account-modal').validator().on('submit', function (e) {
			let $form = $(this);
			let $submit = $form.find('button[type=submit]');

			if (e.isDefaultPrevented()) {
				// if invalid
			} else {
				$submit.addClass('js-is-loading');
				$('#modal-login-select').modal();
			}
			return false;
		});

		$('#login-modal').validator().on('submit', function (e) {
			let $form = $(this);
			let $submit = $form.find('button[type=submit]');

			if (e.isDefaultPrevented()) {
			// if invalid
			} else {
				$submit.addClass('js-is-loading');
			}
			return false;
		});


		$('#login-bankid-modal').validator().on('submit', function (e) {

			let $form = $(this);
			let $loading = $form.next('.modal-body__loading');
			let $error = $loading.next('.modal-body__error');

			if (e.isDefaultPrevented()) {

			} else {
				$form.addClass('hidden');
				$loading.removeClass('hidden');

				// Test error
				/*					setTimeout( function () {
				 $loading.addClass('hidden');
				 $error.removeClass('hidden');
				 }, 2000 );*/
			}
			return false;
		});

		$('.js-action-reset-journey').click(function () {
			let $error = $(this).parent('.modal-body__error');
			let $loading = $error.prev('.modal-body__loading');
			let $form = $loading.prev('.account-form');

			$loading.addClass('hidden');
			$error.addClass('hidden');
			$form.removeClass('hidden');
		});
	}

	function update_phone_placeholder($form, formDataArray) {
		// Special placeholder functionality if edit phone number.
		if ($form.find('.profile__input--phone').length) {
			let placeholder = '';

			$.each(formDataArray, function (i, object) {
				if (i > 0) {
					placeholder = placeholder + '-'
				}

				placeholder = placeholder + object.value;
			});

			if (placeholder === '-') {
				placeholder = 'Ej angivet';
			}

			$form.find('.profile__placeholder').html(placeholder);
		}
	}

	function form_active_search() {
		$('.search  .form-control').bind('keyup', function (e) {
			let $input = $(this);
			let input_value = $input.val();
			let $input_container = $input.parent('.search');

			if (input_value) {
				$input_container.addClass('js-has-content');
			} else {
				$input_container.removeClass('js-has-content');
			}
		});
	}

	function form_show_password() {
		$('.js-action-show-password').click(function () {
			let $password_button = $(this);
			let $password_input = $password_button.parents('.input-group-btn').prev('.inner-addon').find('.form-control');

			if ($password_button.hasClass('js-is-active')) {
				$password_input.attr('type', 'password');
				$password_button.removeClass('js-is-active');
			} else {
				$password_input.attr('type', 'text');
				$password_button.addClass('js-is-active');
			}

			return false;
		});
	}

	function form_empty_input() {
		$('.inner-addon .form-control').bind('keyup', function (e) {
			let $input = $(this);
			let $input_container = $input.parent('.inner-addon');
			let input_value = $input.val();

			if (input_value) {
				$input_container.addClass('js-has-content');
			} else {
				$input_container.removeClass('js-has-content');
			}
		});

		$('.inner-addon ').on('focus', '.form-control', function () {
			let $input = $(this);
			let $input_containers = $('.inner-addon');
			let $input_container = $input.parent('.inner-addon');
			let input_value = $input.val();

			if (input_value) {
				$input_containers.removeClass('js-has-content');
				$input_container.addClass('js-has-content');
			} else {
				$input_containers.removeClass('js-has-content');
			}
		});

		$('.js-action-empty-input').click(function () {
			let $input = $(this).next();
			let $input_container = $input.parent('.inner-addon');

			$input.val('');
			$input_container.removeClass('js-has-content');
		});
	}

	function toggle_profile_inputs() {
		$('.js-update-profile-row').on('click', function () {
			let $currentRow = $(this).parents('.profile__row');
			$currentRow.find('input').prop('disabled', false);
			$currentRow.find('input').last().focusTextToEnd();
			$currentRow.addClass('profile__row--active');
		});
	}

	(function ($) {
		$.fn.focusTextToEnd = function () {
			this.focus();
			let $thisVal = this.val();
			this.val('').val($thisVal);
			return this;
		}
	}(jQuery));

	let $termsOfServiceModal = $('#modal__terms-of-services');
	if($termsOfServiceModal.length > 0) {
		let $termsFrom = $termsOfServiceModal.find('form');
		if($termsFrom.length > 0) {
			$termsFrom.on('submit', function (e) {
				e.preventDefault();
				let $this = $(this);
				let formData = $this.serialize();
				let url = $this.attr('action');
				let $submitButton = $this.find('[type="submit"]');
				$submitButton.prop('disabled', true);

				$.ajax({
					type: "POST",
					url: url,
					data: formData,
					complete: () => {
						$('.modal').modal('hide');
					}
				});
				return false;
			});
		}

	}

	function validate_my_profile() {
		let msg = "This page is asking you to confirm that you want to leave - data you have entered may not be saved.";

		let unsaved = false;

		$(document).on('change', 'form[method=post]:not([data-remote]) :input', function () {
			return unsaved = true;
		});

		$(document).on('submit', 'form[method=post]', function () {
			unsaved = false;
		});

		$(window).bind('beforeunload pagehide', function (e) {
			if (unsaved) {
				return msg;
			}
		});

		$('form[data-use-ajax]').validator().on('submit', function (e) {
			if (e.isDefaultPrevented()) {

			} else {
				let $this = $(this);
				let formData = $this.serialize();
				let formDataArray = $this.serializeArray();
				let url = $this.attr('action');
				let $currentRow = $this.parents('.profile__row');
				let $submitButton = $this.find('[type="submit"]');

				// disable submit button
				$submitButton.prop('disabled', true);

				$.ajax({
					type: "POST",
					url: url,
					data: formData,
					success: function (data) {
						// stop spinner and hide form

						// disable submit button
						$submitButton.prop('disabled', false);
						$this.find('input').prop('disabled', true);

						$currentRow.removeClass('profile__row--active');
						unsaved = false;
					},
					error: function () {
						// something went wrong on the backend?
						$submitButton.prop('disabled', false);
						unsaved = false;
					},
					complete: function () {
						update_phone_placeholder($this, formDataArray);
					}
				});
			}

			return false;
		});
	}


	function checkForm(form) {
		form.each(function() {
			if($(this).find('.form-control').val() && $(this).find('.custom-checkbox:checked').length) {
				$(this).find('button[type="submit"]').removeClass('disabled');
				$(this).find('button[type="submit"]').removeAttr("disabled");
			} else {
				$(this).find('button[type="submit"]').addClass('disabled');
				$(this).find('button[type="submit"]').attr('disabled', 'disabled');
			}
		});
	}
	checkForm($('.sub-page__right-form'));

	function is_all_checkbox_and_input_filled(form) {
		$(form).find('.checkbox').on('click', function() {
			if(!$(this).find('input').prop('checked')) {
				$(this).find('input').prop('checked', true);
			} else {
				$(this).find('input').prop('checked', false);
			}
			checkForm($(this).closest('.sub-page__right-form'));
		});

		$(form).find('.form-control').on('input', function() {
			checkForm($(this).closest('.sub-page__right-form'));
		});
	}
	is_all_checkbox_and_input_filled('.sub-page__right-form');
}