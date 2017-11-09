export default function() {
    $('.account-history-actions a').bind('click', function (e) {
    	debugger;
    	let $this = $(this);
    	let $target = $($this.data('target'));
    	let source = $this.attr('href');

		$.ajax({
			url: source,
			success: function(data) {
				$target.append(data);
			},
		});

		e.preventDefault();
    });
}