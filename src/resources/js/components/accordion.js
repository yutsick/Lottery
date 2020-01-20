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
}