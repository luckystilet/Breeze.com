var gulp = require('gulp'),
    pug = require('gulp-pug'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    sass = require('gulp-sass'),
    cache = require('gulp-cache'),
    spritesmith = require("gulp.spritesmith"),
    plumber = require("gulp-plumber"),
    notify = require("gulp-notify"),
    newer = require("gulp-newer"),
    autoprefixer = require('gulp-autoprefixer');

// Работа со Sass
gulp.task('sass', function() {
    return gulp.src([
            'dev/static/sass/main.scss',
        ])
        .pipe(plumber())
        .pipe(sass({
            'include css': true
        }))


    .on("error", notify.onError(function(error) {
            return "Message to the notifier: " + error.message;
        }))
        .pipe(autoprefixer(['last 2 version']))
        .pipe(gulp.dest('dev/static/css'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

// Работа с Pug
gulp.task('pug', function() {
    return gulp.src('dev/pug/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .on("error", notify.onError(function(error) {
            return "Message to the notifier: " + error.message;
        }))
        .pipe(gulp.dest('dev'));
});

// Browsersync
gulp.task('browsersync', function() {
    browsersync({
        server: {
            baseDir: 'dev'
        },
    });
});

// Работа с JS
gulp.task('scripts', function() {
    return gulp.src([
            'dev/static/libs/slick-carousel/slick/slick.js',
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dev/static/js'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

// Слежение
gulp.task('watch', ['browsersync', 'sass', 'scripts'], function() {
    gulp.watch('dev/static/sass/**/*.scss', ['sass']);
    gulp.watch('dev/pug/**/*.pug', ['pug']);
    gulp.watch('dev/*.html', browsersync.reload);
    gulp.watch(['dev/static/js/main.js', '!dev/static/js/libs.min.js', '!dev/static/js/jquery.js'], ['scripts']);
});

// Очистка папки сборки
gulp.task('clean', function() {
    return del.sync('prodact');
});

// Оптимизация изображений
gulp.task('img', function() {
    return gulp.src(['dev/static/img/**/*', '!dev/static/img/sprite/*'])
        .pipe(cache(imagemin({
            progressive: true,
            use: [pngquant()]

        })))
        .pipe(gulp.dest('product/static/img'));
});

// Сборка проекта

gulp.task('build', ['clean', 'img', 'stylus', 'scripts'], function() {
    var buildCss = gulp.src('dev/static/css/*.css')
        .pipe(gulp.dest('product/static/css'));

    var buildFonts = gulp.src('dev/static/fonts/**/*')
        .pipe(gulp.dest('product/static/fonts'));

    var buildJs = gulp.src('dev/static/js/**.js')
        .pipe(gulp.dest('product/static/js'));

    var buildHtml = gulp.src('dev/*.html')
        .pipe(gulp.dest('product/'));

    var buildImg = gulp.src('dev/static/img/sprite/sprite.png')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('product/static/img/sprite/'));
});

// Очистка кеша
gulp.task('clear', function() {
    return cache.clearAll();
});

// Дефолтный таск
gulp.task('default', ['watch']);
