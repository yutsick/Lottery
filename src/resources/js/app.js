window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

var navigation = require('./components/navigation');

$(function () {
    console.log('Hello world');
    navigation.init();
});
