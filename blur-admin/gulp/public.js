'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var rimraf = require('gulp-rimraf');
var del = require('del');
var bundle = require('gulp-bundle-assets');
var less = require('gulp-less');
var run = require('gulp-run');
var deleteEmpty = require('delete-empty');


var publicSrc = conf.paths.dist;
var staticSrc = 'static';

process.env.NODE_ENV = 'production';

// gulp.task('bundle', function() {
//     return gulp.src('./bundle.config.js')
//         .pipe(bundle(
//             //bundleAllEnvironments: true,
//             //quietMode: true
//         ))
//         .pipe(bundle.results( {
//                 dest: './public',
//                 pathPrefix: '/'
//             }
//         )) // arg is destination of bundle.result.json
//         .pipe(gulp.dest('./public'));
// });
//
// gulp.task('clean:public', function () {
//     // return gulp.src('./public', { read: false })
//     //     .pipe(rimraf());
//     return del([
//         'public/**/*'
//     ]);
// });
//
// gulp.task('assets', function() {
//     return run('/usr/bin/python ./scripts/generate_html_assets.py').exec();
// });

// gulp.task('less', function () {
//     return gulp.src([
//         './less/**/*.less',
//         './static/js/components/spinner/less/**/*.less'
//     ])
//         .pipe(less({
//             // paths: [ path.join(__dirname, 'less', 'includes') ]
//             paths: [ path.join(__dirname, 'less', 'includes') ]
//         }))
//         .pipe(gulp.dest('./static/css'));
// });

gulp.task('delete-empty-directories', function () {
    deleteEmpty.sync(publicSrc + '/');
});

gulp.task('copyStatic', function () {
    return gulp
        .src([
            staticSrc + '/**',
            '!' + staticSrc + '/js/**',
            '!' + staticSrc + '/css/**',
            '!' + staticSrc + '/lang/**',
            '!' + staticSrc + '/partials/**',
            '!' + staticSrc + '/favicon/**'
        ])
        .pipe(gulp.dest(publicSrc));
});

gulp.task('copyFavicon', function () {
    return gulp
        .src([
            staticSrc + '/favicon/*'
        ])
        .pipe(gulp.dest(publicSrc));
});


// gulp.task('public', ['less', 'bundle', 'copyStatic', 'copyFavicon', 'assets']);
gulp.task('public-content', ['copyStatic', 'copyFavicon']);
gulp.task('public', ['public-content'], function () {
    gulp.start('delete-empty-directories');
});


