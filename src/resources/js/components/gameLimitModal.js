export default function() {
	function switchTo(btn, target) {
		$(btn).on('click', function() {
			$(this).closest('.modal-content').children().fadeOut();
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
			let value = $(this).closest('.modal-gameLimit__item').find('.modal-gameLimit__item-input').val();
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
			blur: function() {
			formatCurrency($(this), "blur");
			},
			focus: function() {
			formatCurrency($(this));
			}
		});


		function formatNumber(n) {
		// format number 1000000 to 1,234,567
		return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")
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

		// check for decimal
		if (input_val.indexOf(".") >= 0) {

			// get position of first decimal
			// this prevents multiple decimals from
			// being entered
			var decimal_pos = input_val.indexOf(".");

			// split number by decimal point
			var left_side = input_val.substring(0, decimal_pos);
			var right_side = input_val.substring(decimal_pos);

			// add commas to left side of number
			left_side = formatNumber(left_side);

			// validate right side
			right_side = formatNumber(right_side);

			// On blur make sure 2 numbers after decimal
			if (blur === "blur") {
			right_side += "00";
			}

			// Limit decimal to only 2 digits
			right_side = right_side.substring(0, 2);

			// join number by .
			input_val = left_side + "" + right_side + " kr";

		} else {
			// no decimal entered
			// add commas to number
			// remove all non-digits
			input_val = formatNumber(input_val);
			input_val = input_val + " kr";

			// final formatting
			if (blur === "blur") {
			input_val += "";
			}
		}

		// send updated string to input
		input.val(input_val);

		// put caret back in the right position
		var updated_len = input_val.length;
		caret_pos = updated_len - original_len + caret_pos;
		input[0].setSelectionRange(caret_pos, updated_len - 3);
		}
	}
	currencyInputInit(".modal-gameLimit input[data-type='currency']");

}