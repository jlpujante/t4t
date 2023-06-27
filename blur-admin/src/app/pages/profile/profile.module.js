/**
 * @author j.l.pujante
 * created on 06.02.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.profile', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('profile', {
                url: '/profile',
                title: 'Profile',
                templateUrl: 'app/pages/profile/profile.html',
                controller: 'ProfilePageCtrl',
            });
    }

})();
