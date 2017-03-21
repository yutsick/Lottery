window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

var alert = require('./components/alert');
var form = require('./components/form');
var modal = require('./components/modal');
var navigation = require('./layout/navigation');
var footer = require('./layout/footer');
var search = require('./components/search');

$(function () {
	console.log('Hello world');
	alert.init();
	form.init();
	modal.init();
	search.init();
	navigation.init();
	footer.init();
});
