export default function() {
	let tooltip = $('[data-toggle="tooltip"]');

	// Trigger tooltip on hover
	tooltip.tooltip({
		trigger: 'hover'
	});


	/* Display tooltip only if the button is disabled */
	if (tooltip) {
		let btn = tooltip.find('.product-order__btn');

		if (btn.hasClass('btn-disabled')) {
			btn.parent().addClass('tooltip-on-touch');
		}
	}
 }