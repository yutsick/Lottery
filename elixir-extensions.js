const elixir = require('laravel-elixir');
const gulp = require('gulp');
const Task = elixir.Task;
const fileinclude = require('gulp-file-include');
const rename = require('gulp-rename');

/*
 |----------------------------------------------------------------
 | Elixir extensions
 |----------------------------------------------------------------
 |
 | Here we can define custom gulp tasks that aren't included
 | in elixir by default. Check documentation at:
 | https://laravel.com/docs/5.2/elixir#writing-elixir-extensions
 |
 */
elixir.extend('fileinclude', function () {
    new Task('fileinclude', function () {

        this.recordStep('Compiling HTML');

        // grab 'template'
        gulp.src('src/templates/**/*.tpl.html')

            // include partials
            .pipe(fileinclude({
                prefix: '@@',
                basepath: 'src/templates/partials',
                filters: {
                    json: JSON.stringify
                }
            }))

            .on('error', function (err) {
                console.log(err);
                this.emit('end');
            })

            // remove .tpl.html extension name
            .pipe(rename({
                extname: ""
            }))

            // add new extension name
            .pipe(rename({
                extname: ".html"
            }))

            // move file to folder
            .pipe(gulp.dest('./dist'));

        this.recordStep('Saving to Destination');

    }).watch('src/templates/**/*');
});
