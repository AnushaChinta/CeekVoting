var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('eventFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';

        //var profile = JSON.parse(sessionStorage.getItem("profile"));

        var model = function () {
            return {
               
                   "event_name": "",
                    "event_url":"",
                    "event_logo": "",
                "event_description":""
                                
            }
        };

      

        var insert = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "event/RegisterEvent", input)
                       .then(function (response) {
                           return response;
                       });
        }; 


        var update = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "event/UpdateEvent", input)
                       .then(function (response) {
                           return response;
                       });
        };


        var getallevents = function () {
            return apiFactory.httpGet(apiFactory.baseURL() + "event/GetActiveEvents/0")
            .then(function (response) {
                return response;
            });
        };
        var softdelete = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "event/DeactivateEvent", input)
                       .then(function (response) {
                           return response;
                       });
        }; 

       
        var getevent = function (id) {
            return apiFactory.httpGet(apiFactory.baseURL() + "event/GetEventDetailsByID/" + id)
                        .then(function (response) {
                            return response;
                        });
        };

       

        var serverURL = apiFactory.serverURL;
        var fileserverURL = apiFactory.fileserverURL;


       


       

        return {
            model: model,
            insert: insert,
            update: update,
            getallevents: getallevents,
            getevent: getevent,
            serverURL: serverURL,
            fileserverURL: fileserverURL,
            softdelete: softdelete

        };

    });
});