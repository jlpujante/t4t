var ListController = angular.module('ListController', []);

ListController.controller('ListCtrl', ['$scope', 'trackerApi', '$http',
    function ($scope, trackerApi, $http) {
        $scope.init = function () {
            // trackerApi.getTrucksPosition().then(function (resp) {
            //     $scope.trucksPositionList = resp.data;
            // });
        };

        $scope.nutritionList = [
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                sodium: 87,
                calcium: '14%',
                iron: '1%'
            },
            {
                id: 602,
                name: 'Ice cream sandwitch',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                sodium: 129,
                calcium: '84%',
                iron: '1%'
            }
        ];
        // $scope.selected = [];
        // $scope.trucksPositionList = [];

        // $scope.query = {
        //     order: 'name',
        //     limit: 5,
        //     page: 1
        // };

        // $scope.desserts = {
        //     "count": 9,
        //     "data": [
        //         {
        //             "name": "Frozen yogurt",
        //             "type": "Ice cream",
        //             "calories": { "value": 159.0 },
        //             "fat": { "value": 6.0 },
        //             "carbs": { "value": 24.0 },
        //             "protein": { "value": 4.0 },
        //             "sodium": { "value": 87.0 },
        //             "calcium": { "value": 14.0 },
        //             "iron": { "value": 1.0 }
        //         }, {
        //             "name": "Ice cream sandwich",
        //             "type": "Ice cream",
        //             "calories": { "value": 237.0 },
        //             "fat": { "value": 9.0 },
        //             "carbs": { "value": 37.0 },
        //             "protein": { "value": 4.3 },
        //             "sodium": { "value": 129.0 },
        //             "calcium": { "value": 8.0 },
        //             "iron": { "value": 1.0 }
        //         }, {
        //             "name": "Eclair",
        //             "type": "Pastry",
        //             "calories": { "value":  262.0 },
        //             "fat": { "value": 16.0 },
        //             "carbs": { "value": 24.0 },
        //             "protein": { "value":  6.0 },
        //             "sodium": { "value": 337.0 },
        //             "calcium": { "value":  6.0 },
        //             "iron": { "value": 7.0 }
        //         }
        //     ]
        // };
        // $scope.success = function(d) {
        //     $scope.trucksPositionList = d.data;
        //     console.log($scope.trucksPositionList);
        // };
        //
        // $scope.getDesserts = function () {
        //     // $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
        //     $scope.promise = $http.get(baseUrl + "/company/1/truck/all/position", success).$promise;
        // };

        $scope.init();
    }
]);
