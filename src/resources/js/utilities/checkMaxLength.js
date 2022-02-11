export default function () {

	//Check max-length of element, if length > max = smaller font-size.
	function checkMaxLength(elem) {
		$(elem).each(function() {
			let max = $(this).data('length');
			let size = $(this).data('smaller');

			if($(this).text().length > max) {
				$(this).css('font-size', size);
			};
		})
	}

	checkMaxLength('.js-checkLength');
}

