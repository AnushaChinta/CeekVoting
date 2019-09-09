/// <reference path="E:\Workspaces\FleetConnect\CODE\FleetConnect\FleetConnect.Web\vendor/ngToast/angular-sanitize.js" />
/// <reference path="E:\Workspaces\FleetConnect\CODE\FleetConnect\FleetConnect.Web\vendor/ngToast/ngToast.min.js" />
(function () {

    require.config({
        baseUrl: "app",
        // alias libraries paths.  Must set 'angular'
        paths: {
            'angular': "../vendor/angular/angular.min",
            'angular-ui-router': "../vendor/angular/angular-ui-router",
            'angularAMD': "../vendor/angular/angularAMD.min",
            'angular-cookies': "../vendor/angular/angular-cookies.min",
            'jquery': '../vendor/jquery/jquery.min',
            'jquery-ui': '../vendor/jquery/jqueryui.min',
            'multi-select': '../vendor/jquery/multi-select',
            'bootstrap': '../vendor/bootstrap/js/bootstrap.min',
            'fastclick': '../vendor/fastclick/fastclick',
            'icheck': '../vendor/iCheck/icheck.min',
            'customJs': '../js/custom',
            'ngSanitize': '../js/angular-sanitize.min'

        },

        // Add angular modules that does not support AMD out of the box, put it in a shim
        shim: {
            'angular': {
                deps: ['jquery', 'jquery-ui', 'bootstrap', 'icheck'],
                exports: 'angular'
            },
            'jquery': {

                exports: 'jquery'
            },
            'jquery-ui': {
                deps: ['jquery'],
                exports: 'jquery-ui'
            },
            'multi-select': {
                deps: ['jquery'],
                exports: 'multi-select'
            },
            'ngSanitize':{
                exports:'ngSanitize'
            },
            'bootstrap': {
                deps: ['jquery'],
                exports: 'bootstrap'
            },
            'customJs': {
                deps: ['jquery', , 'bootstrap', 'icheck']
            },
            'icheck': {
                deps: ['jquery'],
                exports: 'icheck'
            },
            'jquery.hotkeys': {
                deps: ['jquery'],
                exports: 'jquery.hotkeys'
            },
            'angularAMD': ['angular'],
            'angular-ui-router': ['angular']
            //'angular-cookies': {
            //    deps: ['angular'],
            //    exports: 'angular-cookies',
            //},
        },
        priority: [
            'angular'
        ],
        // kick start application
        deps: ['main'],

    });

}());