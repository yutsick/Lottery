module.exports = {
	init() {
		alert_ux();

		function alert_ux() {
			$('.alert .js-action-close').click(function () {
				let $alert = $(this).parents('.alert');
				$alert.alert('close');
			});

			$('.alert').on('closed.bs.alert', function () {
				// console.log('I,m closed');
			});
		}
	}
};
