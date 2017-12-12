export default function () {
	$('[data-toggle="tooltip"]').tooltip();

	$('body').on("click", ".filters .dropdown-menu", function (e) {
		$(this).parent().is(".open") && e.stopPropagation();
	});

}