export default function () {
	function showOrHideAction($target, totalItems, $action) {
		if ($target.find('tr').length >= totalItems) {
			$action.hide();
		}
	}

	$('.entity-collection-actions a').each(function () {
		let $this = $(this);
		let $target = $($this.data('target'));
		let source = $this.attr('href');
		let totalItems = $target.data('totalItems');

		showOrHideAction($target, totalItems, $this);

		$this.bind('click', function (e) {

			$.ajax({
				url: source,
				success: function (data) {
					$target.append(data);
					showOrHideAction($target, totalItems, $this);
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