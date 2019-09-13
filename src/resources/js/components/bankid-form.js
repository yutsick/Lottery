export default function () {
	if ($('.form-bankID').length) {
		$('.form-bankID').validator().on('submit', function (e) {
			e.preventDefault();
			let valid = isValid(this[0].value);

			if(valid) {
				$(this).unbind('submit').submit()
			} else {
				addErrorMsg(this);
			}

		});
		const pattern = /^\d{6}(\d{2})?[+-]?\d{4}$/;

		function hasValidDate(input) {
			let [_, yearStr, monthStr, dayStr] = /^(\d{2})(\d{2})(\d{2})/.exec(input);

			const year = Number(yearStr);
			const month = Number(monthStr) - 1;
			let day = Number(dayStr);

			if (day > 60) { // coordination numbers ("samordningsnummer")
				day -= 60;
			}

			const date = new Date(year, month, day);

			const yearIsValid = String(date.getFullYear()).substr(-2) === yearStr;
			const monthIsValid = date.getMonth() === month;
			const dayIsValid = date.getDate() === day;

			return yearIsValid && monthIsValid && dayIsValid;
		}

		function isValid(input) {
			if (!pattern.test(input)) {
				return false;
			}
			const cleaned = input.replace(/[+-]/, '').slice(-10);
			return hasValidDate(cleaned);
		}

		function addErrorMsg(form) {
			let msg = $(form).siblings('.form-bankID__msg');
			msg.text('Detta är inte en korrekt personnummer, se att du har skrivit rätt och försök igen.');
		}
	}

}

