var SidebarComponent = angular.module('SidebarComponent', []);

// var TOOLBAR_HEIGHT = 48;
var TOOLBAR_HEIGHT = 64;

SidebarComponent.directive('sidebarComponent', function () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: get_asset('/js/components/sidebar/html/sidebar.html'),
        scope: {},
        controller: function ($scope, $mdSidenav) {
            $scope.init = function () {
                // $scope.openLeftMenu = function () {
                //     $mdSidenav('left').toggle();
                // };
                $scope.sidebarHeight = parseInt($scope.getWindowHeight() - TOOLBAR_HEIGHT) + "px";
                $scope.toggleLeft = $scope.buildToggler('left');
                $scope.toggleRight = $scope.buildToggler('right');
            };
            $scope.getWindowWidth = function() {
                return parseInt($('.application-body').css('width'));
            };
            $scope.getWindowHeight = function() {
                return parseInt($('.application-body').css('height'));
            };
            $scope.buildToggler = function (componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                }
            };
            $scope.init();
        }
    }
});
