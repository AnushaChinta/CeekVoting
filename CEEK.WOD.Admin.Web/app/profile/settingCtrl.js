var dependencies = ['main', 'profile/profileFactory'];
define(dependencies, function (app, profileFactory) {
    app.controller("settingCtrl", function ($scope, $location, $rootScope, $stateParams, profileFactory, $http) {
        'use strict';

        $scope.$parent.isArtist = false;
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }

        $scope.username = '';
        $scope.password = '';
        $scope.model = profileFactory.model();

        //Submit form on press enter
        var input = document.getElementById("password");
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("verify").click();
            }
        });


        var ongetCeekPointSettingssuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {
                $scope.CeekPointmodel = response.data.message[0].cvr_getceekpointsettingsbyid[0];
                $scope.numberofvotes = $scope.CeekPointmodel.numberofvotes;
                $scope.ceek_points = $scope.CeekPointmodel.ceek_points;



            }

        };
        var ongetCeekPointSettingserror = function (response) {

            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to get CeekPoint";

        };

        var ongetUpdateCeekPointSettingssuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));

            $scope.popupclose();
            $scope.message1 = "";

            $scope.username = "";
            $scope.password = "";

            if (response.data.message) {
                $scope.CeekPointmodel = response.data.message[0].cvr_update_ceekpointsetting;
                $scope.numberofvotes = $scope.CeekPointmodel.numberofvotes;
                $scope.ceek_points = $scope.CeekPointmodel.ceek_points;



            }

        };
        var ongetupdateCeekPointSettingserror = function (response) {

            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to Update CeekPoint";

            //  $scope.popupclose();

        };

        function setSession(data) {

            //sessionStorage.setItem('token',null);
            sessionStorage.setItem('token', data.login_token);
            sessionStorage.setItem('profile', JSON.stringify(data));
            sessionStorage.setItem('username', data.firstname + ' ' + data.lastname);
            sessionStorage.setItem('email', data.emailid);
            sessionStorage.setItem('userid', data.id);

            $rootScope.showLoading = false;


        }
        $scope.MSG = function () {
            $scope.errmsg = false;
        }
        $scope.errmsg = false;
        $scope.Verify = function (form) {

            if (form.$valid) {

                $scope.showError = false;
                $scope.isclicked = true;
                 $rootScope.showLoading = true;
                $http.post(profileFactory.serverURL + 'api/v1/user/loginuser', { emailid: $scope.username, password: $scope.password },
                {
                    'Content-Type': 'application/json',
                    "DeviceName": navigator.userAgent,
                }).
              then(function (data, status, headers, config) {

                  if (typeof (data.data.message[0].cvr_login.id) != 'undefined') {
                      setSession(data.data.message[0].cvr_login);

                      $scope.message1 = "Successfully verified !";

                      $scope.CeekUpdate(form);
                      $scope.BlockUpdate(form);

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
                $scope.errmsg = true;
               
            }

        }
      
        $scope.showVoteThanksPopUp = false;
        $scope.CeekUpdate = function (form) {
            if (form.$valid) {
                $scope.profile = sessionStorage.getItem("profile");
                var obj = JSON.parse($scope.profile);
                $scope.id = obj.id;
                $scope.message = "";

                $scope.$parent.showLoading = true;
                $scope.input = {
                    "ceek_points": $scope.ceek_points,
                    "numberofvotes": $scope.numberofvotes,
                    "userid": $scope.id,
                    "id": "1",
                    "eventid": "1"
                };

                if ($scope.ceek_points <= 0) {
                    //alert('Value should be greater than 0');
                    $scope.$parent.showLoading = false;
                    $scope.message = "Value should be greater than 0";
                } else {
                    $scope.message = "";
                    profileFactory.UpdateCeekpoint($scope.input).then(ongetUpdateCeekPointSettingssuccess, ongetupdateCeekPointSettingserror);
                }
            }
        }

        $scope.back = function () {
            $scope.showVoteThanksPopUp = false;
        }

        $scope.close = function () {
            $scope.showVoteThanksPopUp = false;
        }

        var ongetGetBlockchaindetailssuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {
                $scope.BlockchaindetailsModel = response.data.message[0].cvr_getblockchaindetails[0];
                $scope.smartcontract_address = $scope.BlockchaindetailsModel.smartcontract_address;
                $scope.owner_address = $scope.BlockchaindetailsModel.owner_address;
                $scope.public_neturl = $scope.BlockchaindetailsModel.public_neturl;
                $scope.private_neturl = $scope.BlockchaindetailsModel.private_neturl;
                $scope.private_fromaccount = $scope.BlockchaindetailsModel.private_fromaccount;
                $scope.private_privatekey = $scope.BlockchaindetailsModel.private_privatekey;
                $scope.private_contractaddress = $scope.BlockchaindetailsModel.private_contractaddress;
                $scope.enablebatchprocess = $scope.BlockchaindetailsModel.enablebatchprocess;
                $scope.batch_tokencount = $scope.BlockchaindetailsModel.batch_tokencount;
            }

        };
        var ongetGetBlockchaindetailserror = function (response) {

            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to get Blockchaindetails";

        };


        var ongetGetUpdateBlockchaindetailssuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {
                $scope.BlockchaindetailsModel = response.data.message[0].cvr_update_blockchainsetting;
                $scope.smartcontract_address = $scope.BlockchaindetailsModel.smartcontract_address;
                $scope.owner_address = $scope.BlockchaindetailsModel.owner_address;
                $scope.public_neturl = $scope.BlockchaindetailsModel.public_neturl;
                $scope.private_neturl = $scope.BlockchaindetailsModel.private_neturl;
                $scope.private_fromaccount = $scope.BlockchaindetailsModel.private_fromaccount;
                $scope.private_privatekey = $scope.BlockchaindetailsModel.private_privatekey;
                $scope.private_contractaddress = $scope.BlockchaindetailsModel.private_contractaddress;
                $scope.enablebatchprocess = $scope.BlockchaindetailsModel.enablebatchprocess;
                $scope.batch_tokencount = $scope.BlockchaindetailsModel.batch_tokencount;


            }

        };
        var ongetGetUpdateBlockchaindetailserror = function (response) {

            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to Update Blockchaindetails";
        };

        $scope.BlockUpdate = function () {
            $scope.$parent.showLoading = true;
            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);
            $scope.id = obj.id;

            $scope.inputjson = {
                "smartcontract_address": $scope.smartcontract_address,
                "owner_address": $scope.owner_address,
                "public_neturl": $scope.public_neturl,
                "id": "1",
                "private_neturl": $scope.private_neturl,
                "privatekey": $scope.BlockchaindetailsModel.privatekey,
                "gas_used": $scope.BlockchaindetailsModel.gas_used,
                "private_fromaccount": $scope.private_fromaccount,
                "private_privatekey": $scope.private_privatekey,
                "private_contractaddress": $scope.private_contractaddress,
                "enablebatchprocess": $scope.enablebatchprocess,
                "batch_tokencount": $scope.batch_tokencount,
                "userid": $scope.id
            };

            profileFactory.UpdateBlockchainSetting($scope.inputjson).then(ongetGetUpdateBlockchaindetailssuccess, ongetGetUpdateBlockchaindetailserror);

        }

        $scope.CeekPointSettings = function () {
            $scope.$parent.showLoading = true;
            // $scope.profile = sessionStorage.getItem("profile");
            $scope.model.id = "1";

            profileFactory.GetCeekpointSettingbyid($scope.model.id).then(ongetCeekPointSettingssuccess, ongetCeekPointSettingserror);
        }


        $scope.popupclose = function () {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            //   $location.path('account');
            //   $anchorScroll();
        }


        $scope.Blockchaindetails = function () {
            $scope.$parent.showLoading = true;

            profileFactory.GetBlockchaindetails().then(ongetGetBlockchaindetailssuccess, ongetGetBlockchaindetailserror);
        }


        if (sessionStorage.getItem("profile") != null) {
            $scope.CeekPointSettings();
            $scope.Blockchaindetails();
        }
    });
});