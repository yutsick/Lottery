export default function () {
	function showOrHideAction($target, totalRows, $action) {
		if ($target.find('tr').length >= totalRows) {
			$action.hide();
		}
	}

	$('.table-actions a').each(function () {
		let $this = $(this);
		let $target = $($this.data('target'));
		let source = $this.attr('href');
		let totalRows = $target.data('totalRows');

		showOrHideAction($target, totalRows, $this);

		$this.bind('click', function (e) {

			$.ajax({
				url: source,
				success: function (data) {
					$target.append(data);
					showOrHideAction($target, totalRows, $this);
				},
			});

			e.preventDefault();
		});
	});

	$('.table-select').select2({
		minimumResultsForSearch: Infinity,
		templateSelection: format,
		templateResult: format
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
			$('#' + choice).addClass('table-pane--active').siblings('.tab-pane').removeClass('table-pane--active');
		}
	});
}