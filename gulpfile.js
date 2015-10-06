// Required plugins
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var lost = require('lost');

var paths = {
  cssSource: 'src/css/',
  cssDestination: 'dist/css/'
};

// PostCSS magic
gulp.task('css', function () {
    var processors = [
        lost,
        autoprefixer({browsers: ['last 2 version']}),
        mqpacker,
        csswring
    ];
    return gulp.src(paths.cssSource + '**/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest(paths.cssDestination));
});

// Watch files for changes
gulp.task('watch', function() {
    gulp.watch(paths.cssSource + '**/*.css', ['css']);
});

// Default task
gulp.task('default', ['css', 'watch']);
