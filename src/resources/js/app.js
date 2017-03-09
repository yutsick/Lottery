window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

var navigation = require('./components/navigation');
var modal = require('./components/modal');
var form = require('./components/form');

$(function () {
	console.log('Hello world');
	navigation.init();
	modal.init();
	form.init();

	$('.alert').on('closed.bs.alert', function () {
		$(this).fadeOut();
		console.log($(this));
	});

	$('#search').click(function () {
		let $search_container = $(this).parents('.search');

		if ($search_container.hasClass('js-is-active')) {
			return true;
		}
		else {
			$search_container.addClass('js-is-active');
		}
	});

	$('.navigation-search i').click(function () {
		let $search_container = $(this).parents('.navigation-search');
		let $search_input = $search_container.find('.form-control');

		if ($search_container.hasClass('js-is-active')) {
			if ($search_input.val()) {
				return true;
			}
			else {
				$search_container.removeClass('js-is-active');
			}
		}
		else {
			$search_container.addClass('js-is-active');
			$search_input.focus();
		}
	});
});
