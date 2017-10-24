export default function () {
	form_validate();
	form_show_password();
	form_empty_input();
	form_active_search();

	function form_validate() {
		$('#create-account-modal').validator().on('submit', function (e) {
			if (e.isDefaultPrevented()) {
			} else {
				$('#modal-create-account-step-2').modal();
			}
			return false;
		});

		$('#create-account-modal-step-2').validator().on('submit', function (e) {
			if (e.isDefaultPrevented()) {
			} else {
				$('#modal-create-account-step-3').modal();
			}
			return false;
		});

		$('#create-account-modal-step-3').validator().on('submit', function (e) {
			if (e.isDefaultPrevented()) {
			} else {
				$('#modal-create-account-final').modal();
			}
			return false;
		});

		$('#login-modal').validator().on('submit', function (e) {
			let $form = $(this);
			let $submit = $form.find('button[type=submit]');

			if (e.isDefaultPrevented()) {
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

	function form_active_search() {
		$('.search  .form-control').bind('keyup', function (e) {
			let $input = $(this);
			let input_value = $input.val();
			let $input_container = $input.parent('.search');

			if (input_value) {
				$input_container.addClass('js-has-content');
			}
			else {
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
			}
			else {
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
			}
			else {
				$input_container.removeClass('js-has-content');
			}
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

		$('.js-action-empty-input').click(function () {
			let $input = $(this).next();
			let $input_container = $input.parent('.inner-addon');

			$input.val('');
			$input_container.removeClass('js-has-content');
		});
	}




    function checkPasswordMatch() {
        var password = $(".password").val();
        var confirmPassword = $(".passwordconfirm").val();

        if (password != confirmPassword)
            $("#divCheckPasswordMatch").html("Lösenorden matchar ej!");
        else
            $("#divCheckPasswordMatch").html("");
    }

    $(document).ready(function () {
        $(".passwordconfirm").keyup(checkPasswordMatch);
    });




    $(document).ready(function () {
        $('.edit-button').click(function () {
            var currentTD = $(this).parents('tr').find('td');
            if ($(this).html() == 'Ändra') {
                $(this).addClass('edit-button-toggle');
                currentTD = $(this).parents('tr').find('td');
                $.each(currentTD, function () {
                    $(this).prop('contenteditable', true);
                });
            } else {
                $(this).removeClass('edit-button-toggle');
                $.each(currentTD, function () {
                    $(this).prop('contenteditable', false);
                });
            }
            $(this).html($(this).html() == 'Ändra' ? 'Spara' : 'Ändra');

        });

    });






    $(document).ready(function () {
        $('.edit-button1').click(function () {
            var currentTD = $(this).parents('tr').find('td');
            if ($(this).html() == 'Ändra') {
                $(this).addClass('edit-button-toggle');
                currentTD = $(this).parents('tr').find('td');
                $.each(currentTD, function () {
                    $(this).prop('contenteditable', true);
                    $('.clearingnr').prop('contenteditable', true);
                    $('.konto').prop('contenteditable', true);
                    $('.text').prop('contenteditable', true);

                });
            } else {
                $(this).removeClass('edit-button-toggle');
                $.each(currentTD, function () {
                    $(this).prop('contenteditable', false);
                    $('.clearingnr').prop('contenteditable', false);
                    $('.konto').prop('contenteditable', false);
                    $('.text').prop('contenteditable', false);
                });
            }
            $(this).html($(this).html() == 'Ändra' ? 'Spara' : 'Ändra');

        });

    });

}

