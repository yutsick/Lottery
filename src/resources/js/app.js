window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');
require('bootstrap-validator');

var objectFitImages = require('object-fit-images');
var fizzyUIUtils = require('fizzy-ui-utils');
var Flickity = require('flickity/dist/flickity.pkgd.js');
require('lightgallery.js/dist/js/lightgallery.min.js');
require('lg-thumbnail.js/dist/lg-thumbnail.js');
/* Vendor */
import modernizr from './vendor/modernizr-custom.js';
/* Store */
import storeConfiguration from './store';
/* Components */
import addToDreamlist from './components/add-to-dreamlist';
import alert from './components/alert';
import accordion from './components/accordion';
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
import timeSpent from './components/time-spent';
import Odometer from './components/odometer';
import Carousel from './components/carousel';
import RegisterLottery from './components/register-lottery';
import Confetti from './components/confetti';

/* Layout */
import navigation from './layout/navigation';
import register from './layout/register';
import top from './layout/top';
import slideOutNavigation from './layout/slide-out-navigation';
import slideOutAccountNavigation from './layout/slide-out-account';
import navigationControl from './layout/navigation-control';
import navigationItem from './layout/navigation-item';

/* Utilities */
import textToggle from './utilities/textToggle';
import breakpointListener from './utilities/breakpoint-listener';
import scroller from './utilities/scroller';

$(function () {
	window.ML = window.ML || {};
	window.ML.store = storeConfiguration();
	window.ML.getBalanceBarHeight = () => {
        const balanceBar = document.querySelector('.balance-bar');
        if (balanceBar) {
            return balanceBar.offsetHeight;
        }
        return 0;
	};
	window.ML.confetti = Confetti;
	modernizr();
	new objectFitImages();
	addToDreamlist();
	alert();
	accordion();
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
	scroller();
	slideOutNavigation();
	slideOutAccountNavigation();
	navigationControl();
	navigationItem();
	Carousel();
	RegisterLottery.init();
	
	timeSpent.init('.js-timespent').start();
	Odometer();

	/* call breakpointListener last */
	breakpointListener();
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



