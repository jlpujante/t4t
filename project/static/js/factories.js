var Factories = angular.module('Factories', []);

Factories.factory('drhouseBus', ['$rootScope', function ($rootScope) {
    var msgBus = {};
    msgBus.emitMsg = function (msg) {
        $rootScope.$emit(msg);
    };
    msgBus.onMsg = function (msg, scope, func) {
        var unbind = $rootScope.$on(msg, func);
        scope.$on('$destroy', unbind);
    };
    return msgBus;
}]);