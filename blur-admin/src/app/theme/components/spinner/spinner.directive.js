/**
 * @author j.l.pujante
 * created on 31.01.2017
 */

var SPINNER_DELAY = 0;
var TYPE_1 = "bounce";
var TYPE_2 = "bars";
var TYPE_3 = "circles";
var TYPE_4 = "points";

(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .directive('spinnerComponent', spinnerComponent);

    /** @ngInject */
    function spinnerComponent() {
        return {
            restrict: 'EA',
            scope: {
                type: '@'
            },
            templateUrl: get_asset('/js/components/spinner/html/spinner.html'),
            replace: true,
            controller: function ($scope) {
                if (angular.isUndefined($scope.type) || $scope.type == TYPE_1) {
                    $scope.selected = 1;
                } else if ($scope.type == TYPE_2) {
                    $scope.selected = 2;
                } else if ($scope.type == TYPE_3) {
                    $scope.selected = 3;
                } else if ($scope.type == TYPE_4) {
                    $scope.selected = 4;
                } else {
                    $scope.selected = 1;
                }
            }
        };
    }

    angular.module('BlurAdmin.theme.components')
        .factory('spinnerService', spinnerService);

    /** @ngInject */
    function spinnerService() {
        return {
            show: function () {
                if (angular.isDefined($rootScope.spinner_timeout)) {
                    $timeout.cancel($rootScope.spinner_timeout);
                }
                $rootScope.spinner_timeout = $timeout(function () {
                    $('#spinner-container').css('visibility', 'visible');
                }, SPINNER_DELAY);
            },

            hide: function () {
                if (angular.isDefined($rootScope.spinner_timeout)) {
                    $timeout.cancel($rootScope.spinner_timeout);
                }
                $('#spinner-container').css('visibility', 'hidden');
                $rootScope.spinner_timeout = undefined;
            }
        };
    }

})();