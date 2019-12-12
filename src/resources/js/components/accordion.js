export default function() {
	$('.accordion__content').each(function () {
		let th = $(this);
		if(th.is(':visible')) {
			th.siblings('.accordion__title').addClass('active');
		} else {
			th.siblings('.accordion__title').removeClass('active');
		}
	});

	$('.accordion__title').click(function () {
		let th = $(this);
		th.toggleClass('active');

		if (th.hasClass('active')) {
			console.log('1');
			th.siblings('.accordion__content').slideDown('fast');
		} else {
			th.siblings('.accordion__content').slideUp('fast');
		}
	})
}

