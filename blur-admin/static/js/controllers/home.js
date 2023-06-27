var HomeController = angular.module('HomeController', []);

HomeController.controller('HomeCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$window', '$mdSidenav',
    'spinnerService', 'trackerApi', 'authenticationApi',
    function ($scope, $rootScope, $routeParams, $location, $window, $mdSidenav, spinnerService, trackerApi, authenticationApi) {
        $scope.init = function () {
            // spinnerService.show();
            $scope.url_img_logo = get_asset('/img/logo.png');
            $scope.trafficInfo = false;
            $scope.mapStyle = '';
            $scope.nightMode = false;
            $scope.themeModeEvent = false;
            $scope.truckId = undefined;

            $scope.trucksList = [];
            $scope.trucksSelectedList = [];
            $scope.selectedItem = null;
            $scope.searchText = null;
            $scope.autocompleteDemoRequireMatch = true;

            if ($routeParams.truckId) {
                $scope.truckId = $routeParams.truckId;
                // trackerApi.getTruckRoute($scope.itemId).then(function (resp) {
                //     $scope.truckCheckpointList = resp.data;
                // });
            } else {
                trackerApi.getTrucksPosition().then(function (resp) {
                    $scope.trucksList = resp.data.map(function (item) {
                        item._lowername = item.name.toLowerCase();
                        item._lowertype = item.type.toLowerCase();
                        return item;
                    });
                });
            }

            $scope.toggleLeft = $scope.buildToggler('left');
            $scope.toggleRight = $scope.buildToggler('right');
        };

        /**
         * Return the proper object when the append is called.
         */
        $scope.transformChip = function (chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return { name: chip, type: 'new' }
        };

        /**
         * Search function.
         */
        $scope.querySearch = function (query) {
            var results = query ? $scope.trucksList.filter($scope.createFilterFor(query)) : [];
            return results;
        };

        /**
         * Create filter function for a query string
         */
        $scope.createFilterFor = function (query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(value) {
                return (value._lowername.indexOf(lowercaseQuery) === 0) ||
                    (value._lowertype.indexOf(lowercaseQuery) === 0);
            };

        };

        $scope.searchItemAdded = function(chip) {
            console.log("added:" + chip);
            $scope.item_added = chip;
            $scope.$broadcast('map.element.added', $scope.item_added);
        };

        $scope.searchItemRemoved = function(chip) {
            console.log("removed:" + chip);
            $scope.item_removed = chip;
            $scope.$broadcast('map.element.removed', $scope.item_removed);
        };

        $scope.buildToggler = function (componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            }
        };

        $scope.showAccount = function () {
            // console.log("hello");
            // $scope.toggleRight();
            $scope.buildToggler('account-sidebar')();
        };
        $scope.logout = function (e) {
            authenticationApi.logout().then(function (resp) {
                $window.location.href = "/";
            });
        };
        $scope.goBack = function () {
            window.history.back();
            // console.log($location.absUrl());
            // console.log($location);
            // var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/traker";
            // console.log(url);
        };

        $scope.$watch('trafficInfo', function() {
            if ($scope.trafficInfo) {
                $scope.$broadcast('traffic.on');
            } else {
                $scope.$broadcast('traffic.off');
            }
        });
        $scope.$watch('nightMode', function() {
            console.log('nightMode event...');
            if (!$scope.themeModeEvent) {
                if ($scope.nightMode) {
                    $scope.$broadcast('theme.night.on');
                } else {
                    $scope.$broadcast('theme.night.off');
                }
            } else {
                $scope.themeModeEvent = false;
            }
        });
        $scope.$watch('mapStyle', function() {
            $scope.$broadcast('map.styling', $scope.mapStyle);
        });

        $scope.$on('style.night.on', function (event) {
            console.log("style.night.on (home) captured!");
            $scope.nightMode = true;
            $scope.themeModeEvent = true;
        });
        // $scope.$on('map.styling', function (event) {
        //     console.log("map.styling (home) captured!");
        // });

        $scope.init();
    }
]);
