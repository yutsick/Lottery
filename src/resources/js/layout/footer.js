module.exports = {
	init() {
		footer_collapse();
		footer_toggle();

		var mobile_width = 768;

		function footer_collapse() {
			// Collapse on load - small screens
			let $collapse_items = $('.block-footer .collapse');
			let $win = $(document);

			$(function () {
				if ( $win.width() < mobile_width ) {
					$collapse_items.collapse('hide');
				}
			});
		}

		function footer_toggle() {
			let $footer_block = $('.block-footer');
			let $collapse_items = $('.block-footer .collapse');
			let $collapse_items_trigger = $('.block-footer [data-toggle="collapse"]');

			// Close open items
			$collapse_items.on('show.bs.collapse', function () {
				$collapse_items.collapse('hide');
			});

			$collapse_items.on('hidden.bs.collapse', function () {
				$footer_block.removeClass('js-is-active');
			});
			$collapse_items.on('shown.bs.collapse', function () {
				$footer_block.addClass('js-is-active');
			});

			// Don't respond on large screens
			$collapse_items_trigger.click(function () {
				let $win = $(document);
				if ( $win.width() >= mobile_width ) {
					return false;
				}
			});
		}
	}
};
