import isMobile from '../utilities/isMobile'

let filters = [];

export default function () {
	initProductFilterDropdowns();

	$('[data-toggle="tooltip"]').tooltip({
		trigger: 'hover'
	});

	$('form[data-filter-type]').on('submit', function (e) {
		e.preventDefault();
		let filterType = $(this).data('filter-type');
		let filterValues = $(this).serializeArray();

		filters[filterType] = filterValues;
	});
}

/*
* Initialize dropdowns with filter values for product list
*/
function initProductFilterDropdowns() {
	$('.js-toggle-filters').on('click', function () {
		$('.filters').toggle();
	});

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