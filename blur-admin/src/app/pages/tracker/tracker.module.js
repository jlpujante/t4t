/**
 * @author j.l.pujante
 * created on 30.01.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.tracker', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('tracker', {
                url: '/tracker',
                templateUrl: 'app/pages/tracker/google-maps/google-maps.html',
                controller: 'GmapTrackerPageCtrl',
                title: 'Tracker',
                scope: {
                    itemId: '='
                },
                sidebarMeta: {
                    icon: 'ion-ios-location',
                    order: 0,
                },
            });
    }

})();
