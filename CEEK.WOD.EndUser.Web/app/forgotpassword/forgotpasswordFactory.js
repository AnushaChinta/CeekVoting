var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('forgotpasswordFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';

        var model = function () {
            return {

            }
        };

        
        var forgotpswd = function (input) {
            return apiFactory.simplehttpPost(apiFactory.ceekserverURL + "mobile/forgotPass", input)
                       .then(function (response) {
                           return response;
                       });
        };
        return {
            forgotpswd: forgotpswd
        };

    });
});