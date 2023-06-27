var appMain = angular.module('appMain', [
    'angular-loading-bar',
    'ngMaterial',
    // 'ngMdIcons',
    // 'md.data.table',
    // 'ui.bootstrap',
    'mdDataTable',
    'ngSanitize',
    'ngAnimate',
    'mgcrea.ngStrap',
    'pascalprecht.translate'
]);

appMain.config(function ($modalProvider) {
    angular.extend($modalProvider.defaults, {
        //animation: 'am-flip-x'
        animation: "am-fade-and-scale",
        placement: "center",
        keyboard: true,
        show: true
    });
});

// appMain.config(function ($mdIconProvider) {
//     $mdIconProvider
//         .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
//         .defaultIconSet('img/icons/sets/core-icons.svg', 24);
// });

appMain.config(function ($mdThemingProvider) {
    // $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('blue-grey');
    $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('orange').warnPalette('red');
});

// drhouseMain.config(function($popoverProvider) {
//     angular.extend($popoverProvider.defaults, {
//         templateUrl: get_asset('/partials/popover/popover.tpl.html')
//     });
// });

// appMain.config(function($httpProvider, $translateProvider) {
//     $translateProvider.useStaticFilesLoader({
//         prefix: '/lang/',
//         suffix: '.json'
//     });
//     $translateProvider.preferredLanguage('en_US');
//     $translateProvider.useSanitizeValueStrategy('escape');
// });
