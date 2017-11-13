export default function () {
	$('.table-select').select2({
		minimumResultsForSearch: Infinity,
		templateSelection: format,
		templateResult: format,
		dropdownParent: $('.responsive-table-filter')
	});

	function format(o) {
		if (!o.id) {
			return o.text;
		} else {
			return o.text;
		}
	}

	// Show selected table
	$('.table-select') .on('select2:select', function (evt) {
		var choice = evt.params.data.id;

		if (choice) {
			$('#' + choice).addClass('table-pane--active').siblings('.table-pane').removeClass('table-pane--active');
		}
	});
}