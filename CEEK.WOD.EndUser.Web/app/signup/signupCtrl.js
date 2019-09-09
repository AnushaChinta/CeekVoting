define(['main', 'common/sessionService', 'signup/signupFactory'], function (app) {
    'use strict';
    sessionStorage.setItem('token', '');
    app.controller('signupCtrl', function ($scope, $http, $location, $anchorScroll, $rootScope, $templateCache, sessionService, signupFactory) {
       
        $scope.model = signupFactory.model();
        $scope.failmodel = {};
        $scope.ceekserverURL = signupFactory.ceekserverURL;
        $scope.serverURL = signupFactory.serverURL;

        //Submit form on press enter
        var input = document.getElementById("password");
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("signup").click();
            }
        });

        var onInsertSuccess = function (response) {
            //console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $location.path('login');
            $anchorScroll();

        };

        var onInsertError = function (response) {
           
            //console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.failmodel = response.data;
        };
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
        //Token
        function setToken(data) {
            var payload = data;
            payload.ceek_userid = data._id;
            $http.post($scope.serverURL + 'api/v1/user/setusertoken', payload,
           {
               'Content-Type': 'application/json',
               "DeviceName": navigator.userAgent,
           }).
         then(function (data, status, headers, config) {
             var profile = data.data.message["0"].cvr_setusertoken["0"];
             payload.ceek_points = profile.ceek_points;
             payload.totalvotes = profile.totalvotes_polled;
             setSession(payload);
         }, function (error) {
             console.log('settoken-error', error);
         });

        }

        function setSession(data) {

            sessionStorage.setItem('ceek_userid', data.ceek_userid);
            sessionStorage.setItem('profile', JSON.stringify(data));
            if (data.ceek_points != null)
                sessionStorage.setItem('ceekPoints', parseFloat(data.ceek_points).toFixed(2));
            else
                sessionStorage.setItem('ceekPoints', 0);
            sessionStorage.setItem('totalVotes', parseInt(data.totalvotes));
            if (data.userName == "") {
                sessionStorage.setItem('username', data.fullName);
            } else
                sessionStorage.setItem('username', data.userName);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('token', data.token);
            signupFactory.getEvents().then(on_getevents_success, on_getevents_error);

            //$rootScope.showLoading = false;
            //$rootScope.$emit("Login", {});
        }


        $scope.save = function (form) {
            if (form.$valid) {
                $scope.$parent.showLoading = true;
                console.log("model", $scope.model);
                signupFactory.signup($scope.model).then(onInsertSuccess, onInsertError);
            }
           
        }
        $scope.Login = function () {
            $location.path('login');
            $anchorScroll();
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