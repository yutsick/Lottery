window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

var navigation = require('./components/navigation');

$(function () {
	console.log('Hello world');
	navigation.init();

	$('.alert').on('closed.bs.alert', function () {
		$(this).fadeOut();
		console.log($(this));
	});

	$('#search').click(function () {
		let $search_container = $(this).parents('.search');

		if ($search_container.hasClass('js-is-active')) {
			console.log('Is activated');
			return true;
		}
		else {
			$search_container.addClass('js-is-active');
		}
	});
});
