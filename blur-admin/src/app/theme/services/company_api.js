/**
 * @author j.l.pujante
 * created on 31.01.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('companyApi', companyApi);

    /** @ngInject */
    function companyApi($http) {

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
        }
    }
})();
