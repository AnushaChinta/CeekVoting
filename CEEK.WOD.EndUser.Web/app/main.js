(function () {

    define([
        'angular',
        'angularAMD',
        'common/router',
        'angular-ui-router'
       
    ], function (angular, angularAMD, router) {
        'use strict';

        var app = angular.module('wod', ['ui.router'])
            .config(router)

        return angularAMD.bootstrap(app);
    });



}());

