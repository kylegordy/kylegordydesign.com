const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const cp = require('child_process');
const browserSync = require('browser-sync');
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Rebuild Jekyll and page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: true
    });
});

// Compile files
gulp.task('sass', function () {
    return gulp.src('assets/_sass/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            onError: browserSync.notify
        }))
        .on('error', function(err){
            console.error(err.message);
            browserSync.notify('Error: Check yo SASS 🤮', 10000);
            this.emit('end');
        })
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

// Watch scss and html
gulp.task('watch', function () {
    gulp.watch('assets/_sass/**/*.scss', ['sass']);
    gulp.watch('assets/js/**/*.js', ['jekyll-rebuild']);
    gulp.watch(['_config.yml', '*.md', '*.html', '_layouts/*.html', '_includes/**/*.html', '_pages/*.html', '_work/*.md', 'assets/img/**/*', '_posts/*'], ['jekyll-rebuild']);
});

//  Default task
gulp.task('default', ['browser-sync', 'watch']);
