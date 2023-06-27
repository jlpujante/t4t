module.exports = {
    bundle: {
        // spinner: {
        //     options: {
        //         uglify: false
        //     },
        //     scripts: [
        //         'static/js/components/spinner/html/spinner.html'
        //     ]
        // },
        login: {
            options: {
                uglify: false,
                minCSS: false
            },
            scripts: [
                './bower_components/jquery/dist/jquery.min.js',
                './bower_components/ladda/dist/spin.min.js',
                './bower_components/ladda/dist/ladda.min.js',
                'static/js/login.js'
            ],
            styles: [
                './bower_components/reset-css/reset.css',
                'static/css/login.css'
            ]
        },
        main: {
            options: {
                uglify: false,
                minCSS: false
            },
            // scripts: './static/js/**/*.js',
            scripts: [
                'public/assets_info.js',
                'static/js/assets.js',
                'static/js/components/account-sidebar/js/account-sidebar.js',
                'static/js/components/sidebar/js/sidebar.js',
                'static/js/components/google_maps/js/google_maps.js',
                'static/js/components/spinner/js/spinner.js',
                'static/js/services/api/tracker_api.js',
                'static/js/services/api/company_api.js',
                'static/js/services/authentication/authentication.js',
                'static/js/controllers/main.js',
                'static/js/controllers/list.js',
                'static/js/controllers/home.js',
                'static/js/directives.js',
                'static/js/factories.js',
                'static/js/filters.js',
                'static/js/app.js'
            ],
            styles: [
                'static/css/simple-spinner.css',
                'static/css/style.css'
            ]
        },
        vendor: {
            options: {
                uglify: false,
                minCSS: true
            },
            scripts: [
                './bower_components/jquery/dist/jquery.min.js',
                './bower_components/bootstrap/dist/js/bootstrap.min.js',
                './bower_components/ladda/dist/spin.min.js',
                './bower_components/ladda/dist/ladda.min.js',
                './bower_components/lodash/lodash.min.js',
                './bower_components/messenger/build/js/messenger.min.js',
                './bower_components/messenger/build/js/messenger-theme-flat.js',
                './bower_components/sweetalert/dist/sweetalert.min.js',
                './bower_components/angular/angular.min.js',
                './bower_components/angular-route/angular-route.min.js',
                './bower_components/angular-animate/angular-animate.min.js',
                './bower_components/angular-sanitize/angular-sanitize.min.js',
                './bower_components/angular-translate/angular-translate.min.js',
                './bower_components/angular-strap/dist/angular-strap.min.js',
                './bower_components/angular-strap/dist/angular-strap.tpl.min.js',
                './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                './bower_components/angular-loading-bar/build/loading-bar.min.js',
                './bower_components/angular-material/angular-material.min.js',
                './bower_components/moment/min/moment-with-locales.min.js',
                './bower_components/angular-moment/angular-moment.min.js',
                './bower_components/angular-aria/angular-aria.min.js',
                './bower_components/angular-material-icons/angular-material-icons.min.js',
                './bower_components/md-data-table/dist/md-data-table.js',
                './bower_components/md-data-table/dist/md-data-table-templates.js'
                // './bower_components/angular-material-data-table/dist/md-data-table.min.js'
            ],
            styles: [
                './bower_components/html5-boilerplate/dist/css/normalize.css',
                './bower_components/html5-boilerplate/dist/css/main.css',
                './bower_components/messenger/build/css/messenger.css',
                './bower_components/messenger/build/css/messenger-spinner.css',
                './bower_components/messenger/build/css/messenger-theme-flat.css',
                './bower_components/sweetalert/dist/sweetalert.css',
                './bower_components/angular-loading-bar/build/loading-bar.css',
                './bower_components/angular-motion/dist/angular-motion.css',
                './bower_components/angular-material/angular-material.min.css',
                './bower_components/md-data-table/dist/md-data-table-style.css'
                // './bower_components/angular-material-data-table/dist/md-data-table.min.css'

            ]
        }
    }
    // },
    // copy: './static/img/**/*.{png,svg}'
};

// https://www.npmjs.com/package/gulp-bundle-assets
// Advanced options: https://github.com/dowjones/gulp-bundle-assets/blob/master/examples/full/bundle.config.js