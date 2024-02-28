export default function () {
	$('.js-action-register').click(function () {
		let $page = $('#page-wrapper');
		if ($page.hasClass('logged-out')) {
			$('#modal-login').modal();
		} else {
			return true;
		}
		return false;
	});

//start contact-info-popup

$(document).ready(function() {
  $('#submitBtn').prop('disabled', true);

  $('.modal-main__toggle-container').on('click', function() {
    const checkbox = $(this).find('.modal-main__toggle-checkbox');
    checkbox.prop('checked', !checkbox.prop('checked'));
  });

  function validateInput(input, regex, errorWindow) {
    const value = input.val().trim();
    if (value.trim()=== '') {
      return;
    }
    else if (!regex.test(value)) {
        errorWindow.show();
        input.css('border-color', 'rgba(255, 15, 0, 0.5)');
        return false;
    } else {
        errorWindow.hide();
        input.css('border-color', 'rgba(7, 70, 88, 0.5)');
        return true;
    }
}

  const validateField = (input, regex, window) => (validateInput($(input), regex, $(window)));

  $('#mailadress, #mobilnummer').on('blur', () => {
    const isValidEmail = validateField('#mailadress', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, '#errorWindow2');
    const isValidPhone = validateField('#mobilnummer', /^\+?\d{8,10}$/, '#errorWindow3');
    $('#submitBtn').prop('disabled', !(isValidEmail && isValidPhone));
  });

});

//end contact-info-popup


	$('.modal-login').on('shown.bs.modal', function (e) {
		$('.modal-backdrop').addClass('modal-backdrop-login');
		setTimeout(function () {
			$('.modal-login').removeClass("out");
		}, 100)
	});

	// Hide open modals when toggle.
	$('.modal').on('show.bs.modal', function (e) {
		$('.modal').modal('hide');
		$('body').addClass("bs-modal-open");

		//modal secondary - hide backdrop
		if ($(this).hasClass('modal-secondary')) {
			$('body').addClass("backdrop-invisible");
		}
	});

	// Modal-pages functionality.
	$('.js-change-modal-page').on('click', function () {
		let $this = $(this);
		let $modal = $this.parents('.modal');
		let page = $this.data('modal-page');
		let $modalPages = $modal.find('.modal-page');

		$modalPages.removeClass('modal-page--active');

		$modal.find('#' + page).addClass('modal-page--active');
	});


	let $termsOfServiceModal = $('#modal__terms-of-services');
	if($termsOfServiceModal.length > 0) {
		let openedByDefault = $termsOfServiceModal.data('opened-by-default');
		if(openedByDefault){
			$termsOfServiceModal.modal('show');
		}
	}

	//video
	$('#modal-video').on('hidden.bs.modal', function (e) {
		$(this).find('video')[0].pause();
		$(this).find('video')[0].currentTime = 0;
	});


	//bingolobby modals
	function modalOpen(btn) {
		$(btn).on('click', (evt) => {
			evt.preventDefault();
			let button = evt.currentTarget;
			let target = $(button.getAttribute('data-target'));

			if($(target).length) {
				$(target).addClass('active');
				$('body').addClass("modal-open");
			};
		});
	};

	function modalClose(btn) {
		$(btn).on('click', (evt) => {
			evt.preventDefault();
			let button = evt.currentTarget;

			$('.schema-tabs__panel-content.active').removeClass('active');
			$(button.getAttribute('data-target')).removeClass('active');
			$('body').removeClass('modal-open');
		});
	};

	function modalCloseVideo(btn) {
		$(btn).on('click', (evt) => {
			evt.preventDefault();
			let button = evt.currentTarget;

			$(button.getAttribute('data-target')).removeClass('active');
			$('body').removeClass('modal-open');

			$('.js-mediaBlock__video').find('video')[0].pause();
			$('.js-mediaBlock__video').find('video')[0].currentTime = 0;
		});
	}


	//schema-tabs section modal with 2 tabs OPEN
	function modalSchemasOpen(btn) {
		
		$(btn).on('click', (evt) => {
			evt.preventDefault();
			let button = evt.currentTarget;

			$(button.getAttribute('data-target')).addClass('active');
			$('body').addClass("modal-open");

			let tab1 = $('.js-schemas-modal-tabs__tab:nth-child(1)').attr('href');
			let tab2 = $('.js-schemas-modal-tabs__tab:nth-child(2)').attr('href');
			let tab3 = $('.js-schemas-modal-tabs__tab:nth-child(3)').attr('href');
			
			$(tab1).addClass('active panel-mobile-tab');
			$(tab2).addClass('panel-mobile-tab');
			$(tab3).addClass('panel-mobile-tab');

			$('.js-schemas-modal-tabs__tab:first-child').addClass('active');
		});
          
	}
	
	//schema-tabs section modal with 2 tabs CLOSE
	function modalSchemasClose(btn) {
		$(btn).on('click', (evt) => {
			evt.preventDefault();
			let button = evt.currentTarget;

			$(button.getAttribute('data-target')).removeClass('active');
			$('body').removeClass('modal-open');
			$('.schema-tabs__panel-content.active').removeClass('active');
			$('.schemas-modal-tabs__tab').removeClass('active');
		});
		
	}

	//reset modals of M-T when resize (close panels of D when T-M resize)
	$(window).resize(function() {
		if($( window ).width() <= 992 && $( window ).width() > 742) {
			
			$('.schemas-modal-tabs').removeClass('active');
			$('.schema-tabs__panel-content.active').removeClass('active');
			$('.schemas-modal-tabs__tab').removeClass('active');

			$('body').removeClass('modal-open');
		}
	});


	// popup-pinningvatt modal
	function cutText(){
		const cutEl = $('#popup-pinningvatt .cut_text');
		const cutText = $(cutEl).text();
		
		if (cutText.length > 180){
			$(cutEl).text(cutText.substring(0,180) + '...');
			$('#popup-pinningvatt .read_more').show();
		}
		$('#popup-pinningvatt .read_more').on('click', function(){
			$(cutEl).text(cutText);
			$(this).hide();
		})

	}

	function buttonEnable(){
		const radio = $('.content__questions_item input[type="radio"]');
		$(radio).on('click',function(){
			let radioSelected = $('.content__questions_item input[type="radio"]:checked');

			if(radio.length/2 == radioSelected.length){
				$('button[type="submit"]').prop('disabled', false); 
			}
		})

	}

	function popupChange(){

		$('#popup-pinningvatt #form-pinningvatt  button[type="submit"], #popup-pep button').on('click',function(e){
			e.preventDefault();
			$('.popup-pinn-pep').fadeOut(400);
		})


		$('#popup-pinningvatt .popup-first button[type="cancel"]').on('click', function(e){
			e.preventDefault();
			$('.popup-first').hide();
			$('.popup-sec').fadeIn(600);
		})
		$('#popup-pinningvatt .popup-sec button').on('click', function(e){
			e.preventDefault();
			$('.popup-pinn-pep').fadeOut(400);
		})
	}

	modalOpen('.js-mediaBlock__video');
	modalCloseVideo('.mediaBlock__video .js-modal-close');
		
	modalClose('.bingoinfo-modals__close .js-modal-btn-close');
	modalOpen('.allbingos .bingo-info-btn');

	modalOpen('.js-btn-openModal');
	modalSchemasOpen('.js-schemas-modal-tabs');
	modalSchemasClose('.schemas-modal-tabs .js-modal-close');
	
	modalClose('.js-modal-close');
	cutText();
	buttonEnable();
	popupChange(); 
}