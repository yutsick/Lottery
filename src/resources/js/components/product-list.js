import isMobile from '../utilities/isMobile'

export default class ProductList {
	constructor() {
		this.filters = [];
		this.initProductFilterDropdowns();
        this.disableFilter();

		$('[data-toggle="tooltip"]').tooltip({
			trigger: 'hover'
		});

		$('form[data-filter-type]').on('submit', (e) => {
			e.preventDefault();
			let $form = $(e.currentTarget);
			let filterType = $form.data('filter-type');
			let filterValues = $form.serializeArray();
			let that = this;

			this.filters[filterType] = filterValues;
			this.createFilterLabels();

			// Removed labels
			$('.active-filters').on('click', $('.active-filters__label'), function(e) {
				let $value = $(e.target).val();
				if ($(e.target).hasClass('js-remove-all-labels')) {
					// Empty array
					that.filters[filterType] = [];

					// Uncheck item in the form
					$form.find('input').each(function() {
						$(this).prop('checked', false).change();
					});
				} else {
					that.filters[filterType].forEach(function (filter, index) {
						if (filter.value == $value ) {
							that.filters[filterType].splice(index, 1);

							// Uncheck item in the form
							$form.find('input').each(function() {
								if ($(this).val() == $value ) {
									$(this).prop('checked', false).change();
								}
							});
						}
					});
				}

				that.createFilterLabels();
			});

			let parameterUrl = this.createFilterUrl();
			//console.log(parameterUrl);

			$('.filters .filter-dropdown').removeClass('open');
		});
	}

	/*
	* Create and adds filter labels into the HTML.
	*/
	createFilterLabels() {
        let html = '';
        let removeBtn = '';
		let exitingFilter = 0;

		for (let filterType in this.filters) {
			this.filters[filterType].forEach(function (filter) {
				if(filter.value !== '') {
					if(filter.name === 'from') {
                        html += `<button class="active-filters__label js-remove-label" value="${filter.value}">Pris från ${filter.value} kr</button>`;
                    }else if(filter.name === 'to') {
                        html += `<button class="active-filters__label js-remove-label" value="${filter.value}">Pris till ${filter.value} kr</button>`;
                    }else if(filter.name === 'search') {
                        html += `<button class="active-filters__label js-remove-label" value="${filter.value}">Sök: <span class="italic">${filter.value}</span></button>`;
                    }else if(filter.name === 'campaigns') {
                        html += `<button class="active-filters__label js-remove-label" value="${filter.value}">Kampanj: ${filter.value}</button>`;
                    }else {
                        html += `<button class="active-filters__label js-remove-label" value="${filter.value}">${filter.value}</button>`;
                    }
                    exitingFilter += 1;
                }
			});
		}

		if(exitingFilter > 1) {
            removeBtn += `<button class="active-filters__label active-filters__label--primary js-remove-all-labels">Ta bort alla filter</button>`;
            html = removeBtn + html;
        }

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
		let $showDropdown = $('.js-show-dropdown');

		$('.js-toggle-filters').on('click', function () {
			$('.filters').toggle();
		});

		// Show overlay when clicking the element
		$showDropdown.on("show.bs.dropdown", function (e) {
			if (isMobile()) {
				$('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
			}
		});

		// Hide overlay when clicking the element
		$showDropdown.on("hide.bs.dropdown", function (e) {
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

		$(".dropdown-menu").on('click', function (e) {
			// Close the dropdown if clicking on the header.
			if ($(e.target).hasClass('filter-dropdown__header')) {
				return;
			}

			// Prevent closing of dropdown.
			$(this).parent().is(".open") && e.stopPropagation();
		});
	}

	disableFilter() {
        $('form[data-filter-type]').on('keyup change', (e) => {
            let $form = $(e.currentTarget);
			let $submitBtn =  $(e.currentTarget).find('button');
			let filterType = $form.data('filter-type');
			let filterValues = $form.serializeArray();

            if(filterType === 'price' || filterType === 'search') {
                let hasValue = false;

                filterValues.forEach(function (filter) {
                    if(filter.value !== '') {
                        hasValue = true;
                    }
                });

                if(hasValue) {
                    this.toggleDisableOnSubmit(true, $submitBtn);
                }else {
                    this.toggleDisableOnSubmit(false, $submitBtn);
                }
            } else{
                if(filterValues.length > 0) {
                    this.toggleDisableOnSubmit(true, $submitBtn);
                }else {
                    this.toggleDisableOnSubmit(false, $submitBtn);
                }

            }
		});
	}

	toggleDisableOnSubmit(enable, btn) {
        if(enable && btn.prop('disabled') ) {
            btn.prop("disabled", false);
        } else if (!enable && !btn.prop('disabled')) {
            btn.prop("disabled", true);
        }
    }
}