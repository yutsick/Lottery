export default function() {
	let scrollable = $('.scrollable');
	window.addEventListener("scroll", Scroll);

	function Scroll() {
		if ($(this).scrollTop() > 20) {
			scrollable.addClass('is-scrolling');
		} else {
			scrollable.removeClass('is-scrolling');
		}
	}
}

