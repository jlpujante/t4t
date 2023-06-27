var Directives = angular.module('Directives', []);

Directives.directive('focusMe', function ($timeout, $parse) {
    return {
        link: function (scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function (value) {
                if (value === true) {
                    $timeout(function () {
                        element[0].focus();
                        if (!element.is(":focus")) {
                            $timeout(function () {
                                element[0].focus();
                            }, 500);
                        }
                    }, 500);
                }
            });
        }
    };
});