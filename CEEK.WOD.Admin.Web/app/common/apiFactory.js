
var dependencies = ['main'];
define(dependencies, function (app) {
    app.factory("apiFactory", function ($http, $location) {

       // var fileserverURL = $location.protocol() + "://54.219.243.95:8222/";
        // var serverURL = $location.protocol() + "://52.9.115.125:8888/";

        var fileserverURL = $location.protocol() + "://18.144.13.106:80/";
        var serverURL = $location.protocol() + "://13.56.16.150:8888/";
        var etherscanURL = $location.protocol() + '://etherscan.io/';
        var baseURL = function () {
            return serverURL+"api/v1/";
        };

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
                    //"Authorization": sessionStorage.getItem('token'),
                    "DeviceName": navigator.userAgent,
                    "token": sessionStorage.getItem('token')
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



        return {
            fileserverURL: fileserverURL,
            serverURL: serverURL,
            baseURL: baseURL,
            etherscanURL: etherscanURL,
            httpGet: httpGet,
            httpPost: httpPost,
            httpGetLogin: httpGetLogin
        };

    });
});
