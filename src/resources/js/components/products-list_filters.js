export default function() {

	function openDropdown(btn) {
		$(btn).on('click', function(evt) {
			evt.preventDefault();

			if($(this).hasClass('open')) {
				$(this).removeClass('open');
				$('.filter-line__dropdowns-content .dropdowns-content').removeClass('show');
				$('.filter-line__dropdowns-content').removeClass('active');
			} else {
				$(btn).removeClass('open');
				$(this).addClass('open');
				$('.filter-line__dropdowns-content').addClass('active');
				$('.filter-line__dropdowns-content .dropdowns-content').removeClass('show');
				$($(this).attr('data-target')).addClass('show');
			}
		});

		checkActiveDropdown();
	};
	openDropdown('.js-filter-dropdown');

	function checkActiveDropdown() {
		jQuery(document).on('click', function(evt) {
			if(!$(evt.target).closest('.dropdowns-content__wrapper').length
			&& !$(evt.target).closest('.filters__item').length
			&& !$(evt.target).hasClass('dropdown-backdrop')) {
				$('.filter-line__dropdowns-content .dropdowns-content').removeClass('show');
				$('.js-filter-dropdown').removeClass('open');
				$('.filter-line__dropdowns-content').removeClass('active');
			}
		});
	};

	function createChosenFiltres(btn) {
		let target = $('.js-filtersPlace');

		$(btn).on('click', function(evt) {
			evt.preventDefault();
			evt.stopPropagation();

			//If this is a checkbox filter
			if($(this).closest('.js-product-filter__btn').length) {
				let val = $(this).closest('.js-product-filter__btn').find('input').val();
				let category = 'checkbox';

				if(!$(this).closest('.js-product-filter__btn').hasClass('checked')) {
					$(this).closest('.js-product-filter__btn').addClass('checked');

					let btn = `
					<button type="button" data-name="${
						category
					}" class="active-filters__label js-remove-filter" value="${
						$(this).closest('.js-product-filter__btn').find('input').val()
					}">${
						$(this).closest('.js-product-filter__btn').find('input').val()
					}</button>`;

					target.append(btn);
				} else {
					$(this).closest('.js-product-filter__btn').removeClass('checked');
					$('.js-filtersPlace').find(`.active-filters__label[value="${val}"]`).remove();
					checkActiveFiltersLength();
				}
			}

			//If value exists and there is no such active element
			if(this.value && !target.has(`.active-filters__label[value="${this.value}"]`).length) {

				//If this is category filter (slider with blue btns)
				if($(this).attr("data-name") === 'category') {
					if(!$(this).hasClass('product-category__btn--all')) {

						let btn = `<button type="button" data-name="${$(this).attr("data-name")}" class="active-filters__label js-remove-filter" value="${this.value}">${this.value}</button>`;

						target.append(btn);

						$(this).addClass('checked');
						$('.product-category__btn--all').removeClass('checked');

					} else if ($(this).hasClass('product-category__btn--all')) {

						//Delete only category filters and set the "all products" btn active
						$('.product-category__btn[data-name="category"]').removeClass('checked');
						$('.product-category__btn--all').addClass('checked');

						$('.js-filtersPlace').find('.active-filters__label[data-name="category"]').remove();
					}
				}

			}

			//Adding classes for filters area for rigth margings
			if(!$('.js-filtersPlace').hasClass('active') && $('.js-filtersPlace .active-filters__label').length) {
				$('.js-filtersPlace').addClass('active');
			} else if ($('.js-filtersPlace').hasClass('active') && !$('.js-filtersPlace .active-filters__label').length) {
				$('.js-filtersPlace').removeClass('active');
			}

			checkActiveFiltersLength();
		})
	};
	createChosenFiltres('.product-category__btn');
	createChosenFiltres('.js-product-filter__btn label');


	function deleteChosenFilter(btn) {

		$(btn).on('click', $('.js-remove-filter'), function(evt) {
			let btnCategory = $($(evt.target)).attr('data-name');
			let btnValue = $($(evt.target)).val();

			//Click on category filter
			if(btnCategory === 'category') {
				$(`.product-category__btn.checked[value="${btnValue}"]`).removeClass('checked');
				$($(`.js-remove-filter[value="${btnValue}"]`)).remove();
			}

			//CLick on checkbox filter
			if(btnCategory === 'checkbox') {
				console.log($(`input[value="${btnValue}"]`));

				$(`input[value="${btnValue}"]`).closest('.js-product-filter__btn').removeClass('checked');
				$(`.js-remove-filter[value="${btnValue}"]`).remove();
			}

			//Click on "remove all" btn
			if($(evt.target).hasClass('active-filters__label--primary')) {
				//remove classes for category filters
				$('.product-category__btn').removeClass('checked');
				$('.product-category__btn--all').addClass('checked');

				//remove classes for checkbox filters
				$(`.js-product-filter__btn`).removeClass('checked');

				//delete active label
				$('.js-filtersPlace').find('.active-filters__label').remove();
			}

			checkActiveFiltersLength();
		})
	}
	deleteChosenFilter('.js-filtersPlace');

	function checkActiveFiltersLength() {
			//Adding "remove all" btn if filters are 1>
			if($('.js-filtersPlace .active-filters__label').length > 1 && !$('.js-filtersPlace').has(`.active-filters__label--primary`).length) {
				$('.js-filtersPlace').append(`<button class="active-filters__label active-filters__label--primary js-remove-filter">Återställ filter</button>`);
			}

			//Removing "remove all" btn if less 2
			if($('.js-filtersPlace .active-filters__label').length <= 2) {
				$('.active-filters__label--primary').remove();

				if (!$('.js-filtersPlace .active-filters__label').length) {
					$('.product-category__btn--all').addClass('checked');
				}
			}

			activeFiltersCounter();
	};

	function modalOpenFiltres(btn) {
		$(btn).on('click', function(evt) {
			evt.preventDefault();

			$('#productFiltersModal').fadeIn();
		})
	};
	modalOpenFiltres('.js-filters__mobile-btn');

	function modalToPage(btn) {
		$(btn).on('click', function(evt) {
			evt.preventDefault();
			$('.product-filters-modal__page').removeClass('expanded');
			$($(this).attr('data-name')).addClass('expanded');
		})
	};
	modalToPage('.js-product-filters-modal__filter-category');

	function modalToBack(btn) {
		$(btn).on('click', function(evt) {
			evt.preventDefault();

			if($(this).attr('data-target') === 'close') {
				$('.product-filters-modal__page').removeClass('expanded');
				$('#productFiltersModal__home').addClass('expanded');

				$('#productFiltersModal').fadeOut();
			} else {
				$('.product-filters-modal__page').removeClass('expanded');
				$($(this).attr('data-target')).addClass('expanded');
			}
		})
	};
	modalToBack('.js-toBack-filter-modal');

	function activeFiltersCounter() {
		let counter = $('.js-filters__mobile-btn--checked');

		counter.find('span').text($('.active-filters-line .js-remove-filter:not(.active-filters__label--primary)').length);

		if(counter.text() == '0') {
			$('.js-filters__mobile-btn--checked').fadeOut();
		} else if (counter.text() == '1') {
			$('.js-filters__mobile-btn--checked').fadeIn();
		}

		$('.product-filters-modal__active-filters__title').text(`${counter.text()} valda filter:`);
	}
	activeFiltersCounter();
}