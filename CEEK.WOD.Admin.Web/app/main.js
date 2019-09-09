(function () {

    define([
        'angular',
        'angularAMD',
        'common/router',
        'angular-ui-router'
       
    ], function (angular, angularAMD, router) {
        'use strict';

        var app = angular.module('woda', ['ui.router'])
            .config(router)
            //.config(['$httpProvider', function ($httpProvider) {
            //    $httpProvider.defaults.withCredentials = true;
            //}])

        return angularAMD.bootstrap(app);
    });



}());

