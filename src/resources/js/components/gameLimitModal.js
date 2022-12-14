export default function() {
	function switchTo(btn, target) {
		$(btn).on('click', function() {
			$(this).closest('.modal-content').children().hide();
			$(this).closest('.modal-content').find(target).fadeIn();
		});
	};
	switchTo('.js-gameLimitToSuccess', '.modal-gameLimit__success');
	switchTo('.js-gameLimit-sure', '.modal-gameLimit__sure');
	switchTo('.js-gameLimit-settings', '.modal-gameLimit__settings');
	switchTo('.js-gameLimit-terms', '.modal-gameLimit__terms');


	function changeContent(btn) {
		$(btn).on('click', function() {
			$(this).closest('.modal-gameLimit__item').find('.modal-gameLimit__item-text').toggle();
			$(this).closest('.modal-gameLimit__item').find('.modal-gameLimit__item-input').toggle();

			$(this).siblings('.js-gameLimit-change').toggle();
			$(this).toggle();
		});
	}
	changeContent('.js-gameLimit-change');

	function saveInput(btn) {
		$(btn).on('click', function() {

			let value = $(this).closest('.modal-gameLimit__item').find('.modal-gameLimit__item-input').val().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' kr';
			$(this).closest('.modal-gameLimit__item').find('.modal-gameLimit__item-input').val(value);
			let input = $(this).closest('.modal-gameLimit__item').find('.modal-gameLimit__item-input').attr('data-name');
			let text = $(this).closest('.modal-gameLimit__item').find('.modal-gameLimit__item-input').attr('data-text');

			let date = new Date();
			let time = `${date.getHours()}.${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;

			if(input === 'dag') {
				$(this).closest('.modal-body').find(`.modal-gameLimit__newLimits-dag`).html(`<p><b>${value}</b> per ${text} gäller&nbsp;från&nbsp;<b>${date.getDate()}/${date.getMonth() + 1}</b> kl <b>${time}</b><p>`);
			} else {
				$(this).closest('.modal-body').find(`.modal-gameLimit__newLimits-${input}`).html(`<p><b>${value}</b> per ${text} gäller&nbsp;från&nbsp;<b>${date.getDate()}/${date.getMonth() + 1}</b><p>`);
			}

			$(this).closest('.modal-body').find(`.modal-gameLimit__newLimits-${input}`).addClass('visible');
			$(this).closest('.modal-body').find('.modal-gameLimit__newLimits').slideDown();
		});
	}
	saveInput('.js-gameLimit-save');


	function currencyInputInit(input) {
		// Jquery Dependency
		$(input).on({
			keyup: function() {
			formatCurrency($(this));
			},
			focus: function() {
			formatCurrency($(this), 'blur');
			}
		});


		function formatNumber(n) {
		// format number 1000000 to 1 234 567
		return n.replace(/\D/g, "");
		}


		function formatCurrency(input, blur) {
			// appends $ to value, validates decimal side
			// and puts cursor back in right position.

			// get input value
			var input_val = input.val();

			// don't validate empty input
			if (input_val === "") { return; }

			// original length
			var original_len = input_val.length;

			// initial caret position
			var caret_pos = input.prop("selectionStart");

			input_val = formatNumber(input_val);
			// input_val = input_val + " kr";

			// send updated string to input
			input.val(input_val);

			// put caret back in the right position
				// var updated_len = input_val.length;
				// caret_pos = updated_len - original_len + caret_pos;
				// input[0].setSelectionRange(caret_pos, updated_len - 3);

			if(blur) {
				input.select();
			}
		}
	}
	currencyInputInit(".modal-gameLimit input[data-type='currency']");

	function checkInput(input) {
		$(input).on('input', function() {
			let value = parseInt($(this).val().replaceAll(' ', ''));

			if(value < 300 || !value) {
				$(this).addClass('modal-gameLimit__item-input_error');
				$(this).closest('.modal-body').find('.modal-gameLimit__error').slideDown();

				$(this).closest('.modal-gameLimit__settings').find('.js-gameLimitToSuccess').prop('disabled', true);
				$(this).closest('.modal-gameLimit__item').find('.js-gameLimit-save').prop('disabled', true);
			} else {
				$(this).removeClass('modal-gameLimit__item-input_error');
				$(this).closest('.modal-body').find('.modal-gameLimit__error').slideUp();

				$(this).closest('.modal-gameLimit__settings').find('.js-gameLimitToSuccess').prop('disabled', false);
				$(this).closest('.modal-gameLimit__item').find('.js-gameLimit-save').prop('disabled', false);
			}
		})
	}
	checkInput('.modal-gameLimit__item-input');
}