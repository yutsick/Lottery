window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');
var modernizr = require('./vendor/modernizr-custom.js');
var flickity = require('flickity/dist/flickity.pkgd.js');

var alert = require('./components/alert');
var form = require('./components/form');
var modal = require('./components/modal');
var slider = require('./components/slider');
var navigation = require('./layout/navigation');
var footer = require('./layout/footer');
var search = require('./components/search');

$(function () {
	console.log('Hello world');
	modernizr.init();
	alert.init();
	form.init();
	modal.init();
	search.init();
	navigation.init();
	// slider.init();
	footer.init();

	$('.block-slider').flickity({
		cellSelector: '.block-slider__item',
		draggable: true,
		cellAlign: 'left',
		wrapAround: false,
		contain: false,
		pageDots: true,
		prevNextButtons: true
	});
});
