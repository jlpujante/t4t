/**
 * @author j.l.pujante
 * created on 07.02.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('SettingsPageCtrl', SettingsPageCtrl);

    /** @ngInject */
    function SettingsPageCtrl($scope, toastr, applicationService) {

        // $scope.stylings = [];
        $scope.stylings = [
            "default",
            "aubergine",
            "dark",
            "night",
            "retro",
            "silver"
        ];
        applicationService.getMapStyling().then(function (resp) {
            console.log(resp.data);
            // $scope.stylings = resp.data;
        });

        $scope.hours = [
            "0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00",
            "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "18:00", "20:00", "21:00", "22:00", "23:00"];

        $scope.switches = [false];

        $scope.selectDayStylingTime = function(e, value) {

        };

        $scope.selectNightStylingTime = function(e, value) {

        };

        $scope.updateProfile = function () {
            toastr.success('Updated successfully', 'Global Settings', {
                "autoDismiss": true,
                "positionClass": "toast-top-center",
                "type": "success",
                "timeOut": "5000",
                "extendedTimeOut": "2000",
                "allowHtml": false,
                "closeButton": false,
                "tapToDismiss": true,
                "progressBar": false,
                "newestOnTop": true,
                "maxOpened": 0,
                "preventDuplicates": false,
                "preventOpenDuplicates": false
            });
        };

    }

})();
