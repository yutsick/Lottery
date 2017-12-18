import isMobile from '../utilities/isMobile'

export default class ProductList {
	constructor() {
		this.filters = [];

		this.initProductFilterDropdowns();

		$('[data-toggle="tooltip"]').tooltip({
			trigger: 'hover'
		});

		$('form[data-filter-type]').on('submit', (e) => {
			e.preventDefault();
			let $form = $(e.currentTarget);

			let filterType = $form.data('filter-type');
			let filterValues = $form.serializeArray();

			this.filters[filterType] = filterValues;

			this.createFilterLabels();
			let parameterUrl = this.createFilterUrl();

			console.log(parameterUrl);

			$('.filters .filter-dropdown').removeClass('open');
		});
	}

	/*
	* Create and adds filter labels into the HTML.
	*/
	createFilterLabels() {
		let html = '';

		for (let filterType in this.filters) {
			this.filters[filterType].forEach(function (filter) {
				html += `<span class="active-filters__label">${filter.value}</span>`;
			});
		}

		html += `<span class="active-filters__label active-filters__label--primary">Ta bort alla filter</span>`;

		$('.active-filters').html(html);
	}

	createFilterUrl() {
		let url = '?';

		for (let filterType in this.filters) {
			url += $.param(this.filters[filterType]) + '&';
		}

		// Return and remove last &.
		return url.slice(0, -1);
	}

	/*
    * Initialize dropdowns with filter values for product list
    */
	initProductFilterDropdowns() {
		$('.js-toggle-filters').on('click', function () {
			$('.filters').toggle();
		});

	// Show overlay when clicking the dropdown
		$(".filters .dropdown").on("show.bs.dropdown", function (e) {
			if (isMobile()) {
				$('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
			}
		});

		// Hide overlay when clicking the dropdown
		$(".filters .dropdown").on("hide.bs.dropdown", function (e) {
			if (isMobile()) {
				$(".modal-backdrop").remove();
			}
		});

		// Hide overlay when clicking the button
		$(".js-hide-dropdown").on('click', function (e) {
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
}