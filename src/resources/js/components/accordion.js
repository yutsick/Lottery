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

	//accordion second variant
	$('.acc-title').on('click', function (){
		var th = $(this),
			accBlock = th.closest('.acc-second'),
			accTitle = accBlock.find('.acc-title'),
			accBody = accBlock.find('.acc-body');

		if (!th.hasClass('active')) {
			accTitle.removeClass('active');
			accBody.slideUp(300);
			th.addClass('active');
			th.closest('.acc-item').find('.acc-body').slideDown(300);
		}
	});
}