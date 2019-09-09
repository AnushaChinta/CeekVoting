var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('profileFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';



        var model = function () {
            return {
                "ceek_points": "",
                "numberofvotes": "",
                "userid": "",
                "ceek_userid": "",
              

            }
        };

        var dashboardModel = function () {
            return {
                "pagesize": "",
                "pageno": "",
                "fromdate": "2018-09-10",
                "todate": "2018-10-20",
                "eventid": ""


            }

        };

        var messageModel = function () {
            return {

                   "screen_name": "",
                   "field_name": "",
                   "field_message": "",
                     "userid": ""

            }

        };


      
        var GetCeekpointSettingbyid = function (id) {
            return apiFactory.httpGet(apiFactory.baseURL() + "setting/GetCeekpointSettingbyid/" + id)
                       .then(function (response) {
                           return response;
                       });
        };
        var UpdateCeekpoint = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "setting/UpdateCeekpointSetting" , input)
                       .then(function (response) {
                           return response;
                       });
        };

        var GetBlockchaindetails = function () {
            return apiFactory.httpGet(apiFactory.baseURL() + "setting/GetBlockchaindetails")
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
        var updateUimessages = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "UiMessages/UpdateMessage", input)
                       .then(function (response) {
                           return response;
                       });
        };

        var insertUimessages = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "UiMessages/CreateMessage", input)
                       .then(function (response) {
                           return response;
                       });
        };

        var deleteUimessages = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "UiMessages/DeleteMessage", input)
                       .then(function (response) {
                           return response;
                       });
        };

        var UpdateBlockchainSetting = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "setting/UpdateBlockchainSetting" , input)
                       .then(function (response) {
                           return response;
                       });
        };

        var dashboard = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "SP/getPaymentTransactionforadmin", input)
                       .then(function (response) {
                           return response;
                       }); 

        };
        var eventdashboard = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "dashboard/event", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var ceekserverURL = apiFactory.ceekserverURL;
        var GetBlockchaintranscation = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "BC/GetAllBlockchaintxn",input )
                       .then(function (response) {
                           return response;
                       });
        };
        var change2fastatus = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/Change2faAuthStatus", input)
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
        var changepassword = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/ChangePasswordforadmin", input)
                       .then(function (response) {
                           return response;
                       });
        };

        var serverURL = apiFactory.serverURL;

        var mockData = function () {
            return {
                Trasaction_details:
                [

               {


                   "transactionid": "ch_1CjPeZCLbi51SgVIABgiJKra",
                   "VoteArtistName" :"",
                   "typeoftransaction": "BuyIn",
                   "VoteCasted":"120",
                   "TokenGainedOrBurned": "45",

                   "SubsciptionPlanCost": "4.99",
                   "voteartistname": "NAS",
                   "voteartistpic":"",
                   "SubsciptionPlanName": "Gold",
                 
                   "createddate": "02-07-18 05:55 PM"

               }, {

                   "transactionid": "ch_1CjPeZCLbi51SgVIABgiJKra",
                   "VoteArtistName": "",
                   "typeoftransaction": "BuyIn",
                   "VoteCasted": "120",
                   "TokenGainedOrBurned": "121",

                   "SubsciptionPlanCost": "4.99",
                   "voteartistname": "Taylor",
                   "voteartistpic": "",
                   "SubsciptionPlanName": "Gold",

                   "createddate": "02-07-18 05:55 PM"

               }, {


                   "transactionid": "ch_1CjPeZCLbi51SgVIABgiJKra",
                   "VoteArtistName": "",
                   "typeoftransaction": "BuyIn",
                   "VoteCasted": "120",
                   "TokenGainedOrBurned": "130",

                   "SubsciptionPlanCost": "4.99",
                   "voteartistname": "GRAVE",
                   "voteartistpic": "",
                   "SubsciptionPlanName": "Gold",

                   "createddate": "02-07-18 05:55 PM"

               }, {


                   "transactionid": "ch_1CjPeZCLbi51SgVIABgiJKra",
                   "VoteArtistName": "",
                   "typeoftransaction": "BuyIn",
                   "VoteCasted": "120",
                   "TokenGainedOrBurned": "146",

                   "SubsciptionPlanCost": "4.99",
                   "voteartistname": "Katy Perry",
                   "voteartistpic": "",
                   "SubsciptionPlanName": "Premium",

                   "createddate": "02-07-18 05:55 PM"

               }
                ]
            }


        };

        return {
            model: model,
            GetCeekpointSettingbyid: GetCeekpointSettingbyid,
            UpdateCeekpoint: UpdateCeekpoint,
            GetBlockchaindetails: GetBlockchaindetails,
            UpdateBlockchainSetting:UpdateBlockchainSetting,
            ceekserverURL: ceekserverURL,
            dashboard: dashboard,
            mockData: mockData,
            eventdashboard: eventdashboard,
            dashboardModel: dashboardModel,
            GetBlockchaintranscation: GetBlockchaintranscation,
            GetUimessages: GetUimessages,
            deleteUimessages:deleteUimessages,
            updateUimessages: updateUimessages,
            messageModel: messageModel,
            serverURL: serverURL,
            change2fastatus: change2fastatus,
            validate2fa: validate2fa,
            changepassword: changepassword
        };

    });
});