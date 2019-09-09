define(['main', 'common/sessionService', 'login/loginFactory'], function (app) {
    'use strict';

    app.controller('loginCtrl', function ($scope, $location, $rootScope, $templateCache, sessionService, loginFactory, $http) {

        debugger;
        $scope.init = function () {
            console.log("Login page Loading");

        }
        //simple call init function on controller
        $scope.init();

        $scope.username = '';
        $scope.password = '';
        $scope.showError = false;

        //Submit form on press enter
        var input = document.getElementById("password");
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("login").click();
            }
        });
        var input = document.getElementById("pass");
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("otp").click();
            }
        });

        var on_getevents_success = function (response) {

            console.log(JSON.stringify(response));
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

        function setSession(data) {

            //sessionStorage.setItem('token',null);
            sessionStorage.setItem('token', data.login_token);
            sessionStorage.setItem('profile', JSON.stringify(data));
            sessionStorage.setItem('username', data.firstname + ' ' + data.lastname);
            sessionStorage.setItem('email', data.emailid);
            sessionStorage.setItem('userid', data.id);
            sessionStorage.setItem('two_faauthenable', JSON.stringify(data.two_faauthenable))
            $rootScope.showLoading = false;
            if (data.user_type) {
                sessionStorage.setItem('user_type', data.user_type);
            }

            loginFactory.getEvents().then(on_getevents_success, on_getevents_error);

          
            //$rootScope.$emit("Login", {});
        }
        var onValidate2faSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            if (response.data.message.authstatus) {
                $rootScope.$emit("validate2fa", {});
            }
            else {
                $scope.message1 = "Please enter valid AUTHENTICATOR OTP"
            }
           
        };
        $scope.msg1 = function () {
            $scope.message2 = "";
            $scope.message1 = "";
        }
        var onValiate2faError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message1 = "Please enter valid AUTHENTICATOR OTP"
        };

        $scope.submitotp = function (form1) {
            $scope.message1 = "";
            $scope.message2 = "";
            if (form1.$valid) {
                $scope.$parent.showLoading = true;
                $scope.profile = sessionStorage.getItem("profile");
                var obj = JSON.parse($scope.profile);
                $scope.id = obj.id;
                $scope.input = {
                    'code': $scope.otp,
                    'userid': $scope.id
                }
                loginFactory.validate2fa($scope.input).then(onValidate2faSuccess, onValiate2faError);

            }
            else {
                $scope.message2 = "Please provide OTP";
            }
        }
      
        $scope.showotppopup = false;
        $scope.login = function (form) {           
            $scope.message2 = "";
            $scope.message1 = "";
            $scope.showotppopup = false;
            $('.modal-backdrop').remove();
            $('#myModal').hide();
            if (form.$valid) {
              
                $scope.showError = false;
                $scope.isclicked = true;
                $rootScope.showLoading = true;
                $http.post(loginFactory.serverURL+'api/v1/user/loginuser', { emailid: $scope.username, password: $scope.password },
                {
                    'Content-Type': 'application/json',
                    "DeviceName": navigator.userAgent,
                }).
              then(function (data, status, headers, config) {

                  $scope.showotppopup = false;
                  if (typeof (data.data.message[0].cvr_login.id) != 'undefined') {
                      if (data.data.message[0].cvr_login.two_faauthenable == true) {
                          $scope.showotppopup = true;
                         
                      }
                      
                      setSession(data.data.message[0].cvr_login);
                  } else {
                      $scope.error = (data.data.message[0].cvr_login.message);
                      $scope.message = "Invalid login credentials";
                  }
              },
                  function (error) {
                      $scope.$parent.showLoading = false;
                      $scope.showError = true;
                      console.log("Login Error");

                  });
            }
            else {
                $scope.showotppopup = false;
            //    $(".modal-backdrop").hide();
            //    //$("#myModal").removeClass("in");
            //    //  $("[class*='modal-backdrop']").remove();
            //    $('body').removeClass('modal-backdrop');
            //$('.modal-backdrop').remove();
            //$('#myModal').hide();
           // $(document.body).removeClass("modal-open");
        }
        }

        if (sessionStorage.getItem("profile") != null) {
            $rootScope.$emit("Login", {});
        }

    });

});