export default function () {
	let $flickity = $('.block-slider').flickity({
		cellSelector: '.block-slider__item',
		cellAlign: 'left',
		wrapAround: true,
		contain: false,
		draggable: true,
		pageDots: true,
		prevNextButtons: true
	});

	// Disable previous button by default
	$flickity.find('.previous').addClass('disabled');

	$flickity.on('select.flickity', function () {
		let $this = $(this);
		let flkty = $this.data('flickity');
		let $previousButton = $this.find('.previous');

		if (flkty.selectedIndex == 0) {
			$previousButton.addClass('disabled');
		} else {
			$previousButton.removeClass('disabled');
		}
	});


	// Slider for post inner page
	const multiplePosts = $(".post-slider__item").length > 1;
	let $flickityPostSlider = $('.post-slider').flickity({
		cellSelector: '.post-slider__item',
		cellAlign: 'left',
		wrapAround: true,
		contain: false,
		draggable: multiplePosts,
		pageDots: multiplePosts,
		adaptiveHeight: false,
		prevNextButtons: multiplePosts
	});

	// Change caption position for mobile
	let maxHeight = Math.max.apply(null, $(".post-slider__caption").map(function () {
		return $(this).outerHeight();
	}).get());
	const captionHeightFn = () => {
		let curItem = $flickityPostSlider.data('flickity').selectedElement;

		if ( $(window).width() < 768 ) {

			$(curItem).closest('.post-slider').css('padding-bottom', (maxHeight));
			$(curItem).find('.post-slider__caption').css({
				'bottom': - (maxHeight),
				'height': maxHeight
			});
			$(".flickity-page-dots").css('bottom', (maxHeight + 20));

		} else {
			$(curItem).closest('.post-slider').css('padding-bottom', 0);
			$(".flickity-page-dots").css('bottom', 20);
			$(curItem).find('.post-slider__caption').css({
				'bottom': 0,
				'height': "auto"
			});
		}
	};

	// Disable previous button by default
	$flickityPostSlider.find('.previous').addClass('disabled');

	$flickityPostSlider.on('select.flickity', function () {
		let $this = $(this);
		let flkty = $this.data('flickity');
		let $previousButton = $this.find('.previous');
		console.log(flkty.selectedIndex);

		if (flkty.selectedIndex == 0) {
			$previousButton.addClass('disabled').fadeOut();
		} else {
			$previousButton.removeClass('disabled').fadeIn();
		}
		captionHeightFn();
	});

	if ($(".post-slider")[0]){
		captionHeightFn();
		$(window).resize(function() {
			captionHeightFn();
		});
	}

	$(".js-show-description").click(function (e) {
		let th = $(this);
		if (th.attr('href') == '') {
			e.preventDefault();
			th.closest(".block-promotion__content").siblings('.block-slider-description').toggleClass("on");
		}
	});

	$(".js-hide-description").click(function (e) {
		e.preventDefault();
		$(this).parent().toggleClass("on");
	})


	// Products slider
	let $flickityProductSlider = $('.products-slider').flickity({
		cellSelector: '.product-slide',
		cellAlign: 'center',
		wrapAround: true,
		contain: false,
		draggable: false,
		pageDots: false,
		prevNextButtons: true,
	});

	//new lottery slider
	let $flickityLotterySlider = $('.online-lottery-slider').flickity({
		cellSelector: '.online-lottery-item-wrap',
		cellAlign: 'center',
		wrapAround: true,
		contain: false,
		draggable: true,
		pageDots: false,
		prevNextButtons: true,
		watchCSS: true
	});

	let lotterySliderOffset;
	if ($(window).width() < 767) {
		lotterySliderOffset = 170;
	} else {
		lotterySliderOffset = 250;
	}

	$('.lottery-slider-nav__list').on( 'click', '.lottery-slider-nav__item', function() {
		let index = $(this).index();
		$flickityLotterySlider.flickity( 'select', index );
		$('body,html').animate({
			scrollTop: $('.online-lottery-slider').offset().top - lotterySliderOffset
		}, 500);
	});

	//winners slider
	let winners = [{"NickName":"Ulf A","Time":"21:14","Amount":100,"GameType":"Lottery","GameName":"Miljonlotten 2021","GameId":"Miljonlotten 2021","AmountText":null,"PrizeType":"","Date":"2021-02-21","WhenDateTime":"/Date(1613938486000)/"},{"NickName":"Roger E","Time":"21:16","Amount":100,"GameType":"Lottery","GameName":"Miljonlotten 2021","GameId":"Miljonlotten 2021","AmountText":null,"PrizeType":"","Date":"2021-02-21","WhenDateTime":"/Date(1613938592000)/"},{"NickName":"Sven F","Time":"21:16","Amount":150,"GameType":"Lottery","GameName":"Miljonlotten 2021","GameId":"Miljonlotten 2021","AmountText":null,"PrizeType":"","Date":"2021-02-21","WhenDateTime":"/Date(1613938602000)/"},{"NickName":"Ulla E","Time":"21:17","Amount":100,"GameType":"Lottery","GameName":"Miljonlotten 2021","GameId":"Miljonlotten 2021","AmountText":null,"PrizeType":"","Date":"2021-02-21","WhenDateTime":"/Date(1613938629000)/"},{"NickName":"Roger E","Time":"21:18","Amount":500,"GameType":"Lottery","GameName":"Miljonlotten 2021","GameId":"Miljonlotten 2021","AmountText":null,"PrizeType":"","Date":"2021-02-21","WhenDateTime":"/Date(1613938687000)/"}]
	for (let i = 0; i < 10; i++) {
		if (winners[i]) {
			let j = i % 2;
			if (j == 0) {
				$('.winners-slider').append('<div class="winner-item style01">' +
					'<div class="icon"><img src="assets/img/icons/star-01.svg" alt=""></div><div class="text"><p>' + winners[i].NickName + '</p><p>' + winners[i].GameName + '</p></div></div>'
				);
			} else {
				$('.winners-slider').append('<div class="winner-item style02">' +
					'<div class="icon"><img src="assets/img/icons/star-02.svg" alt=""></div><div class="text"><p>' + winners[i].NickName + '</p><p>' + winners[i].GameName + '</p></div></div>'
				);
			}
		}
	}

	let $flickityWinnersSlider = $('.winners-slider').flickity({
		cellSelector: '.winner-item',
		cellAlign: 'center',
		wrapAround: true,
		draggable: false,
		pageDots: false,
		prevNextButtons: false,
		autoPlay: 5000
	});

	//
	$('.sbs').flickity({
		cellSelector: '.sbs__item',
		cellAlign: 'left',
		wrapAround: true,
		// draggable: false,
		pageDots: false,
		prevNextButtons: false,
		autoPlay: 5000
	});


	//block-bingo-slider on bingolobby page
	let bingoSliderOptions = {
		cellSelector: '.block-bingo__slide',
		cellAlign: 'left',
		wrapAround: true,
		draggable: true,
		pageDots: false,
		prevNextButtons: true,
		autoPlay: 5000,
	}

	// @media for slider
	if ( matchMedia('screen and (max-width: 596px)').matches ) {
		bingoSliderOptions.cellAlign = 'center';
	}
	$('.block-bingo-slider').flickity(bingoSliderOptions);

}


