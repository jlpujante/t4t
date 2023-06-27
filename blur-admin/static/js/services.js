var Services = angular.module('Services', []);

Services.service('drhouseCacheService', function ($http, $q) {
    return {
        doGET: function (counter, url) {
            var deferred = $q.defer();
            var _url = url;
            counter.addRequest();

            //start = new Date().getTime();
            //var headersparam = {'deltats' : start};
            var headersparam = {};
            $http({
                url: _url,
                method: "GET",
                timeout: 60000,
                headers: headersparam
            }).success(function (data, status, headers, config) {
                counter.endRequest();
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                deferred.resolve(results);
            }).error(function (data, status, headers, config) {
                counter.endRequest();
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                if (results.status == 302) {
                    $(location).attr('href', '/');
                } else if (results.status == 503) {
                    $("body").html(data);
                }
                deferred.reject(results);
            });
            return deferred.promise;
        },
        doPOST: function (counter, url, parameters) {
            var csrftoken = $('meta[name=csrf-token]').attr('content');
            var deferred = $q.defer();
            var _url = url;
            counter.addRequest();

            var headersparam = {'X-CSRFToken': csrftoken};
            $http({
                url: _url,
                method: "POST",
                timeout: 60000,
                data: parameters,
                headers: headersparam
            }).success(function (data, status, headers, config) {
                counter.endRequest();
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                deferred.resolve(results);
            }).error(function (data, status, headers, config) {
                counter.endRequest();
                var results = [];
                results.data = data;
                results.headers = headers();
                results.status = status;
                results.config = config;
                if (results.status == 302) {
                    $(location).attr('href', '/');
                } else if (results.status == 503) {
                    $("body").html(data);
                }
                deferred.reject(results);
            });
            return deferred.promise;
        }
    };
});
