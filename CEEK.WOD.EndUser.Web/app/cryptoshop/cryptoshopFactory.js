var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('cryptoshopFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';

        var model = function () {
            return {
                "packageUniqueKey": "",
                "packageName": "",
                "packageDesc": "",
                "packageImageUrl": "",
                "packageCost": 0
            }
        };
        var paymentsuccessmodel = function () {
            return {
                "id": "",
                "ceek_userid": "",
                "amount": 0,
                "currencytype": "usd",
                "paymenttoken": "",
                "emailid": "",
                "issave": "",
                "status": "success",
                "firstname": "",
                "lastname": "",
                "address1": "",
                "address2": "",
                "city": "",
                "state": "",
                "country": "",
                "paymentby":""
               
            
            }
        };
        var paymodel = function () {
            return {
                "ceek_userid": "",
                "amount": "",
                "ceek_points":"",
                "currencytype": "usd",
                "paymenttype": "DebitCard",
                "transdate": "2018-05-15T00:00:00",
                "status": "initialize",
                "createdby": 1,
                "paymenttoken": ""
            }
        };
        var promocodemodel = function () {
            return {
                "id": "",
                "ceek_userid": "",
                "paymenttoken": "",
                "transactionid": "",
                "status": "success",
                "promocode": "",
            }
        };
        var serverURL = apiFactory.serverURL;
        var fileserverURL = apiFactory.fileserverURL;
        var stripekey = apiFactory.stripekey;

        var getALLSubscriptionPlans = function () {
            return apiFactory.httpGet(apiFactory.baseURL() + "SP/getALLSubscriptionPlans/0")
                        .then(function (response) {
                            return response;
                        });
        };

        var payment = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "SP/paymentSuccess", input)
                      .then(function (response) {
                          return response;
                      });
        }; 
        var stripecarddetails = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "SP/getStripeCardDetails", input)
                      .then(function (response) {
                          return response;
                      });
        };
        var state = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/getStates", input)
                      .then(function (response) {
                          return response;
                      });
        }; 
        var city = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/getCities", input)
                      .then(function (response) {
                          return response;
                      });
        };
        var country = function (input) {
            return apiFactory.httpGet(apiFactory.baseURL() + "USER/getCountries", input)
                      .then(function (response) {
                          return response;
                      });
        };
        var initialpayment = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "SP/initializePayments", input)
                      .then(function (response) {
                          return response;
                      });
        };
        var promocode = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "SP/paymentSuccessforpromocode", input)
                      .then(function (response) {
                          return response;
                      });
        };
        var createstripe = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "SP/createStripeCustomer", input)
                      .then(function (response) {
                          return response;
                      });
        };
        //var UserCreditInfo = function (input) {
        //    return apiFactory.httpPost(apiFactory.baseURL() + "SP/CreateUserCreditInfo", input)
        //              .then(function (response) {
        //                  return response;
        //              });
        //};
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


        return {
            model: model,
            mockData: mockData,
            getALLSubscriptionPlans: getALLSubscriptionPlans,
            serverURL: serverURL,
            fileserverURL:fileserverURL,
            payment: payment,
            paymentsuccessmodel: paymentsuccessmodel,
            initialpayment: initialpayment,
            paymodel: paymodel,
            stripekey: stripekey,
            stripecarddetails: stripecarddetails,
            //UserCreditInfo: UserCreditInfo,
            promocode: promocode,
            promocodemodel: promocodemodel,
            createstripe: createstripe,
            country: country,
            state: state,
            city: city
           
        };

    });
});