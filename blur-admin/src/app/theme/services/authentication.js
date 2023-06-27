/**
 * @author j.l.pujante
 * created on 31.01.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('authenticationApi', authenticationApi);

    /** @ngInject */
    function authenticationApi($http) {

        var baseUrl = '/auth';
        return {
            login: function () {
                return $http.post(baseUrl + "/login");
            },
            logout: function () {
                $(location).attr('href', baseUrl + '/logout');
                // return $http.post(baseUrl + "/logout");
            },
            getSession: function () {
                return $http.get("/me");
            }
        }
    }
})();
