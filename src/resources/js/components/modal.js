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
				$(button.getAttribute('data-target')).addClass('active');
				$('body').addClass("modal-open");
			};
		});
	};

	function modalClose(btn) {
		$(btn).on('click', (evt) => {
			evt.preventDefault();
			let button = evt.currentTarget;

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

			$('.js-bingolobby__howitworks__video').find('video')[0].pause();
			$('.js-bingolobby__howitworks__video').find('video')[0].currentTime = 0;
		});
	}

	function modalSchemasOpen(btn, target) {
		$(btn).on('click', (evt) => {
			evt.preventDefault();
			let button = evt.currentTarget;

			$(button.getAttribute('data-target')).addClass('active');
			$('body').addClass("modal-open");

			$('.js-bingolobby-tabs-panel').removeClass('active');
			$(target).addClass('active');
			$('.bingolobby__schemas-tab[href="' + target + '"]').addClass('active');
		});
          
	}

	function modalSchemasClose(btn) {
		$(btn).on('click', (evt) => {
			evt.preventDefault();
			let button = evt.currentTarget;

			$(button.getAttribute('data-target')).removeClass('active');
			$('body').removeClass('modal-open');
			$('.js-bingolobby-tabs-panel').removeClass('active');
			$('.bingolobby__schemas-tab').removeClass('active');
		});
		
	}

	//reset modals of M-T when resize (close panels of D when T-M resize)
	$(window).resize(function() {
		if($( window ).width() <= 992 && $( window ).width() > 742) {
			
			$('.js-bingolobby-tabs-panel').removeClass('active');
			$('.bingolobby__schemas-modal').removeClass('active');

			$('.js-campaign-tabs-panel').removeClass('active');
			$('.bingolobby__schemas-modal').removeClass('active');

			$('body').removeClass('modal-open');
		}
	});

	modalSchemasOpen('.bingolobby-tabs .js-btn-toBingoschema', '#bingolobby-tab4');
	modalSchemasClose('.bingolobby__schemas-modal .js-modal-btn-close');

	modalSchemasOpen('.bingolobby-tabs .js-btn-toFaq', '#bingolobby-tab7');
	modalSchemasClose('.bingolobby-tabs #bingolobby-tab7 .js-modal-btn-close');

	modalOpen('.js-bingolobby__howitworks__video');
	modalCloseVideo('.bingolobby__howitworks__video .js-modal-btn-close');
		
	modalClose('.bingolobby-tabs .bingoinfo-modals__close .js-modal-btn-close');
	modalOpen('.allbingos .bingo-info-btn');

	modalOpen('.campaign-tabs .js-btn-toBingoschema');
	modalOpen('.campaign-tabs .js-btn-toFaq');
	modalClose('#campaign-tab3 .js-modal-btn-close');
	modalClose('#campaign-tab2 .js-modal-btn-close');
}