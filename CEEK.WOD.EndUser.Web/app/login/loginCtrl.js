define(['main', 'common/sessionService', 'login/loginFactory'], function (app) {
    'use strict';

    sessionStorage.setItem('token', '');
    app.controller('loginCtrl', function ($scope, $location, $rootScope, $anchorScroll, $templateCache, sessionService, loginFactory, $http) {

        $scope.init = function () {
            console.log("Login page Loading");

        }

        function isEmail(search) {
            var serchfind = false;

            var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            serchfind = regexp.test(search);

            console.log('isemail', serchfind);
            return serchfind;
        }

        //simple call init function on controller
        $scope.init();
        $scope.$parent.isArtist = false;
        $scope.username = '';
        $scope.email = '';
        $scope.password = '';
        $scope.showError = false;
        $scope.serverURL = loginFactory.serverURL;
        $scope.ceekserverURL = loginFactory.ceekserverURL;


        //Submit form on press enter
        var input = document.getElementById("password");
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("login").click();
            }
        });

        var on_getevents_success = function (response) {

           // console.log(JSON.stringify(response));
            if (response.data.message) {
                var eventsData = JSON.stringify(response.data.message[0].cvr_getallevents);
                sessionStorage.setItem('eventsList', eventsData);
                $rootScope.$emit("Login", {});
            }
            else {

            }

        };

        var on_getevents_error = function (response) {
            console.log(JSON.stringify(response));

        };
        $scope.reset = function () {
            $location.path('forgotpassword')
        }
       
        //Token
        function setToken(data) {
            var payload = data;
            payload.ceek_userid = data._id;
            $http.post($scope.serverURL+'api/v1/user/setusertoken', payload,
           {
               'Content-Type': 'application/json',
               "DeviceName": navigator.userAgent,
           }).
         then(function (data, status, headers, config) {
             var profile = data.data.message["0"].cvr_setusertoken["0"];
             payload.ceek_points = profile.ceek_points;
             payload.totalvotes = profile.totalvotes_polled;
             payload.crypto_addr_public = profile.crypto_addr_public;
             setSession(payload);
         }, function (error) {
             console.log('settoken-error', error);
         });
         
        }

        function setSession(data) {

            sessionStorage.setItem('ceek_userid', data.ceek_userid);
            sessionStorage.setItem('profile', JSON.stringify(data));
            if (data.ceek_points!=null)
                sessionStorage.setItem('ceekPoints',  parseFloat(data.ceek_points).toFixed(2));
            else
                sessionStorage.setItem('ceekPoints', 0);
            sessionStorage.setItem('totalVotes', parseInt(data.totalvotes));
            if (data.userName == "") {
                sessionStorage.setItem('username', data.fullName);
            }else
            sessionStorage.setItem('username', data.userName);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('wallet_address', data.crypto_addr_public);
            $rootScope.showLoading = false;
            loginFactory.getEvents().then(on_getevents_success, on_getevents_error);
            debugger;
           
            $rootScope.$emit("Login", {});
        }

        $scope.Register = function () {
            $location.path('signup');
        }
        $scope.MSG = function () {
            $scope.showError = false;
        }
        $scope.login = function (form) {
            if (form.$valid) {
                $scope.showError = false;
                $scope.isclicked = true;
                $scope.$parent.showLoading = true;

                var visEmail = isEmail($scope.username);
                var inputObj = {};
                if (visEmail) {
                    inputObj = { email: $scope.username, password: $scope.password };
                }
                else {
                    inputObj = { userName: $scope.username, password: $scope.password };
                }

                $http.post($scope.ceekserverURL + 'tv/signIn', inputObj,
                    {
                        'Content-Type': 'application/json',
                        "DeviceName": navigator.userAgent,
                    }).
                  then(function (data, status, headers, config) {
                      console.log('login setusertoken');
                      setToken(data.data);
                      $anchorScroll();
                  },
                  function (error) {
                      $scope.$parent.showLoading = false;
                      $scope.showError = true;
                      console.log("Login Error");

                  });
            }
        }

        if (sessionStorage.getItem("profile") != null) {
            $rootScope.$emit("Login", {});
        }

        window.fbAsyncInit = function () {
            FB.init({
                appId: '222990738429970',
                // appId:356238951221544,  //client appid
                xfbml: true,
                version: 'v3.0',
                secret: '7e0cdd9e813fd42155cf9f3492bd348c'
            });
            FB.getLoginStatus(function (response) {
              
                if (response.status === 'connected') {
                    //document.getElementById('status').innerHTML = 'We are connected.';

                } else if (response.status === 'not_authorized') {
                    //document.getElementById('status').innerHTML = ''/*you are not logged in*/

                } else {
                    //document.getElementById('status').innerHTML = '';/*'You are not logged into Facebook.';*/

                }
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // login with facebook with extra permissions
        $scope.fblogin = function () {
            FB.login(function (response) {
                $scope.fbresponse = response.authResponse;
                $scope.userId = $scope.fbresponse.userID;
                if (response.status === 'connected') {
                    FB.api('/me', 'GET', { fields: 'first_name,last_name,name,id,picture,email' }, function (response) {
                        console.log(response);
                        var input = {
                            "fbId": $scope.fbresponse.userID,
                            "token": $scope.fbresponse.accessToken,
                            'is_from_facebook_voting_app': true
                        }
                        $http.post($scope.ceekserverURL + 'tv/signIn', input,
                    {
                        'Content-Type': 'application/json',
                        "DeviceName": navigator.userAgent,
                    }).
                  then(function (data, status, headers, config) {
                      console.log('fblogin setusertoken');
                      setToken(data.data);
                  },
                  function (error) {
                      $scope.$parent.showLoading = false;
                      $scope.showError = true;
                      console.log("Login Error");

                  });
                    });
                   

                } else if (response.status === 'not_authorized') {
                    //document.getElementById('status').innerHTML = 'We are not logged in.'

                } else {
                    //  document.getElementById('status').innerHTML = 'You are not logged into Facebook.';

                }
            }, { scope: 'email' });
        }



    });

});