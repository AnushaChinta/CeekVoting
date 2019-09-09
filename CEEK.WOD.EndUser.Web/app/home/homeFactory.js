var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('homeFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';

        var model = function () {
            return {

            }
        };
        var getEvents = function () {
            return apiFactory.httpGet(apiFactory.baseURL() + "event/GetActiveEvents/0")
                       .then(function (response) {
                           return response;
                       });
        };
        var GetUimessages = function () {
            return apiFactory.httpGet(apiFactory.baseURL() + "UiMessages/GetAllMessages")
                       .then(function (response) {
                           return response;
                       });
        };
        var fileserverURL = apiFactory.fileserverURL;
        return {
            getEvents: getEvents,
            fileserverURL: fileserverURL,
            GetUimessages: GetUimessages
        };

    });
});