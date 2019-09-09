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
        var getEvents = function () {
            return apiFactory.httpGet(apiFactory.baseURL() + "event/GetActiveEvents/0")
                       .then(function (response) {
                           return response;
                       });
        };

        var serverURL = apiFactory.serverURL;
        var ceekserverURL = apiFactory.ceekserverURL;

        return {
            login: login,
            serverURL: serverURL,
            ceekserverURL: ceekserverURL,
            getEvents: getEvents
        };

    });
});