var dependencies = ['main', 'profile/profileFactory'];
define(dependencies, function (app, profileFactory) {
    app.controller("qrcodeCtrl", function ($scope, $stateParams,$rootScope, profileFactory, $location) {
        'use strict';

        //$scope.$parent.isArtist = false;
        //if (!$scope.$parent.isAuth) {
        //    $location.path('login');
        //    return;
        //}
        //we get qrcode  details from register
        $('#myModal').hide();
        $('.modal-backdrop').remove();
        var profile = sessionStorage.getItem('profile');
        //Submit form on press enter
        var input = document.getElementById("otp");
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("create").click();
            }
        });
        $scope.level1 = true;
        $scope.level2 = false;
        var onchange2fastatusSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.level1 = false;
            $scope.level2 = true;
            $scope.response = response.data.message[0].cvr_set_2fa_details;
            sessionStorage.setItem('two_faauthenable', $scope.response.two_faauthenable);
            $scope.qrcode = 'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=' + $scope.response.two_fasecreturi;
        };
        var onchange2fastatusError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.change2fastatusError = "Failed to enable 2FA";

        };

        $scope.enable2fa = function () {
            $scope.change2fastatusError = "";
            $scope.$parent.showLoading = true;
            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);
            $scope.id = obj.id;
            $scope.emailid = obj.emailid;
          
                $scope.change2fastatusinput = {
                    'userid': $scope.id,
                    'emailid': $scope.emailid,
                    'enable_2fa': 'true'
                }
                profileFactory.change2fastatus($scope.change2fastatusinput).then(onchange2fastatusSuccess, onchange2fastatusError);

            
        }
        var ongetqrcodeError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            // $scope.change2fastatusError = "Failed to enable 2FA";

        };
        var ongetqrcodeSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;

            $scope.response = response.data.message[0].cvr_set_2fa_details;
            sessionStorage.setItem('two_faauthenable', $scope.response.two_faauthenable);
            $scope.qrcode = 'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=' + $scope.response.two_fasecreturi;
        };
        $scope.getqrcode = function () {
            $scope.change2fastatusError = "";
            $scope.$parent.showLoading = true;
            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);
            $scope.id = obj.id;
            $scope.emailid = obj.emailid;

            $scope.change2fastatusinput = {
                'userid': $scope.id,
                'emailid': $scope.emailid,
                'enable_2fa': 'false'
            }
            profileFactory.change2fastatus($scope.change2fastatusinput).then(ongetqrcodeSuccess, ongetqrcodeError);


        }
        $scope.getqrcode();
        $scope.next = function () {

            $scope.enable2fa();
        }
        $scope.msg = function () {
            $scope.message1 = "";
        }
       
        var onValidate2faSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            if (response.data.message.authstatus) {
                $rootScope.$emit("validate2fa", {});
                $scope.message1 = "2FA Enabled Successfully"
            }
            else {
                $scope.message1 = "Please enter valid AUTHENTICATOR OTP"
            }

        };

        var onValiate2faError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message1 = "Please enter valid AUTHENTICATOR OTP"
        };

        $scope.submit = function (form) {
            if (form.$valid) {
                $scope.message1 = "";
                $scope.$parent.showLoading = true;
                $scope.profile = sessionStorage.getItem("profile");
                var obj = JSON.parse($scope.profile);
                $scope.id = obj.id;
                $scope.input = {
                    'code': $scope.otp,
                    'userid': $scope.id
                }
                profileFactory.validate2fa($scope.input).then(onValidate2faSuccess, onValiate2faError);

            }
        }
    });
});