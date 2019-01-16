window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');
require('bootstrap-validator');

var fizzyUIUtils = require('fizzy-ui-utils');
var Flickity = require('flickity/dist/flickity.pkgd.js');
require('lightgallery.js/dist/js/lightgallery.min.js');
require('lg-thumbnail.js/dist/lg-thumbnail.js');

/* Vendor */
import modernizr from './vendor/modernizr-custom.js';

/* Components */
import addToDreamlist from './components/add-to-dreamlist';
import alert from './components/alert';
import bonusCode from './components/bonus-code';
import checkboxTrigger from './components/checkbox-trigger';
import dataList from './components/data-list';
import dreamlistTooltip from './components/dreamlist-tooltip';
import entityCollectionActions from './components/entity-collection-actions';
import form from './components/form';
import imageGallery from './components/image-gallery';
import scrolling from './components/is-scrolling';
import loadSection from './components/load-section';
import message from './components/message';
import modal from './components/modal';
import paymentMethod from './components/payment-method';
import ProductList from './components/product-list';
import removeFromDreamlist from './components/remove-from-dreamlist';
import scrollToElement from './components/scrollToElement';
import search from './components/search';
import slider from './components/slider';
import sortValue from './components/sort-value';
import tableSelect from './components/table-select';
import toggleContent from './components/toggle-content';
import triggerTooltip from './components/trigger-tooltip';
import walletAccountSwitch from './components/wallet-account-switch';
import walletTransferAmount from './components/wallet-transfer-amount';
import orderActions from './components/order-actions';
import cartQuantity from './components/cart-quantity';
import bankIDForm from './components/bankid-form';

/* Layout */
import navigation from './layout/navigation';
import register from './layout/register';
import top from './layout/top';

/* Utilities */
import textToggle from './utilities/textToggle';

$(function () {
	modernizr();
	addToDreamlist();
	alert();
	bonusCode();
    checkboxTrigger();
	dataList();
	dreamlistTooltip();
	new entityCollectionActions();
	form();
	imageGallery();
	scrolling();
	loadSection();
	message();
	modal();
	paymentMethod();
	new ProductList();
	removeFromDreamlist();
	scrollToElement();
	search();
	slider();
	sortValue();
	tableSelect();
	toggleContent();
	triggerTooltip();
	walletAccountSwitch();
	walletTransferAmount();
	navigation();
	register();
	top();
	textToggle();
    new orderActions();
    new cartQuantity();
	bankIDForm();
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