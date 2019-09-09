var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('loginFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';

        var model = function () {
            return {
                "username": "",
                "password": "",
            }
        };

        var login = function (username, password) {

        };

        var serverURL = apiFactory.serverURL;

        var getEvents = function () {
            return apiFactory.httpGet(apiFactory.baseURL() + "event/GetActiveEvents/0")
                       .then(function (response) {
                           return response;
                       });
        };
        var validate2fa = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/Validate2fa", input)
                       .then(function (response) {
                           return response;
                       });
        };
        return {
            login: login,
            serverURL: serverURL,
            getEvents: getEvents,
            validate2fa: validate2fa
        };

    });
});