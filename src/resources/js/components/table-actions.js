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

}