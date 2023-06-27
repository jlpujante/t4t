var gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    del = require('del'),
    bundle = require('gulp-bundle-assets'),
    less = require('gulp-less'),
    run = require('gulp-run'),
    path = require('path');
    // webserver = require('gulp-webserver'),
    // sourcemaps = require('gulp-sourcemaps'),

var publicSrc = 'public/';
var staticSrc = 'static/';

process.env.NODE_ENV = 'production';

// gulp.task('bundle', ['clean:public'], function() {
gulp.task('bundle', function() {
    return gulp.src('./bundle.config.js')
        .pipe(bundle(
            //bundleAllEnvironments: true,
            //quietMode: true
        ))
        .pipe(bundle.results( {
                dest: './public',
                pathPrefix: '/'
            }
        )) // arg is destination of bundle.result.json
        .pipe(gulp.dest('./public'));
});

gulp.task('clean:public', function () {
    // return gulp.src('./public', { read: false })
    //     .pipe(rimraf());
    return del([
        'public/**/*'
    ]);
});


gulp.task('assets', function() {
    return run('/usr/bin/python ./scripts/generate_html_assets.py').exec();
});

gulp.task('less', function () {
    return gulp.src([
            './less/**/*.less',
            './static/js/components/spinner/less/**/*.less'
        ])
        .pipe(less({
            // paths: [ path.join(__dirname, 'less', 'includes') ]
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./static/css'));
});


// gulp.task('html', function() {
//   gulp.src(appSrc + '**/*.html');
// });
//
// gulp.task('css', function() {
//   gulp.src(appSrc + '**/*.css');
// });

gulp.task('copyStatic', function() {
  return gulp
    .src([
        'static/**',
        '!static/js/**',
        '!static/css/**',
        '!static/lang/**',
        '!static/partials/**',
        '!static/favicon/**'
    ])
    .pipe(gulp.dest(publicSrc));
});

gulp.task('copyFavicon', function() {
    return gulp
        .src([
            'static/favicon/*'
        ])
        .pipe(gulp.dest(publicSrc));
});

// gulp.task('copyLibs', function() {
//     return gulp
//         .src([
//             'node_modules/core-js/client/shim.min.js',
//             'node_modules/zone.js/dist/zone.js',
//             'node_modules/reflect-metadata/Reflect.js',
//             'node_modules/rxjs/bundles/Rx.js',
//             'node_modules/@angular/core/bundles/core.umd.js',
//             'node_modules/@angular/common/bundles/common.umd.js',
//             'node_modules/@angular/compiler/bundles/compiler.umd.js',
//             'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
//             'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
//             'node_modules/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
//         ])
//         .pipe(gulp.dest(publicSrc + 'vendor/js'));
// });

// gulp.task('copyApp', function() {
//     return gulp
//         .src([
//             'app/**'
//         ])
//         .pipe(gulp.dest(publicSrc + "app"));
// });


// gulp.task('webserver', function() {
//   gulp.src(appSrc)
//     .pipe(webserver({
//       livereload: true,
//       open: true
//     }));
// });

// gulp.task('webserver', function() {
//     return run('/bin/bash ./debug.sh').exec();
// });

// gulp.task('default', ['copyStatic', 'copyApp', 'copyLibs']);

gulp.task('all', ['less', 'bundle', 'copyStatic', 'copyFavicon', 'assets']);

gulp.task('watch', function() {
    // gulp.watch(tsSrc + '**/*.ts', ['typescript']);
    gulp.watch(staticSrc + 'js/**', ['bundle']);
    // gulp.watch(staticSrc + 'lang/**', ['lang']);
    gulp.watch(staticSrc + 'partials/**', ['all']);
    gulp.watch(staticSrc + 'less/**', ['all']);
    // gulp.watch(appSrc + '**/*.html', ['html']);
});

gulp.task('default', ['all', 'watch']);
gulp.task('clean', ['clean:public']);

