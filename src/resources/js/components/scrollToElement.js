export default function() {
	$(".js-scroll-to").click(function() {
		let element = $(this).attr('id');
		let fixedElements = $(".top-menu").height() + $(".product-cart").height();
		let offsetTop = $("." + element).offset().top;
		let scrollTopVal = offsetTop - fixedElements;

		$('html, body').animate({
			scrollTop: scrollTopVal
		}, 500);
	});
}