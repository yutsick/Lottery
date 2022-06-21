export default function() {

	function openDropdownBtnListener(btn) {
		$(btn).on('click', function(evt) {
			evt.preventDefault();

			if($(this).hasClass('open')) {
				closeAllDropdowns();
			} else {
				$(btn).removeClass('open');
				$(this).addClass('open');
				$('.filter-line__dropdowns-content').addClass('active');
				$('.filter-line__dropdowns-content .dropdowns-content').removeClass('show');
				$($(this).attr('data-target')).addClass('show');
				openDropdownsListener();
			}
		});

		checkActiveDropdown();
	};
	openDropdownBtnListener('.js-filter-dropdown');

	function openDropdownsListener() {
		jQuery(document).on('click.checking', function(evt) {
			let target = evt.target;
			checkActiveDropdown(target);
		});
	}

	function checkActiveDropdown(target) {
		if(!$(target).closest('.dropdowns-content__wrapper').length
		&& !$(target).closest('.filters__item').length
		&& !$(target).hasClass('dropdown-backdrop')) {
			closeAllDropdowns();
		};
	};

	function closeAllDropdowns() {
		$('.filter-line__dropdowns-content .dropdowns-content').removeClass('show');
		$('.js-filter-dropdown').removeClass('open');
		$('.filter-line__dropdowns-content').removeClass('active');

		jQuery(document).off('.checking');
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
					$(`.js-product-filter__btn input[value="${val}"]`).closest('.js-product-filter__btn').addClass('checked');

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
					$(`.js-product-filter__btn.checked input[value="${val}"]`).closest('.js-product-filter__btn').removeClass('checked');
					$('.js-filtersPlace').find(`.active-filters__label[value="${val}"]`).remove();
				}
				checkActiveFiltersLength();
			}

			//If value exists and there is no such active element
			if(this.value && !target.has(`.active-filters__label[value="${this.value}"]`).length) {

				//If this is category filter (slider with blue btns)
				if($(this).attr("data-name") === 'category') {
					if(!$(this).hasClass('product-category__btn--all')) {
						let value = this.value;

						let btn = `<button type="button" data-name="${$(this).attr("data-name")}" class="active-filters__label js-remove-filter" value="${value}">${value}</button>`;

						target.append(btn);

						$(`.product-category__btn[value="${value}"]`).addClass('checked');
						$('.product-category__btn--all').removeClass('checked');
					} else if ($(this).hasClass('product-category__btn--all')) {

						//Delete only category filters and set the "all products" btn active
						$('.product-category__btn[data-name="category"]').removeClass('checked');
						$('.product-category__btn--all').addClass('checked');

						$('.js-filtersPlace').find('.active-filters__label[data-name="category"]').remove();
					}
				}

			} else if($(this).attr("data-name") === 'category' && $(this).hasClass('checked')) {
				let value = this.value;
				$(`.product-category__btn[value="${value}"]`).removeClass('checked');
				$('.js-filtersPlace').find(`.js-remove-filter[value="${value}"]`).remove();
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

				$(`input[value="${btnValue}"]`).closest('.js-product-filter__btn').removeClass('checked');
				$(`.js-remove-filter[value="${btnValue}"]`).remove();
			}

			if(btnCategory === 'rangePrice') {
				$('.active-filters__label[data-name="rangePrice"]').remove();
				$('.range-slider').parent().find('.checkbox_round.checked').removeClass('checked');
				activeFiltersCounter();
			}

			//Click on "remove all" btn
			if($(evt.target).hasClass('js-remove-all-filters')) {
				deleteAllFilters();
			}

			checkActiveFiltersLength();
          
           $('.product-list-blocks .search-enter>span').html('');
           $('.search-enter').removeClass('search');
           $('.clearn').removeClass('active');
           $('.icon-search-new').removeClass('active');
           $('#produkt').val('');
          
		})
	}
	deleteChosenFilter('.js-filtersPlace');

	function deleteAllFilters() {
		//remove classes for category filters
		$('.product-category__btn').removeClass('checked');
		$('.product-category__btn--all').addClass('checked');

		//remove classes for checkbox filters
		$(`.js-product-filter__btn`).removeClass('checked');

		//delete active label
		$('.js-filtersPlace').find('.active-filters__label').remove();

		//uncheck range visa checkbox
		$('.range-slider').parent().find('.checkbox_round.checked').removeClass('checked');

		checkActiveFiltersLength();
	};

	function checkActiveFiltersLength() {
		let counter = $('.js-filtersPlace .active-filters__label:not(.active-filters__label--primary)').length;

			//Adding "remove all" btn if filters are 1>
			if(counter / 2 > 1 && !$('.js-filtersPlace').has(`.js-remove-all-filters`).length) {
				$('.js-filtersPlace').append(`<button class="active-filters__label active-filters__label--primary js-remove-filter js-remove-all-filters">Återställ filter</button>`);
			}

			//Removing "remove all" btn if less 2
			if(counter / 2 <= 1) {
				$('.js-remove-filter.js-remove-all-filters').remove();

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
                      
            $('body').addClass('none_scroll__');

			modalOpenedListener();
		})
	};
	modalOpenFiltres('.js-filters__mobile-btn');

	function modalOpenedListener() {
		jQuery(window).on('resize', modalFiltersClose);
	}

	function modalToPage(btn) {
		$(btn).on('click', function(evt) {
			evt.preventDefault();
			$('.product-filters-modal__page').removeClass('expanded');
			$($(this).attr('data-name')).addClass('expanded');
		})
	};
	modalToPage('.js-product-filters-modal__filter-category');

	function modalToBackListener(btn) {
		$(btn).on('click', function(evt) {
			evt.preventDefault();

			if($(this).attr('data-target') === 'close') {
				modalFiltersClose();
			} else {
				$('.product-filters-modal__page').removeClass('expanded');
				$($(this).attr('data-target')).addClass('expanded');
			}
		})
	};
	modalToBackListener('.js-toBack-filter-modal');

	function modalFiltersClose() {
		$('.product-filters-modal__page').removeClass('expanded');
      
		$('#productFiltersModal__home').addClass('expanded');

		$('#productFiltersModal').fadeOut();
      
      	$('body').removeClass('none_scroll__');
      
		jQuery(window).off('resize', modalFiltersClose);
	}

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

	function linkSameCheckboxes(link1, link2) {
		$(link1).closest('.checkbox_round').find('label').on('click', function(evt) {
			evt.preventDefault();
			link(link2, evt.target);
		});
		$(link2).closest('.checkbox_round').find('label').on('click', function(evt) {
			evt.preventDefault();
			link(link1, evt.target);
		});

		function link(linkWith, target) {
			if(!$(target).closest('.checkbox_round').hasClass('checked')) {
				$(target).closest('.checkbox_round').addClass('checked');
				$(linkWith).closest('.checkbox_round').addClass('checked');
			} else {
				$(target).closest('.checkbox_round').removeClass('checked');
				$(linkWith).closest('.checkbox_round').removeClass('checked');
			}
		}
	}
	linkSameCheckboxes('#ckbox_visa', '#ckbox_visa2');


	//create and listener for range price slider
	function rangeSliderLabel(rangeFilterAccept) {
		let slider = $(rangeFilterAccept).closest('.checkbox').parent().find('.range-slider');

		$(rangeFilterAccept).closest('.checkbox').find('label').on('click', function(evt) {
			let minPrice = getPriceRange(slider)[0];
			let maxPrice = getPriceRange(slider)[1];
			let label = `<button type="button" data-name="rangePrice" class="active-filters__label js-remove-filter" value="${minPrice}–${maxPrice} SEK">${minPrice}–${maxPrice} SEK</button>`;

			if(!$('.js-filtersPlace .active-filters__label[data-name="rangePrice"]').length
			&& $(evt.target).closest('.checkbox').hasClass('checked')) {

				$('.js-filtersPlace').append(label);
				$('.js-filtersPlace').addClass('active');
				activeFiltersCounter();

			} else if ($('.js-filtersPlace .active-filters__label[data-name="rangePrice"]').length
			&& !$(evt.target).closest('.checkbox').hasClass('checked')) {
				$('.active-filters__label[data-name="rangePrice"]').remove();
				activeFiltersCounter();
			}
		})

		$(rangeFilterAccept).closest('.checkbox').parent().find('.range-slider').find('input').on('input', function(evt) {
			let minPrice = getPriceRange(slider)[0];
			let maxPrice = getPriceRange(slider)[1];
			$('.active-filters__label[data-name="rangePrice"]').text(`${minPrice}–${maxPrice} SEK`);
			$('.active-filters__label[data-name="rangePrice"]').attr('value', `${minPrice}–${maxPrice} SEK`)
		})
	};
	rangeSliderLabel('#ckbox_visa');
	rangeSliderLabel('#ckbox_visa2');
  
  
	//tclick on price range
	function clickOpenPrise(rangeClick) { 
      
      	let slider = $(rangeClick).closest('.click');

		$('.range-slider').find('input').on('click', function(evt) {

			let label = `<button type="button" data-name="rangePrice" class="active-filters__label js-remove-filter" value="49–500 SEK">49–500 SEK</button>`;

			if(!$('.js-filtersPlace .active-filters__label[data-name="rangePrice"]').length
			&& $(evt.target)) {

				$('.js-filtersPlace').append(label);
				$('.js-filtersPlace').addClass('active');
				activeFiltersCounter();

			} else if ($('.js-filtersPlace .active-filters__label[data-name="rangePrice"]').length
			&& !$(evt.target)) {
				$('.active-filters__label[data-name="rangePrice"]').remove();
				activeFiltersCounter();
			}

		})
      
      }
  
  	clickOpenPrise('#ckbox_visa');
	clickOpenPrise('#ckbox_visa2');

  
  	function getPriceRange(slider) {
		var minPrice = parseFloat(slider.find('.rangeValues_left').text());
		var maxPrice = parseFloat(slider.find('.rangeValues_right').text());

		return [minPrice, maxPrice];
	}
  
	//text entry search check
    $('#produkt').on('keyup', function(e) {
      var btnVal =  $(this).val();
      
      if(btnVal){
          $('.filter-search>.clearn').addClass('active'); 
          $('.filter-search>.icon-search-new').addClass('active'); 
        
          $('.search-enter>span').html(btnVal);
          $('.search-enter').addClass('search');
      }else{
          $('.filter-search>.clearn').removeClass('active'); 
          $('.filter-search>.icon-search-new').removeClass('active'); 

      }
    }); 
//   $('.product-list-blocks .search-enter').remove();
	//clear search field
    $('.clearn').on('click', function(e) {
       $('.filter-search>.clearn').removeClass('active'); 
       $('.filter-search>.icon-search-new').removeClass('active'); 
       $('.product-list-blocks .search-enter>span').html('');
       $('.search-enter').removeClass('search');
    });

	function infinityScroll(target) {
		$(window).on('scroll', function() {
			let block = document.querySelector(target);
			let counter = 1;

			let contentHeight = block.offsetHeight;
			let yOffset = window.pageYOffset;
			let window_height = window.innerHeight - 800;
			let y = yOffset + window_height;


			if(y >= contentHeight) {
//                console.log('13');
				let container = $('#product-list');
				let current = container.children().length;
				let total = 1000;

				if(current <= total) {
					container.append(`
<div class="col-xs-6 col-md-3">
	<article class="block-product block-product_extended">
		
		<button class="block-product__dream-button btn-link js-add-to-dreamlist" data-toggle="tooltip" data-placement="top" title="" data-original-title="Lägg till i min drömlista">
			<i class="icon icon-dream-star dreamlist-icon"></i>
		</button>
		

		

		<div class="block-product__image-wrapper">
			<a class="block-product__link" href="/" title="">
				<div class="block-product__image">
				    <div class="images__contein active">
				       <img src="assets/img/mockup/StandingImgBlock-small2.jpg" data-src="assets/img/mockup/StandingImgBlock-small2.jpg" alt="" class="loaded" data-was-processed="true">
				    </div>
				    <div class="images__contein">
				       <img src="assets/img/mockup/car.jpg" data-src="assets/img/mockup/car.jpg" alt="" class="loaded" data-was-processed="true">
				    </div>
				    <div class="images__contein">
				       <img src="assets/img/mockup/StandingImgBlock-small2.jpg" data-src="assets/img/mockup/StandingImgBlock-small2.jpg" alt="" class="loaded" data-was-processed="true">
				    </div>
				    <div class="images__contein">
				       <img src="assets/img/mockup/car.jpg" data-src="assets/img/mockup/car.jpg" alt="" class="loaded" data-was-processed="true">
				    </div>
				    <div class="images__contein">
				       <img src="assets/img/mockup/StandingImgBlock-small2.jpg" data-src="assets/img/mockup/StandingImgBlock-small2.jpg" alt="" class="loaded" data-was-processed="true">
				    </div>
				</div>
			</a>
		</div>
		<div class="block-product__content flex-middle">
			<a class="block-product__link" href="/" title="">
	
				
				<h3 class="block-product__title block-product__item">Flera rader skulle kunna fungera såhär.</h3>
				
				
				
				<p class="block-product__price block-product__item">10.000 kr</p>
				
			</a>

			
				<div class="block-product__specs">
					
					<div class="product-controls__colors select-hover">
						<div class="product-controls__radio" data-num="1">
							<input type="radio" name="color" id="color-1" value="color-1" checked="">
							<label for="color-1">
								<img src="/assets/img/mockup/color1@2x.jpg" alt="color-1">
							</label>
						</div>
						<div class="product-controls__radio" data-num="2">
							<input type="radio" name="color" id="color-2" value="color-2">
							<label for="color-2">
								<img src="/assets/img/mockup/color2@2x.jpg" alt="color-2">
							</label>
						</div>
						<div class="product-controls__radio" data-num="3">
							<input type="radio" name="color" id="color-3" value="color-3">
							<label for="color-3">
								<img src="/assets/img/mockup/color1@2x.jpg" alt="color-3">
							</label>
						</div>
						<div class="product-controls__radio" data-num="4">
							<input type="radio" name="color" id="color-4" value="color-4">
							<label for="color-4">
								<img src="/assets/img/mockup/color2@2x.jpg" alt="color-4">
							</label>
						</div>
						<div class="product-controls__radio" data-num="5">
							<input type="radio" name="color" id="color-5" value="color-5">
							<label for="color-5">
								<img src="/assets/img/mockup/color1@2x.jpg" alt="color-5">
							</label>
						</div>
					</div>
					
					<div class="product-controls__line">
				
						<div class="product-controls__color-circles" aria-label="Possible colors">
							<ul>
								<li style="background: #D6D1CD;">
									<a href="#">Gray</a>
								</li>
								<li style="background: #444F7C;">
									Blue
								</li>
								<li style="background: #F1F1F1;">
									<a href="#">White</a>
								</li>
								<li style="background: #816050;">
									Brown
								</li>
								<li style="background: #333333;">
									Black
								</li>
							</ul>
						</div>
						
						<div class="product-controls__sizes" aria-label="Possible sizes">
							<ul accesskey="" data-num="1" class="active">
								<li>XXS</li>
								<li>XS</li>
								<li>S</li>
								<li>M</li>
								<li>L</li>
								<li>XL</li>
								<li>XXL</li>
							</ul>
							<ul data-num="2" class="">
								<li>XXS</li>
								<li>XS</li>
								<li>S</li>
							</ul>
							<ul data-num="3" class="">
								<li>S</li>
								<li>M</li>
								<li>L</li>
								<li>XL</li>
								<li>XXL</li>
							</ul>
							<ul data-num="4" class="">
								<li>L</li>
								<li>XL</li>
								<li>XXL</li>
							</ul>
							<ul data-num="5" class="">
								<li>XXS</li>
								<li>XS</li>
								<li>S</li>
								<li>M</li>
								<li>L</li>
								<li>XL</li>
								<li>XXL</li>
							</ul>
						</div>
					</div>

					
				</div>
			
		</div>

	</article>
</div>




<div class="col-xs-6 col-md-3">
	<article class="block-product block-product_extended">
		
		<button class="block-product__dream-button btn-link js-add-to-dreamlist" data-toggle="tooltip" data-placement="top" title="" data-original-title="Lägg till i min drömlista">
			<i class="icon icon-dream-star dreamlist-icon"></i>
		</button>
		

		

		<div class="block-product__image-wrapper">
			<a class="block-product__link" href="/" title="">
				<div class="block-product__image">
				    <div class="images__contein active">
				       <img src="assets/img/mockup/StandingImgBlock-small2.jpg" data-src="assets/img/mockup/StandingImgBlock-small2.jpg" alt="" class="loaded" data-was-processed="true">
				    </div>
				    <div class="images__contein">
				       <img src="assets/img/mockup/car.jpg" data-src="assets/img/mockup/car.jpg" alt="" class="loaded" data-was-processed="true">
				    </div>
				    <div class="images__contein">
				       <img src="assets/img/mockup/StandingImgBlock-small2.jpg" data-src="assets/img/mockup/StandingImgBlock-small2.jpg" alt="" class="loaded" data-was-processed="true">
				    </div>
				    <div class="images__contein">
				       <img src="assets/img/mockup/car.jpg" data-src="assets/img/mockup/car.jpg" alt="" class="loaded" data-was-processed="true">
				    </div>
				    <div class="images__contein">
				       <img src="assets/img/mockup/StandingImgBlock-small2.jpg" data-src="assets/img/mockup/StandingImgBlock-small2.jpg" alt="" class="loaded" data-was-processed="true">
				    </div>
				</div>
			</a>
		</div>
		<div class="block-product__content flex-middle">
			<a class="block-product__link" href="/" title="">
	
				
				<h3 class="block-product__title block-product__item">Flera rader skulle kunna fungera såhär.</h3>
				
				
				
				<p class="block-product__price block-product__item">10.000 kr</p>
				
			</a>

			
				<div class="block-product__specs">
					
					<div class="product-controls__colors select-hover">
						<div class="product-controls__radio" data-num="1">
							<input type="radio" name="color" id="color-1" value="color-1" checked="">
							<label for="color-1">
								<img src="/assets/img/mockup/color1@2x.jpg" alt="color-1">
							</label>
						</div>
						<div class="product-controls__radio" data-num="2">
							<input type="radio" name="color" id="color-2" value="color-2">
							<label for="color-2">
								<img src="/assets/img/mockup/color2@2x.jpg" alt="color-2">
							</label>
						</div>
						<div class="product-controls__radio" data-num="3">
							<input type="radio" name="color" id="color-3" value="color-3">
							<label for="color-3">
								<img src="/assets/img/mockup/color1@2x.jpg" alt="color-3">
							</label>
						</div>
						<div class="product-controls__radio" data-num="4">
							<input type="radio" name="color" id="color-4" value="color-4">
							<label for="color-4">
								<img src="/assets/img/mockup/color2@2x.jpg" alt="color-4">
							</label>
						</div>
						<div class="product-controls__radio" data-num="5">
							<input type="radio" name="color" id="color-5" value="color-5">
							<label for="color-5">
								<img src="/assets/img/mockup/color1@2x.jpg" alt="color-5">
							</label>
						</div>
					</div>
					
					<div class="product-controls__line">
				
						<div class="product-controls__color-circles" aria-label="Possible colors">
							<ul>
								<li style="background: #D6D1CD;">
									<a href="#">Gray</a>
								</li>
								<li style="background: #444F7C;">
									Blue
								</li>
								<li style="background: #F1F1F1;">
									<a href="#">White</a>
								</li>
								<li style="background: #816050;">
									Brown
								</li>
								<li style="background: #333333;">
									Black
								</li>
							</ul>
						</div>
						
						<div class="product-controls__sizes" aria-label="Possible sizes">
							<ul accesskey="" data-num="1" class="active">
								<li>XXS</li>
								<li>XS</li>
								<li>S</li>
								<li>M</li>
								<li>L</li>
								<li>XL</li>
								<li>XXL</li>
							</ul>
							<ul data-num="2" class="">
								<li>XXS</li>
								<li>XS</li>
								<li>S</li>
							</ul>
							<ul data-num="3" class="">
								<li>S</li>
								<li>M</li>
								<li>L</li>
								<li>XL</li>
								<li>XXL</li>
							</ul>
							<ul data-num="4" class="">
								<li>L</li>
								<li>XL</li>
								<li>XXL</li>
							</ul>
							<ul data-num="5" class="">
								<li>XXS</li>
								<li>XS</li>
								<li>S</li>
								<li>M</li>
								<li>L</li>
								<li>XL</li>
								<li>XXL</li>
							</ul>
						</div>
					</div>

					
				</div>
			
		</div>

	</article>
</div>

					`);
					renderProgressBar(current, total);
				}
			}
		});
	}

	if($('.js-infinite-scroll').length) {
    
		infinityScroll('.js-infinite-scroll');
	}

	function renderProgressBar(current, total) {
		let progressText = `du har tittat på ${current} av ${total} produkter `;
      
        

		$('.more-progress-bar').text(progressText);
		$('.products-value').text(`${total} produkter `);
		$('.more-progress-bar__indicator .more-progress-bar__filled').css('width', `calc(${current}% * 100 / ${total})`);
	}

	$('.js-remove-all-filters').on('click', deleteAllFilters);
	$('.js-product-filters-modal__btn').on('click', modalFiltersClose);
}