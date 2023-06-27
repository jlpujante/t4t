var Filters = angular.module('Filters', []);

Filters.filter('timeago', function () {
    return function (dateString) {
        return moment(new Date(dateString * 1000)).fromNow();
    };
});