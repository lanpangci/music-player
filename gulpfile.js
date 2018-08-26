const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const htmlclean = require('gulp-htmlclean');
const uglify = require('gulp-uglify');
const strip = require('gulp-strip-debug');
const concat = require('gulp-concat');
const less = require('gulp-less');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const connect = require('gulp-connect');

const folder = {
    src: './src/',
    dist: './dist/'
}

const devMode = process.env.NODE_ENV == 'development';

gulp.task('html', () => {
    const html = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())
    // if (!devMode) {
    //     html.pipe(htmlclean())
    // }
    html.pipe(gulp.dest(folder.dist + 'html/'));
})

gulp.task('css', () => {
    const options = [autoprefixer(), cssnano()]
    const css = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
    // if (!devMode) {
    //     css.pipe(postcss(options))
    // }
    css.pipe(gulp.dest(folder.dist + 'css/'));
})

gulp.task('js', () => {
    const js = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
    // if (!devMode) {
    //     js.pipe(strip())
    //         .pipe(concat('main.js'))
    //         .pipe(uglify())
    // }
    js.pipe(gulp.dest(folder.dist + 'js/'));
})

gulp.task('images', () => {
    gulp.src(folder.src + 'images/*')
        .pipe(connect.reload())
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + 'images/'));
})

gulp.task('watch', () => {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
    gulp.watch(folder.src + 'images/*', ['images']);
})

gulp.task('connect', () => {
    connect.server({
        port: 8090,
        livereload: true
    })
})

gulp.task('default', ['html', 'css', 'js', 'images', 'watch', 'connect']);