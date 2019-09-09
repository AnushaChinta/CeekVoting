var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('profileFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';

        var model = function () {
            return {
                "ceek_userid": "",
                "email": "",
                "userName": ""

            }
        };

        var inputObj = function () {
            return {

                avatar: '',
                fullName: '',
                gender: ''

            }
        }
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

        var getmyvotes = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "vote/getUserVoteInfo", input)
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

        var walletdetails = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/walletdetails", input)
                       .then(function (response) {
                           return response;
                       });
        };

        var cryptobalance = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "vote/votercryptobalance", input)
                       .then(function (response) {
                           return response;
                       });
        };

        var getPaymentTransactions = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "SP/getPaymentTransactionbyUserID", input)
                       .then(function (response) {
                           return response;
                       });
        };

        var getETHTransactions = function (address, ethpageNo, ethpageSize) {
            return apiFactory.simplehttpGet(apiFactory.etherscanApiURL + "api?module=account&action=txlist&address=" + address + "&startblock=0&endblock=99999999&page=" + ethpageNo + "&offset=" + ethpageSize + "&sort=desc&apikey=" + apiFactory.etherscanApiKey)
                      .then(function (response) {
                          return response;
                      });
        };

        var getERC20Transactions = function (address, ercpageNo, ercpageSize) {
            return apiFactory.simplehttpGet(apiFactory.etherscanApiURL + "api?module=account&action=tokentx&address=" + address + "&startblock=0&endblock=999999999&page=" + ercpageNo + "&offset=" + ercpageSize + "&sort=desc&apikey=" + apiFactory.etherscanApiKey)
                      .then(function (response) {
                          return response;
                      });
        };
        var getmyfav = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "UserFavorites/getUserFavoritesbyUserid/",input)
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
        var ceekserverURL = apiFactory.ceekserverURL;
        var serverURL = apiFactory.serverURL;
        var fileserverURL = apiFactory.fileserverURL;

        //var mockData = function () {
        //    return {
        //        Trasaction_details:
        //        [

        //       {


        //           "TransactionId": "ch_1CjPeZCLbi51SgVIABgiJKra",

        //           "TypeOfTransaction": "BuyIn",

        //           "TokenGainedOrBurned": "Gained",

        //           "SubsciptionPlanCost": "4.99",

        //           "SubsciptionPlanName": "Gold",

        //           "SubscriptionPlanPic": "img/buy-4.png",

        //           "WalletBalanceBefore": "151",
        //           "WalletBalanceAfter": "162.3",
        //           "Timestamp": "02-07-18 05:55 PM"

        //       }, {

        //           "TransactionId": "ch_1CjPeZCLbi51SgJMABgiJKra",

        //           "TypeOfTransaction": "Vote",

        //           "TokenGainedOrBurned": "Burned",
        //           "VoteCasted": "10",
        //           "VoteArtistName": "Taylor Swift",
        //           "VoteArtistPic": "img/video33.png",


        //           "WalletBalanceBefore": "151",
        //           "WalletBalanceAfter": "148.9",
        //           "Timestamp": "02-07-18 05:55 PM"

        //       }, {


        //           "TransactionId": "ch_OmHJZCLbi51SgVIABgiJKra",

        //           "TypeOfTransaction": "BuyIn",

        //           "TokenGainedOrBurned": "Gained",

        //           "SubsciptionPlanCost": "9.99",

        //           "SubsciptionPlanName": "Premium",

        //           "SubscriptionPlanPic": "img/buy-9.png",

        //           "WalletBalanceBefore": "162",
        //           "WalletBalanceAfter": "174.2",
        //           "Timestamp": "02-07-18 05:55 PM"

        //       }, {


        //           "TransactionId": "ch_JGFYBPeZCLbi51SgVIABgi",

        //           "TypeOfTransaction": "Vote",

        //           "TokenGainedOrBurned": "Burned",
        //           "VoteCasted": "10",
        //           "VoteArtistName": "NAS",
        //           "VoteArtistPic": "img/video55.png",

        //           "WalletBalanceBefore": "167",
        //           "WalletBalanceAfter": "152.4",
        //           "Timestamp": "02-07-18 05:55 PM"

        //       }
        //        ]
        //    }


        //};

        return {
            model: model,
            walletdetails: walletdetails,
            ceekserverURL: ceekserverURL,
            inputObj: inputObj,
            cryptobalance: cryptobalance,
            getmyvotes: getmyvotes,

            serverURL: serverURL,
            fileserverURL: fileserverURL,
            getPaymentTransactions: getPaymentTransactions,
            getETHTransactions: getETHTransactions,
            getERC20Transactions: getERC20Transactions,
            getmyfav: getmyfav,
            getartistfiles: getartistfiles,
            votemodel: votemodel,
            vote: vote


        };

    });
});