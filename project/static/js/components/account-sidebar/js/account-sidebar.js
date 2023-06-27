var AccountSidebarComponent = angular.module('AccountSidebarComponent', ['authenticationApiService', 'companyApiService']);

// var TOOLBAR_HEIGHT = 48;
var TOOLBAR_HEIGHT = 64;

AccountSidebarComponent.directive('accountSidebarComponent', function () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: get_asset('/js/components/account-sidebar/html/account-sidebar.html'),
        scope: {},
        controller: function ($scope, $rootScope, $mdSidenav, authenticationApi, companyApi) {
            $scope.init = function () {
                $scope.sidebarHeight = parseInt($scope.getWindowHeight() - TOOLBAR_HEIGHT) + "px";
                // $scope.toggleLeft = $scope.buildToggler('left');
                $scope.close = $scope.buildToggler('account-sidebar');

                $scope.mapStyle = '';
                $scope.trafficInfo = false;
                $scope.nightMode = false;
                $scope.themeModeEvent = false;

                authenticationApi.getSession().then(function (resp) {
                    $scope.account = resp.data;
                    console.log($scope.account);
                    companyApi.getCompany($scope.account.company_id).then(function (resp) {
                        $scope.company = resp.data;
                        console.log($scope.company);
                    });
                });
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

            $scope.$watch('trafficInfo', function() {
                console.log('trafficInfo event...');
                if ($scope.trafficInfo) {
                    $rootScope.$broadcast('traffic.on');
                } else {
                    $rootScope.$broadcast('traffic.off');
                }
            });
            $scope.$watch('nightMode', function() {
                console.log('nightMode event...');
                if (!$scope.themeModeEvent) {
                    if ($scope.nightMode) {
                        $rootScope.$broadcast('theme.night.on');
                    } else {
                        $rootScope.$broadcast('theme.night.off');
                    }
                } else {
                    $scope.themeModeEvent = false;
                }
            });
            $scope.$watch('mapStyle', function() {
                $rootScope.$broadcast('map.styling', $scope.mapStyle);
            });

            $scope.init();
        }
    }
});
