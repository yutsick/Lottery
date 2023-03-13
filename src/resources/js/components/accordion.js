export default function() {
	function accordionToggle(th) {
		th.children('.accordion-content').slideUp('fast');
		if (th.hasClass('active')) {
			th.children('.accordion-content').slideDown('fast').addClass('active');
		} else {
			th.children('.accordion-content').slideUp('fast').removeClass('active');
		}
	}

	$('.accordion-item').each(function () {
		let th = $(this);
		accordionToggle(th);
	}).children('.accordion__title').click(function () {
		let th = $(this).parent('.accordion-item');
		th.toggleClass('active');
		accordionToggle(th);
	})

	// Tab-accordeon mode for block-faq
	function tabAccInit(accordion, btn, panel, box) {
		$(btn).on('click', function(e) {
			e.preventDefault();

			$(this).closest(accordion).find(btn).removeClass('active');

			$(this).closest(accordion).find(panel).removeClass('active');
			$(this).closest(accordion).find(panel).slideUp();

			$(this).addClass('active');
			$(this).next(panel).addClass('active');
			$(this).next(panel).slideDown();
			$(this).closest(accordion).find(box).html($(this).next(panel).html());

			panelBorderRadiusActivate();
		})
	}
	tabAccInit('.js-tabAcc', '.js-tabAcc__btn', '.js-tabAcc__panel', '.js-tabAcc__box-panel');

	function panelBorderRadiusActivate(){
		if($('.js-tabAcc__btn').first().hasClass('active')){
			$('.js-tabAcc__box-panel').css('border-top-left-radius','0')
		} else {
			$('.js-tabAcc__box-panel').css('border-top-left-radius','8px')
		}

		if($('.js-tabAcc__btn').last().hasClass('active')){
			$('.js-tabAcc__box-panel').css('border-bottom-left-radius','0')
		} else {
			$('.js-tabAcc__box-panel').css('border-bottom-left-radius','8px')
		}
	}

	panelBorderRadiusActivate(); 


}