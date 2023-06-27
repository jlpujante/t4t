/**
 * @author j.l.pujante
 * created on 06.02.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .filter('timestamp2date', timestamp2date);

    /** @ngInject */
    function timestamp2date() {
        return function (text) {
            return parseInt(text)*1000;
            // var a = new Date(text * 1000);
            // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            // var year = a.getFullYear();
            // var month = months[a.getMonth()];
            // var date = a.getDate();
            // var hour = a.getHours();
            // var min = a.getMinutes();
            // var sec = a.getSeconds();
            // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            // return time;
            // return text ? new Date(text * 1000) : '';
        };
    }

})();
