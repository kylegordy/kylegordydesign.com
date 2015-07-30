// Required plugins
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

// PostCSS magic
gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 2 version']}),
        mqpacker,
        csswring
    ];
    return gulp.src('src/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/css/'));
});

// Watch files for changes
gulp.task('watch', function() {
    gulp.watch('src/css/*.css', ['css']);
});

// Default task
gulp.task('default', ['css', 'watch']);
