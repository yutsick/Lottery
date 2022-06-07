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

	modalOpen('.js-mediaBlock__video');
	modalCloseVideo('.mediaBlock__video .js-modal-close');
		
	modalClose('.bingoinfo-modals__close .js-modal-btn-close');
	modalOpen('.allbingos .bingo-info-btn');

	modalOpen('.js-btn-openModal');
	modalSchemasOpen('.js-schemas-modal-tabs');
	modalSchemasClose('.schemas-modal-tabs .js-modal-close');
	
	modalClose('.js-modal-close');
}