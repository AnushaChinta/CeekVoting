var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('artistFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';

        var profile = JSON.parse(sessionStorage.getItem("profile"));

        var model = function () {
            return {
                "artistSNo": 0,
                "artistUniqueKey": "",
                "artistName": "",
                "artistDesc": "",
                "artistImageUrl": "",
                "artistVotes": 0,
                "event_id": ""
            }
        };
        var nominationmodel = function () {
            return {
                "mevent_id": "",
                "fullname": "",
                "user_type": "participant",
                "isnominated": "true",
                "nominatedby": "",
                "imageurl":""

            }
        };
        var userfilesmodel = function () {
            return {
                //"userid": "",
                "ceek_userid": "",
                "artistid": "",
                "url": "",
                "filetype": "",
                "filename": "",
                // "ismainvedio": "",
                "createdby": "1",
              //  "isdefault": "true"
            }
        }
        var removeimage = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/RemoveUserImage", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var votemodel = function () {
            return {
                "userid": 0,
                "participantid": "",
                "eventid": "",
                "eventname": "",
                "numberofvotes": "",
                "createdby": 7,
                "ceek_userid": "5b2763572fec25013ecabc90"
            }
        }
        var uploadModel = function () {
            return {

                //  "user_uniqueid": profile.uniqueid,
                "imageurl": "",
                "createdby": ""
            }
        }
        var favmodel = function () {
            return {
                "ceek_userid": "",
                "artistid": "",
                "isdefault": "true"
            }
        }
        var serverURL = apiFactory.serverURL;
        var fileserverURL = apiFactory.fileserverURL;

        var getallartists = function (id) {
            return apiFactory.httpGet(apiFactory.baseURL() + "event/GetParticipantByEventID/" + id)
            .then(function (response) {
                return response;
            });
        };
        var vote = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "vote/submitVote", input)
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
        var bvote = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "vote/castvote", input)
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

        var getVotesByEventID = function (input) {
            return apiFactory.httpGet(apiFactory.baseURL() + "vote/getVotesByEventID/", +id)
                       .then(function (response) {
                           return response;
                       });
        };
        var getartistbyname = function (id) {
            return apiFactory.httpGet(apiFactory.baseURL() + "event/GetParticipantByName/" +id)
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
        var createfav = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "UserFavorites/CreateUserFavorites", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var createnomination = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/RegisterAndNominateArtistMultipe", input)
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
        return {
            model: model,
            getallartists: getallartists,
            serverURL: serverURL,
            fileserverURL: fileserverURL,
            vote: vote,
            bvote: bvote,
            getVotesByEventID:getVotesByEventID,
            votemodel: votemodel,
            getallimages: getallimages,
            uploadModel: uploadModel,
            getartistbyname: getartistbyname,
            createfav: createfav,
            favmodel: favmodel,
            userfilesmodel: userfilesmodel,
            getallevents: getallevents,
            createnomination: createnomination,
            nominationmodel: nominationmodel,
            userfiles: userfiles,
            removeimage: removeimage,
            getartistfiles: getartistfiles
        };

    });
});