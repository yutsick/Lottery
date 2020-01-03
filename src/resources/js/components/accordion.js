export default function() {
	function accordionToggle (th) {
		th.children('.accordion-content').slideUp('fast');
		if (th.hasClass('active')) {
			th.children('.accordion-content').slideDown('fast').addClass('active');
		} else {
			th.children('.accordion-content').slideUp('fast').removeClass('active');
		}
	}

	$('.accordion-item').each(function () {
		let th = $(this);
		accordionToggle (th)
	}).click(function () {
		let th = $(this);
		th.toggleClass('active');
		accordionToggle (th)
	})
}

