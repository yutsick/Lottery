import isMobile from '../utilities/isMobile';
var LazyLoad = require('vanilla-lazyload');

export default class ProductList {
	constructor() {
		this.filters = {};
		this.wrapper = document.querySelector('.product-list-blocks');
		this.initProductFilterDropdowns();
		//this.disableFilter();
		this.getMaxAmount();

		$('.filter-dropdown').on('hide.bs.dropdown', function(e) {
			let $form = $(e.currentTarget).find('form');
			$form.submit();
		});

		$('form[data-filter-type]').on('submit', (e) => {
			e.preventDefault();
			let $form = $(e.currentTarget);
			let filterType = $form.data('filter-type');
			let filterValues = $form.serializeArray();
			let that = this;

			this.filters[filterType] = filterValues;
			this.createFilterLabels();
			this.filterProducts();

			// Removed labels
			$('.active-filters').on('click', $('.active-filters__label'), function(e) {
				let $value = $(e.target).val();
                let change = false;

                if ($(e.target).hasClass('js-remove-all-labels')) {
					// Empty array
					that.filters = {};

					// Uncheck item in the form
					$form.find('input').each(function() {

						if($(this).attr('type') == 'checkbox') {
							$(this).prop('checked', false).change();
						} else {
							$(this).val('');
						}
						change = true;
					});
				} else {
					that.filters[filterType].forEach(function (filter, index) {
						if (filter.value == $value ) {
							that.filters[filterType].splice(index, 1);

							// Uncheck item in the form
							$form.find('input').each(function() {
								if ($(this).val() == $value ) {
									if($(this).attr('type') == 'checkbox') {
                                        $(this).prop('checked', false).change();
                                    } else {
                                        $(this).val('');
                                    }
                                    change = true;
                                }
							});
						}
					});
				}

				that.createFilterLabels();
                if(change) {
                    $form.submit();
                }
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

	/*disableFilter() {
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
                } else {
                    this.toggleDisableOnSubmit(false, $submitBtn);
                }
            } else{
                if(filterValues.length > 0) {
                    this.toggleDisableOnSubmit(true, $submitBtn);
                } else {
                    this.toggleDisableOnSubmit(false, $submitBtn);
                }
            }
		});
	}*/

	/*toggleDisableOnSubmit(enable, btn) {
        if(enable && btn.prop('disabled') ) {
            btn.prop("disabled", false);
        } else if (!enable && !btn.prop('disabled')) {
            btn.prop("disabled", true);
        }
    }*/

	/**
	 * Get the max amount and use it as the highest value in the filter
	 */
	getMaxAmount() {
		$('.js-set-max-amount').on('click', function (e) {
			let maxAmount = $(this).data('max-amount');
			let from = $('#from.filter-dropdown__price');
			let to = $('#to.filter-dropdown__price');

			if ($(this).prop('checked')) {
				from.val('');
				to.val(maxAmount);
			} else {
				from.val('');
				to.val('');
			}
		});
	}

	/**
	 * Get new products width ajax
	 */
    filterProducts(){
    	let source = "";
    	let hasFilter = false;

    	$.each(this.filters, function( key, value ) {
    		if(value.length >= 1) {
				hasFilter = true;
			}
        });

    	if(hasFilter){
            source = "/ajax/filter-products.html";
		}else {
            source = "/ajax/all-products.html";
        }

        let _this = this;

        $.ajax({
            url: source,
            success: function (data) {
            	if( $(data).find('.block-product').length >= 8 && hasFilter){
                    $('.entity-collection-actions').hide();
				} else {
            		$('.entity-collection-actions').show();
				}

                $('#product-list').html(data);
                _this.lazyLoad();
            },
        });
    }

    lazyLoad() {
        if(this.wrapper) {
            var loading = new LazyLoad({
                container: this.wrapper,
            });
            return loading;
        }else {
            return false;
        }
    }

}