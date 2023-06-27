/**
 * @author j.l.pujante
 * created on 07.02.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.devices')
        .controller('DevicesPageCtrl', DevicesPageCtrl);

    /** @ngInject */
    function DevicesPageCtrl($scope, $uibModal, trackerApi) {

        $scope.device = {
            sn: undefined,
            reference: undefined,
            name: undefined
        };

        $scope.rowCollection = [];
        $scope.smartTablePageSize = 10;

        trackerApi.getTrucksPosition().then(function (resp) {
            $scope.smartTableData = resp.data.map(function (item) {
                item._lowername = item.name.toLowerCase();
                item._lowertype = item.type.toLowerCase();
                $scope.rowCollection.push(item);
                return item;
            });
        });

        $scope.openModal = function (page, size) {
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                scope: $scope
            });
        };

        $scope.okModal = function () {
            $scope.modalInstance.dismiss();
            console.log($scope.device);
        };

        $scope.cancelModal = function () {
            $scope.modalInstance.dismiss();
        };

        $scope.showCurrentPosition = function (item) {
        };

        $scope.openTrackingSystem = function (item) {
        };

    }

})();
