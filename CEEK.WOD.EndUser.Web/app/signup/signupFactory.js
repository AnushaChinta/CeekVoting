var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('signupFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';

        var model = function () {
            return {
                "email": "",
                "userName": "",
                "password": ""
              
                
            }
        };
        var signup = function (input) {
            return apiFactory.simplehttpPost(apiFactory.ceekserverURL + "mobile/signUp", input)
                       .then(function (response) {
                           return response;
                       });
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
            model:model,
            signup: signup,
            serverURL: serverURL,
            ceekserverURL: ceekserverURL,
            getEvents: getEvents
        };

    });
});