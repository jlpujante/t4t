/**
 * @author j.l.pujante
 * created on 06.02.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .directive('pageTop', pageTop);

    /** @ngInject */
    function pageTop() {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/pageTop/pageTop.html',
            controller: function ($scope, authenticationApi, applicationService) {
                authenticationApi.getSession().then(function (resp) {
                    $scope.account = resp.data;
                });

                $scope.logout = function (e) {
                    if (e) {
                        e.preventDefault();
                    }
                    authenticationApi.logout();
                };

                $scope.settings = function (e) {
                    if (e) {
                        e.preventDefault();
                    }
                    applicationService.goSettings();
                };

                $scope.profile = function (e) {
                    if (e) {
                        e.preventDefault();
                    }
                    applicationService.goProfile();
                };
            }
        };
    }

})();