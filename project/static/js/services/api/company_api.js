/**
 * An Angular service for API.
 */
'use strict';
angular.module('companyApiService', [])
    .factory('companyApi', function ($http) {
            var baseUrl = '/api';

            return {
                getCompany: function (id) {
                    return $http.get(baseUrl + "/company/" + id);
                }
                //
                // getTruckRoute: function (id) {
                //     return $http.get(baseUrl + "/company/1/truck/" + id + "/checkpoints");
                // },
                //
                // putUser: function (username, payload) {
                //     return $http.put(baseUrl + '/' + username, payload);
                // },
                //
                // addUser: function (payload) {
                //     return $http.post(baseUrl, payload);
                // }
            };
        }
    );