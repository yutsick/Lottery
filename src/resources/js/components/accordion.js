export default function() {
	function accordionToggle (th) {
		th.next().slideUp('fast');
		if (th.hasClass('active')) {
			th.next('.accordion-content').slideDown('fast').addClass('active');
		} else {
			th.next('.accordion-content').slideUp('fast').removeClass('active');
		}
	}

	$('.accordion__title').each(function () {
		let th = $(this);
		accordionToggle (th)
	}).click(function () {
		let th = $(this);
		th.toggleClass('active');
		accordionToggle (th)
	})
}

