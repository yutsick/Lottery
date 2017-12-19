export default function() {

	// Get current element value, add as html on target
	$('.js-get-value').on('click', function () {
		let $value = $(this).val();
		let $target = $('.js-add-value');

		$target.html($value);
	});

}

