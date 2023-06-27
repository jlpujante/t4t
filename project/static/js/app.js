var trackerApp = angular.module('trackerApp', [
    'ngRoute',
    'Filters',
    'Factories',
    'Directives',
    'HomeController',
    'ListController',
    'SpinnerComponent',
    'SidebarComponent',
    'AccountSidebarComponent',
    'GoogleMapsComponent',
    'trackerApiService',
    'authenticationApiService',
    'companyApiService',
    'appMain'
]);

trackerApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/tracker', {
            templateUrl: get_asset('/partials/home_partial.html'),
            controller: 'HomeCtrl'
        }).when('/tracker/:truckId/route', {
            templateUrl: get_asset('/partials/home_partial.html'),
            controller: 'HomeCtrl'
        }).when('/list', {
            templateUrl: get_asset('/partials/list_partial.html'),
            controller: 'ListCtrl'
        }).otherwise({
            redirectTo: '/tracker'
        });
    }
]);