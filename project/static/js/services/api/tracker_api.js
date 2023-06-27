/**
 * An Angular service for API.
 */
'use strict';
angular.module('trackerApiService', [])
    .factory('trackerApi', function ($http) {
            var baseUrl = '/api';

            return {
                // getUsers: function (params) {
                //     return cacheServiceComponent.getUsers(params, true);
                // },

                // changePassword: function (userId, payload) {
                //     return $http.put(baseUrl + '/' + userId + '/password', payload);
                // },
                //
                // recoverPassword: function (payload) {
                //     return $http.post(baseUrl + "/recover-password", payload);
                // },
                //
                // checkPasswordRecoveryToken: function (tokenId) {
                //     return $http.get(baseUrl + "/check-password-recovery-token/" + tokenId);
                // },

                getTrucksPosition: function () {
                    return $http.get(baseUrl + "/company/1/truck/all/position");
                },

                getTruckRoute: function (id) {
                    return $http.get(baseUrl + "/company/1/truck/" + id + "/checkpoints");
                },

                putUser: function (username, payload) {
                    return $http.put(baseUrl + '/' + username, payload);
                },

                addUser: function (payload) {
                    return $http.post(baseUrl, payload);
                }
            };
        }
    );