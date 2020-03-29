let gulp = require('gulp');
let pug = require('gulp-pug');
let sass = require('gulp-sass');
let postcss = require('gulp-postcss');
let rollup = require('rollup');
let concat = require('gulp-concat');
let concatCss = require('gulp-concat-css');
let resolve = require('rollup-plugin-node-resolve');
let babel = require('rollup-plugin-babel');
let browserSync = require('browser-sync').create();

gulp.task('build:templates', () => {
    return gulp.src('src/templates/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('build:vendor-css', () => {
    return gulp.src('src/vendor/css/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('build/css'));
});

gulp.task('build:scss', () => {
    return gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss())
        .pipe(gulp.dest('build/css'));
});

gulp.task('build:vendor-js', function () {
    return gulp.src('src/vendor/js/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build/js/'));
});

gulp.task('build:js', () => {
    return rollup.rollup({
        input: 'src/js/main.js',
        plugins: [
            resolve(),
            babel({
                exclude: 'node_modules/**'
            }),
        ],
    }).then(bundle => {
        return bundle.write({
            file: 'build/js/main.js',
            format: 'iife'
        });
    });
});

gulp.task('build:images', () => {
    return gulp.src('src/images/**/*', {
        allowEmpty: true
    })
        .pipe(gulp.dest('build/images'));
});

gulp.task('build:resources', () => {
    return gulp.src('src/resources/**/*', {
        dot: true,
        allowEmpty: true
    })
        .pipe(gulp.dest('build'))
});

gulp.task('build:fonts', () => {
    return gulp.src('src/fonts/**/*', {
        dot: true,
        allowEmpty: true
    })
        .pipe(gulp.dest('build/fonts'))
});

gulp.task('build', gulp.parallel(
    'build:templates',
    'build:vendor-css',
    'build:scss',
    'build:vendor-js',
    'build:js',
    'build:images',
    'build:fonts',
    'build:resources'
));

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: 'build'
        }
    });
});

gulp.task('watch', () => {
    gulp.watch('src/templates/**/*.pug', gulp.series('build:templates'));
    gulp.watch('src/vendor/css/**/*.css', gulp.series('build:vendor-css'));
    gulp.watch('src/scss/**/*.scss', gulp.series('build:scss'));
    gulp.watch('src/vendor/js/**/*.js', gulp.series('build:vendor-js'));
    gulp.watch('src/js/**/*.js', gulp.series('build:js'));
    gulp.watch('src/images/**/*', gulp.series('build:images'));
    gulp.watch('src/fonts/**/*', gulp.series('build:fonts'));
    gulp.watch(['src/resources/**/*', 'src/resources/**/.*'], gulp.series('build:resources'));
    gulp.watch('build/**/*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(
    'build',
    gulp.parallel(
        'serve',
        'watch'
    )
));