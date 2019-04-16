import isMobile from '../utilities/isMobile';
import LazyLoad from "vanilla-lazyload";

export default class ProductList {
	constructor() {
		this.filters = {};
		this.wrapper = document.querySelector('.product-list-blocks');
		this.sortForm = $('.sort__item form');
		this.initProductFilterDropdowns();
		this.getMaxAmount();
		this.removeFilter();
		this.$allForms = $('form[data-filter-type]');
		let _this = this;
		$(".filters :checkbox").attr("autocomplete", "off");

		$('.filter-dropdown').on('hide.bs.dropdown', function(e) {
			let $form = $(e.currentTarget).find('form');
			let filterType = $form.data('filter-type');
			let filterValues = $form.serializeArray();
			let submit = false;

			if(_this.filters[filterType] && filterType !== 'sort') {
				if(filterValues.length === 0 &&  _this.filters[filterType].length > 0) {
					submit = true;
				}
			}

			$(filterValues).each(function (index, value) {
				if(filterType !== 'sort' ) {
				 	if(value.value || filterType === 'price'|| filterType === 'search') {
						submit = true;
					}
				}
			});

			if(submit) {
				$form.submit();
			}
		});

		if(_this.sortForm) {
			_this.sortForm.on('change', (e) => {
				let filterValues = _this.sortForm.serializeArray();
				_this.sortResult(filterValues[0].value);
			})
		}

		_this.$allForms.on('submit', (e) => {
			e.preventDefault();
			this.$form = $(e.currentTarget);
			let filterType = _this.$form.data('filter-type');
			let filterValues = _this.$form.serializeArray();
			if(_this.filters && filterValues.length >= 0) {
				if(filterType === 'price' || filterType === 'search'){
					$(filterValues).each(function (index, value) {
						 // remove it there is no input value.
						if(!value.value) {
							filterValues = $.grep(filterValues, function(newvalue) {
								return newvalue != value;
							});
						}
					})
				}
				_this.filters[filterType] = filterValues;
			}

			this.createFilterLabels();
			this.filterProducts();

		// 	let parameterUrl = this.createFilterUrl();
		// 	//console.log(parameterUrl);

			$('.filters .filter-dropdown').removeClass('open');
		});
	}

	//this is only re-reading Ajax request
	sortResult(value) {
		let _this = this;

		$.ajax({
			url: "/ajax/filter-products.html",
			success: function (data) {
				if( $(data).find('.block-product').length >= 8){
					$('.entity-collection-actions').hide();
				} else {
					$('.entity-collection-actions').show();
				}

				$('#product-list').html(data);
				_this.lazyLoad();
			},
		});
	}

	removeFilter() {
		let _this = this;
		$('.active-filters').on('click', $('.active-filters__label'), function(e) {
			let change = false;
			let $value = $(e.target).val();
			if ($(e.target).hasClass('js-remove-all-labels')) {
				//Remove all
				_this.filters = {};
				_this.$allForms.each(function(index, form) {
					$(form).find('input').each(function(index, input) {
						if($(input).attr('type') === 'checkbox') {
							$(input).prop('checked', false);
						} else {
							$(input).val('');
						}
						change = true;
					});
				})
			} else {
				//Remove specific filter
				let filterType = $(e.target).data("filtertype");

				if (filterType) {

					_this.filters[filterType].forEach(function (filter, index) {
						if (filter.value === $value ) {
						_this.filters[filterType].splice(index, 1);

							// Uncheck item in the form
							_this.$allForms.each(function(index, form) {
								$(form).find('input').each(function() {
									if ($(this).val() === $value ) {
										if($(this).attr('type')=== 'checkbox') {
											$(this).prop('checked', false);
										} else {
											$(this).val('');
										}
										change = true;
									}
								});
							});

							if(_this.filters[filterType].length === 0) {
								delete _this.filters[filterType];
							}
						}
					});
				}
			}

			if(change) {
				_this.$form.submit();
			}
			_this.createFilterLabels();
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
                        html += `<button class="active-filters__label js-remove-label" data-filterType="${filterType}" value="${filter.value}">Pris från ${filter.value} kr</button>`;
                    }else if(filter.name === 'to') {
                        html += `<button class="active-filters__label js-remove-label" data-filterType="${filterType}" value="${filter.value}">Pris till ${filter.value} kr</button>`;
                    }else if(filter.name === 'search') {
                        html += `<button class="active-filters__label js-remove-label" data-filterType="${filterType}" value="${filter.value}">Sök: <span class="italic">${filter.value}</span></button>`;
                    }else if(filter.name === 'campaigns') {
                        html += `<button class="active-filters__label js-remove-label" data-filterType="${filterType}" value="${filter.value}">Kampanj: ${filter.value}</button>`;
                    }else {
                        html += `<button class="active-filters__label js-remove-label" data-filterType="${filterType}" value="${filter.value}">${filter.value}</button>`;
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
		let _this = this;

		$('.js-toggle-filters').on('click', function () {
			$('.filters').toggle();
		});

		// Show overlay when clicking the element
		$showDropdown.on("show.bs.dropdown", function (e) {
			if (isMobile()) {
				$('body').addClass('modal-open js-overlay-is-active');
				$('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
				_this.modalEvent();
			}
		});

		// Hide overlay when clicking the element
		$showDropdown.on("hide.bs.dropdown", function (e) {
			if (isMobile()) {
				$('body').removeClass('modal-open js-overlay-is-active');
				$(".modal-backdrop").remove();
				$(".dropdown-backdrop").remove();
			}
		});

		// Hide overlay when clicking the button
		$(".js-hide-dropdown").on('click', function (e) {
			if (isMobile()) {
				$('body').removeClass('modal-open js-overlay-is-active');
				$(".modal-backdrop").remove();
				$(".dropdown-backdrop").remove();
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

		_this.modalEvent();
	}

	modalEvent() {
		// Hide overlay when clicking the modal
		$(".modal-backdrop.in").on('click', function (e) {
			if (isMobile()) {
				$('body').removeClass('modal-open js-overlay-is-active');
				$(".modal-backdrop").remove();
				$(".dropdown-backdrop").remove();
			}
		});
	}

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
			let loading = new LazyLoad({
				elements_selector: ".block-product__image img"
			});
			return loading;
		}else {
			return false;
		}
    }

}