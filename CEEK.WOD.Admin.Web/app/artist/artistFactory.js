var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('artistFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';

        //var profile = JSON.parse(sessionStorage.getItem("profile"));

        var model = function () {
            return {
                "artistSNo": 0,
                //   "artistUniqueKey": "",
                "lastname": "",
                "firstname": "",
                "description": "",
                "imageurl": "",
                "user_type": "",
                "artistVotes": 0,
                "mevent_id": "",
                "password": "",
                "createdby": 24,
                "modifiedby": 24,
                "fullimageurl": "",
                "userid": "",
                "isnominated": "",
                "nominatedby":""

            }
        };

        var uploadModel = function () {
            return {
             
              //  "user_uniqueid": profile.uniqueid,
                "imageurl": "",
                "createdby": ""
            }
        }

        var userfilesmodel = function () {
            return {
                "userid": "",
                "ceek_userid": "",
                "artistid": "",
                "url": "",
                "filetype": "",
                "filename": "",
               // "ismainvedio": "",
                "createdby": "1",
                //"isdefault": "true"
            }
        }
      
        var insert = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/RegisterAndNominateArtistMultipe", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var update = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/UpdateUser", input)
                       .then(function (response) {
                           return response;
                       });
        };

        var userfiles = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "UserFiles/CreateUserFile", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var removefiles = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "UserFiles/ChangeUserFileStatus", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var getallnominations = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "UserNominations/getAllUserNominations", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var approvenominations = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "UserNominations/ChangeNominationStatus", input)
                       .then(function (response) {
                           return response;
                       });
        };

        var softdelete = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/BlockUser", input)
                       .then(function (response) {
                           return response;
                       });
        };

        var getallartists = function (id) {
            return apiFactory.httpGet(apiFactory.baseURL() + "event/GetParticipantByEventID/" + id)
            .then(function (response) {
                return response;
            });
        };
        var getartistfiles = function (id) {
            return apiFactory.httpGet(apiFactory.baseURL() + "UserFiles/getUserFilebyArtistid/" + id)
            .then(function (response) {
                return response;
            });
        };
        var getartist = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/getuserbyid", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var updatepic = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "UserFiles/UpdateUserFile", input)
                       .then(function (response) {
                           return response;
                       });
        };


        var createimage = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/CreateUserImage", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var removeimage = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/RemoveUserImage", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var getallimages = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/GetallUserImages", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var defaultimage = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/SetdefaultImage", input)
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

        var serverURL = apiFactory.serverURL;
        var fileserverURL = apiFactory.fileserverURL;


       


        return {
            model: model,
            uploadModel: uploadModel,
         
            insert: insert,
            update: update,
            getallartists: getallartists,
            getartist: getartist,
            serverURL: serverURL,
            softdelete: softdelete,
            createimage: createimage,
            removeimage: removeimage,
            getallimages: getallimages,
            defaultimage: defaultimage,
            fileserverURL: fileserverURL,
            userfilesmodel: userfilesmodel,
            userfiles: userfiles,
            getartistfiles: getartistfiles,
            updatepic: updatepic,
            removefiles: removefiles,
            getallevents: getallevents,
            getallnominations: getallnominations,
            approvenominations:approvenominations
          
        };

    });
});