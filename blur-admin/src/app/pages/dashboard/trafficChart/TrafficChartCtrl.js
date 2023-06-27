(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('TrafficChartCtrl', TrafficChartCtrl);

  /** @ngInject */
  function TrafficChartCtrl($scope, baConfig, colorHelper) {

      $scope.getPercertage = function(num) {
          return Math.round(num * 100) / 100
      };

      $scope.totalDevices = 12;
      $scope.devicesPerCountry = [5, 3, 2, 1, 1];
      $scope.totalDevicesPercentage = 100/12;
      $scope.transparent = baConfig.theme.blur;
      var dashboardColors = baConfig.colors.dashboard;
      $scope.doughnutData = {
          labels: [
              'Spain',
              'France',
              'Germany',
              'Luxembourg',
              'Portugal'
          ],
          datasets: [
              {
                  data: $scope.devicesPerCountry,
                  backgroundColor: [
                      dashboardColors.blueStone,
                      dashboardColors.surfieGreen,
                      dashboardColors.silverTree,
                      dashboardColors.gossip,
                      dashboardColors.white

                  ],
                  hoverBackgroundColor: [
                      colorHelper.shade(dashboardColors.blueStone, 15),
                      colorHelper.shade(dashboardColors.surfieGreen, 15),
                      colorHelper.shade(dashboardColors.silverTree, 15),
                      colorHelper.shade(dashboardColors.gossip, 15),
                      colorHelper.shade(dashboardColors.white, 15)
                  ],
                  percentage: [
                      $scope.getPercertage($scope.devicesPerCountry[0]*$scope.totalDevicesPercentage),
                      $scope.getPercertage($scope.devicesPerCountry[1]*$scope.totalDevicesPercentage),
                      $scope.getPercertage($scope.devicesPerCountry[2]*$scope.totalDevicesPercentage),
                      $scope.getPercertage($scope.devicesPerCountry[3]*$scope.totalDevicesPercentage),
                      $scope.getPercertage($scope.devicesPerCountry[4]*$scope.totalDevicesPercentage)
                  ]
              }]
      };

      var ctx = document.getElementById('chart-area').getContext('2d');
      window.myDoughnut = new Chart(ctx, {
          type: 'doughnut',
          data: $scope.doughnutData,
          options: {
              cutoutPercentage: 64,
              responsive: true,
              elements: {
                  arc: {
                      borderWidth: 0
                  }
              }
          }
      });
  }
})();