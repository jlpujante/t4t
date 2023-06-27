/**
 * @author j.l.pujante
 * created on 07.02.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('settings', {
                url: '/settings',
                title: 'Settings',
                templateUrl: 'app/pages/settings/settings.html',
                controller: 'SettingsPageCtrl'
            });
    }

})();
