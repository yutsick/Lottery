export default function() {
	$('.alert .js-action-close').on('click', function () {
		let $alert = $(this).parents('.alert');
		$alert.alert('close');
        $(".new-message").addClass("new-message__remove");  //.animate({ left: "-400" }, 500 );
	});

	$('.alert').on('closed.bs.alert', function () {
	});

	$('#alert-cookie').on('closed.bs.alert', function () {
		let $html = $('html');
		$html.removeClass('has-cookie-bar');
	});
}

