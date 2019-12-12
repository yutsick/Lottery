export default function() {
	$('.accordion__content').hide();

	$('.accordion__title').click(function () {
		let th = $(this);
		th.toggleClass('active');

		if (th.hasClass('active')) {
			console.log('1');
			th.siblings('.accordion__content').slideDown('fast').addClass('active');
		} else {
			th.siblings('.accordion__content').slideUp('fast').removeClass('active');
		}
	})
}

