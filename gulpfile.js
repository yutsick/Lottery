const elixir = require('laravel-elixir');
require('./elixir-extensions');
require('laravel-elixir-fonts');

// Set assets path
elixir.config.assetsPath = 'src/resources';
elixir.config.publicPath = 'dist/assets';

// Autoprefixer options
elixir.config.css.autoprefix.options.browsers = ['last 4 version', 'ie 9', 'ie 10'];

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your application. Documentation: https://laravel.com/docs/5.3/elixir
 |
 */

elixir((mix) => {
	mix.sass([
		'app.scss'
	], elixir.config.publicPath + '/css');
	mix.sass([
		elixir.config.assetsPath + '/sass/legacy/ie-all.scss'
	], elixir.config.publicPath + '/css/ie-all.css');

    mix.webpack('app.js');

    mix.fileinclude();

    mix.copy(elixir.config.assetsPath + '/img', elixir.config.publicPath + '/img');
	mix.copy(elixir.config.assetsPath + '/fonts', elixir.config.publicPath + '/fonts');

    mix.browserSync({
        proxy: null,
        server: {
            baseDir: './dist/'
        },
        files: [
            './dist/**/*.html',
            elixir.config.publicPath + '/**/*.js',
            elixir.config.publicPath + '/**/*.css'
        ]
    });
});
