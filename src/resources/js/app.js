window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');
require('bootstrap-validator');
require('flickity/dist/flickity.pkgd.js');

import modernizr from './vendor/modernizr-custom.js';
import alert from './components/alert';
import form from './components/form';
import modal from './components/modal';
import navigation from './layout/navigation';
import top from './layout/top';
import footer from './layout/footer';
import search from './components/search';
import slider from './components/slider';

$(function () {
	console.log('Hello world');
	modernizr();
	alert();
	form();
	modal();
	search();
	navigation();
	top();
	footer();
	slider();
});
