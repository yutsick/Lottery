import alert from "../components/alert";

export default function () {
	top_show_hide();
// 	fixed_menu();

	let $top = $('#top');
	let $top_menu = $('.top-menu');
	let $top_account = $('.top-account');
	let top_height = parseInt($top_menu.outerHeight() + $top_account.outerHeight());
	let mobile_width = 768;



    $(".msgcontent").delay(2000).queue(function(next){
        $(".msgcontent").addClass("new-message__show").animate({ left: "-200" }, 1500 )
        ;
        next();

            $(".msgcontent").delay(15000).queue(function(second){
                $(".msgcontent").removeClass("new-message__show");
                second();
            });

    });


    $(document).ready(function () {
        $(".new-message__button").click(function() {
            $(".msgcontent").removeClass("new-message__show");
        });
    });

        function fixed_menu() {
		$(window).scroll(function () {
			let $alert = $('#alert-cookie');
			let alert_height = $alert.outerHeight();
			alert_height = alert_height ? alert_height : 0;
			let scroll_top = $(window).scrollTop();

			if (scroll_top > alert_height) {
				$top.addClass('js-is-fixed');
			}
			else {
				$top.removeClass('js-is-fixed');
			}
		});
	}


    // Hide Header on on scroll down
	function top_show_hide() {
		let didScroll;
		let lastScrollTop = 0;
		let delta = 5;

		$(window).scroll(function () {
			let $win = $(this);

			if ($win.width() <= mobile_width) {
				didScroll = true;
			}
		});

		setInterval(function () {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 250);





		function hasScrolled() {
			let st = $(this).scrollTop();
			let $win = $(window);
			if (Math.abs(lastScrollTop - st) <= delta)
				return;

			if (st > lastScrollTop && st > top_height) {
				$top_account.removeClass('js-top-down').addClass('js-top-up');
			} else {
				if (st + $win.height() < $(document).height()) {
					$top_account.removeClass('js-top-up').addClass('js-top-down');
				}
			}
			lastScrollTop = st;
		}
	}


}

