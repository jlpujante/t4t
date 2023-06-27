/**
 * @author j.l.pujante
 * created on 07.02.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.devices', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('devices', {
                url: '/devices',
                templateUrl: 'app/pages/devices/smart/tables.html',
                controller: 'DevicesPageCtrl',
                title: 'Devices',
                // scope: {},
                // restrict: 'E',
                // replace: true,
                // scope: true,
                sidebarMeta: {
                    icon: 'ion-ios-navigate',
                    order: 0,
                },
            });
    }

})();
