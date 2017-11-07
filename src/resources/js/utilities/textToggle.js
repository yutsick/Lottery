export default function () {
	$('[data-text-toggle]').bind('click', function () {
		let element = $(this);
		if (element.text() === element.data("text-toggle")) {
			element.text(element.data("text-original"));
		} else {
			element.data("text-original", element.text());
			element.text(element.data("text-toggle"));
		}
	})
}