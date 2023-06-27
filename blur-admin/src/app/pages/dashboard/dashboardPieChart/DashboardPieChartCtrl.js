(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

    /** @ngInject */
    function DashboardPieChartCtrl($scope, $timeout, $interval, baConfig, baUtil) {
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        $scope.charts = [{
            color: pieColor,
            description: 'Total Devices',
            stats: '12',
            icon: 'location-arrow'
        }, {
            color: pieColor,
            description: 'On Route',
            stats: '9',
            icon: 'road'
        }, {
            color: pieColor,
            description: 'Checkpoints',
            stats: '1073',
            icon: 'map-marker'
        }, {
            color: pieColor,
            description: 'Alerts',
            stats: '0',
            icon: 'exclamation-circle'
        }
        ];

        function updateCheckPoints() {
            console.log('updateCheckPoints');
            console.log($scope.charts);
            var n = parseInt($scope.charts[2]['stats']) + 9;
            $scope.charts[2]['stats'] = '' + n;
        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function loadPieCharts() {
            $('.chart').each(function () {
                var chart = $(this);
                chart.easyPieChart({
                    easing: 'easeOutBounce',
                    onStep: function (from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                    },
                    barColor: chart.attr('rel'),
                    trackColor: 'rgba(0,0,0,0)',
                    size: 84,
                    scaleLength: 0,
                    animation: 2000,
                    lineWidth: 9,
                    lineCap: 'round'
                });
            });

            $('.refresh-data').on('click', function () {
                updatePieCharts();
            });
        }

        function updatePieCharts() {
            $('.pie-charts .chart').each(function (index, chart) {
                $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
            });
        }

        $timeout(function () {
            updateCheckPoints();
            loadPieCharts();
            updatePieCharts();
        }, 1000);

        // $scope.interval_stats = $interval(function () {
        //     updateCheckPoints();
        //     loadPieCharts();
        //     updatePieCharts();
        // }, 1000);

        $scope.$on('$destroy', function() {
            console.log('dashboardPieChartCtrl.destroy');
            // $interval.cancel($scope.interval_stats);
        });
    }
})();