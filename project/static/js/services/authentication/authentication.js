/**
 * An Angular service for Authentication.
 */
'use strict';
angular.module('authenticationApiService', [])
    .factory('authenticationApi', function ($http) {
            var baseUrl = '/auth';
            return {
                login: function () {
                    return $http.post(baseUrl + "/login");
                },
                logout: function () {
                    return $http.post(baseUrl + "/logout");
                },
                getSession: function () {
                    return $http.get("/session");
                }
            };
        }
    );