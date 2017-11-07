window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');
require('bootstrap-validator');

var fizzyUIUtils = require('fizzy-ui-utils');
var Flickity = require('flickity/dist/flickity.pkgd.js');

import modernizr from './vendor/modernizr-custom.js';
import alert from './components/alert';
import form from './components/form';
import message from './components/message';
import modal from './components/modal';
import search from './components/search';
import slider from './components/slider';
import togglecontent from './components/toggle-content';
import walletaccountswitch from './components/wallet-account-switch';
import wallettransferamount from './components/wallet-transfer-amount';
import navigation from './layout/navigation';
import top from './layout/top';
import register from './layout/register';

$(function () {
	modernizr();
	alert();
	message();
	form();
	modal();
	search();
	navigation();
	top();
	slider();
	register();
	togglecontent();
    walletaccountswitch();
    wallettransferamount();
});

/**
 * Flickity Extension to handle custom styles on third from active slide.
 **/
Flickity.createMethods.push('_createPrevNextCells');

Flickity.prototype._createPrevNextCells = function () {
	this.on('select', this.setPrevNextCells);
};

Flickity.prototype.setPrevNextCells = function () {
	// remove classes
	changeSlideClasses(this.nextSlide, 'remove', 'is-third');
	// set slides
	var nextI = fizzyUIUtils.modulo(this.selectedIndex + 2, this.slides.length);
	this.nextSlide = this.slides[nextI];
	// add classes
	changeSlideClasses(this.nextSlide, 'add', 'is-third');
};

function changeSlideClasses(slide, method, className) {
	if (!slide) {
		return;
	}
	slide.getCellElements().forEach(function (cellElem) {
		cellElem.classList[method](className);
	});
}
