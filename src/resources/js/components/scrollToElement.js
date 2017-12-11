export default function() {
	$(".js-scroll-to").click(function() {
		let $element = $(this).attr('id');

		$('html, body').animate({
			scrollTop: $("." + $element).offset().top
		}, 500);
	});
}