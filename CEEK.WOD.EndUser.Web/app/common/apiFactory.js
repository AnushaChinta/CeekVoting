
var dependencies = ['main'];
define(dependencies, function (app) {
    app.factory("apiFactory", function ($http, $location) {

        var stripekey = "pk_test_2MdtvXrIuX2ZIW82yt0ADbcy";
        // var fileserverURL = $location.protocol() + "://54.219.243.95:8222/";
        // var serverURL = $location.protocol() + "://52.9.115.125:8888/";

        var fileserverURL = $location.protocol() + "://18.144.13.106:80/";
        var serverURL = $location.protocol() + "://13.56.16.150:8888/";
        var ceekserverURL = 'https://vr.ceek.com/';
        
        var baseURL = function () {
            return serverURL + "api/v1/";
        };

        var etherscanURL = $location.protocol() + '://etherscan.io/';
        var etherscanApiURL = $location.protocol() + '://api.etherscan.io/';
        var etherscanApiKey = '8994WXPR32CTGXYZPVEC568I6QENPII1V9';

        var privateBlockchainURL = 'https://blockchain.ceek.com/';


        var httpGet = function (url) {
            return $http({
                method: "GET",
                url: url,
                headers: {
                    //"Authorization": sessionStorage.getItem('token'),
                    "DeviceName": navigator.userAgent,
                    "token": sessionStorage.getItem('token')
                }
            })
            .then(function (response) {
                return response;
            });
        };

        var httpPost = function (url, data) {
            return $http({
                method: "POST",
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    // "Authorization": sessionStorage.getItem('token'),
                    "DeviceName": navigator.userAgent,
                    "token": sessionStorage.getItem('token')
                }
            })
            .then(function (response) {
                return response;
            });
        };

        var simplehttpPost = function (url, data) {
            return $http({
                method: "POST",
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                return response;
            });
        };

        var httpGetLogin = function (url, username, password) {
            return $http({
                method: "GET",
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    'Username': username,
                    'Password': password,
                    "DeviceName": navigator.userAgent
                }
            })
           .then(function (response) {
               return response;
           });
        };

        var simplehttpGet = function (url) {
            return $http({
                method: "GET",
                url: url
            })
            .then(function (response) {
                return response;
            });
        };



        return {
            serverURL: serverURL,
            baseURL: baseURL,
            stripekey: stripekey,
            fileserverURL: fileserverURL,
            ceekserverURL: ceekserverURL,
            etherscanApiURL: etherscanApiURL,
            etherscanApiKey: etherscanApiKey,
            etherscanURL: etherscanURL,
            privateBlockchainURL:privateBlockchainURL,
            httpGet: httpGet,
            httpPost: httpPost,
            simplehttpPost: simplehttpPost,
            httpGetLogin: httpGetLogin,
            simplehttpGet: simplehttpGet
        };

    });
});
