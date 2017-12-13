import isMobile from '../utilities/isMobile'

export default function () {
	$('[data-toggle="tooltip"]').tooltip();

	$(".filters .dropdown").on("show.bs.dropdown", function (e) {
		if (isMobile()) {
			$('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
		}
	});

	$(".filters .dropdown").on("hide.bs.dropdown", function (e) {
		if (isMobile()) {
			$(".modal-backdrop").remove();
		}
	});

	$(".filters .dropdown-menu").on('click', function (e) {
		// Close the dropdown if clicking on the header.
		if ($(e.target).hasClass('filter-dropdown__header')) {
			return;
		}

		// Prevent closing of dropdown.
		$(this).parent().is(".open") && e.stopPropagation();
	});
}