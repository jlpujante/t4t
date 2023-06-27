/**
 * @author j.l.pujante
 * created on 07.02.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('applicationService', applicationService);

    /** @ngInject */
    function applicationService($location, $http) {

        return {
            goHome: function () {
                $(location).attr('href', '/');
            },
            goSettings: function () {
                $location.path('/settings');
            },
            goProfile: function () {
                $location.path('/profile');
            },
            goTracker: function () {
                $location.path('/tracker');
            },
            getMapStyling: function () {
                return $http.get("/map/styling");
            }
        }
    }
})();
