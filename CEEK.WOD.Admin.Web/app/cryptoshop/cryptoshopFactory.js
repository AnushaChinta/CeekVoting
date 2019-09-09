var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('cryptoshopFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';

        var serverURL = apiFactory.serverURL;
        var model = function () {
            return {
                "packageUniqueKey": "",
                "packageName": "",
                "packageDesc": "",
                "packageImageUrl": "",
                "packageCost": 0
            }
        };


        var infoModel = function () {
            return {
                "id":"0",
                "votes": "10",
                "subscription_name": "",
                "plan_cost": "",
                "currencycode": "USD",
                "isactive": true,
                "isdeleted": false,
                "createdby": "24",
                "modifiedby": "24",
                "description": "",
                "image": ""
            }


        };


        var fileModel = function () {

            return {
                "filename":
                    {
                        "fieldname": "",
                        "originalname": "",
                        "encoding": "",
                        "mimetype": "",
                        "destination": "",
                        "filename": "",
                        "path": "",
                        "size": 0
                    }
            }
        };

        var mockData = function () {
            return {
                packageList: [

                        {
                            "packageUniqueKey": "",
                            "packageName": "Gold",
                            "packageDesc": "",
                            "packageImageUrl": "img/buy-4.png",
                            "packageCost": 4.99
                        },
                        {
                            "packageUniqueKey": "",
                            "packageName": "Premium",
                            "packageDesc": "",
                            "packageImageUrl": "img/buy-9.png",
                            "packageCost": 9.99
                        }, {
                            "packageUniqueKey": "",
                            "packageName": "Diamond",
                            "packageDesc": "",
                            "packageImageUrl": "img/buy-24.png",
                            "packageCost": 24.99
                        }, {
                            "packageUniqueKey": "",
                            "packageName": "Diamond",
                            "packageDesc": "",
                            "packageImageUrl": "img/buy-69.png",
                            "packageCost": 69.99
                        }, {
                            "packageUniqueKey": "",
                            "packageName": "Premium",
                            "packageDesc": "",
                            "packageImageUrl": "img/buy-99.png",
                            "packageCost": 99.99
                        }, {
                            "packageUniqueKey": "",
                            "packageName": "Diamond",
                            "packageDesc": "",
                            "packageImageUrl": "img/buy-249.png",
                            "packageCost": 249.99
                        },


                ]
            }
        };


        var getALLSubscriptionPlans = function () {
            return apiFactory.httpGet(apiFactory.baseURL() + "SP/getALLSubscriptionPlans/0")
                        .then(function (response) {
                            return response;
                        });
        };

        var getSubscriptionPlanbyID = function (id) {
            return apiFactory.httpGet(apiFactory.baseURL() + "SP/getSubscriptionPlanbyID/" + id)
                        .then(function (response) {
                            return response;
                        });
        };

        var softdelete = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "SP/deactiveSubscription", input)
                       .then(function (response) {
                           return response;
                       });
        };
       
        var createSubscriptionPlan = function (input) {
            console.log('csfactory');
            console.log(JSON.stringify(input));
            return apiFactory.httpPost(apiFactory.baseURL() + "SP/createSubscriptionPlan", input)
                        .then(function (response) {
                            return response;
                        });
        };

        var UpdateSubscriptionPlan = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "SP/UpdateSubscriptionPlan", input)
                        .then(function (response) {
                            return response;
                        });
        };

        //var serverURL = apiFactory.serverURL;

           var fileserverURL = apiFactory.fileserverURL;


       



        return {

            model: model,
            infoModel: infoModel,
            mockData: mockData,
            softdelete:softdelete,
            getALLSubscriptionPlans: getALLSubscriptionPlans,
            getSubscriptionPlanbyID: getSubscriptionPlanbyID,
            createSubscriptionPlan: createSubscriptionPlan,
            UpdateSubscriptionPlan: UpdateSubscriptionPlan,
            serverURL: serverURL,
            fileserverURL: fileserverURL



        };

    });
});