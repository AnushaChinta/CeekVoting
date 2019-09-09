var dependencies = ['main', 'profile/profileFactory'];
define(dependencies, function (app, profileFactory) {
    app.controller("accountInfoCtrl", function ($scope, $rootScope, $stateParams, profileFactory, $location) {
        'use strict';
        $scope.$parent.isArtist = true;
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        $scope.model = profileFactory.model();
        $scope.serverURL = profileFactory.fileserverURL;


        //$scope.TrasactionDetails = profileFactory.mockData();

        //if (typeof ($scope.TrasactionDetails.Trasaction_details) != 'undefined') {
        //    for (var i = 0; i < $scope.TrasactionDetails.Trasaction_details.length; i++) {
        //        $scope.List = $scope.TrasactionDetails.Trasaction_details[i];

        //        $scope.TransactionId = $scope.List.TransactionId;

        //        $scope.TypeOfTransaction = $scope.List.TypeOfTransaction;
        //        $scope.TokenGainedOrBurned = $scope.List.TokenGainedOrBurned;

        //        if ($scope.List.SubsciptionPlanCost)
        //            $scope.SubsciptionPlanCost = $scope.List.SubsciptionPlanCost;
        //        else {
        //            $scope.VoteCasted = $scope.List.VoteCasted;

        //        }
        //        if ($scope.List.SubsciptionPlanName)
        //            $scope.SubsciptionPlanName = $scope.List.SubsciptionPlanName;
        //        else {
        //            $scope.VoteArtistName = $scope.List.VoteArtistName;

        //        }
        //        if ($scope.List.SubscriptionPlanPic)
        //            $scope.SubscriptionPlanPic = $scope.List.SubscriptionPlanPic;
        //        else {
        //            $scope.VoteArtistPic = $scope.List.VoteArtistPic;

        //        }
        //        $scope.WalletBalanceBefore = $scope.List.WalletBalanceBefore;

        //        $scope.WalletBalanceAfter = $scope.List.WalletBalanceAfter;
        //        $scope.Timestamp = $scope.List.Timestamp;

        //    }
        //}




        var ongetaccountsuccess = function (response) {
            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));
            if (response.data.message) {
                $scope.accountmodel = response.data.message[0].cvr_setusertoken[0];
                $scope.accountmodel.ceek_points = $scope.accountmodel.ceek_points.toFixed(1);
                $scope.accountmodel.crypto_addr_public = $scope.accountmodel.crypto_addr_public;
                sessionStorage.setItem('wallet_address', $scope.accountmodel.crypto_addr_public);

            }
            $scope.makeCode();
        };
       
      
        var ongetaccounterror = function (response) {
            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));
            $scope.message = "Failed to load Account details"
        };

        var ongetbalancesuccess = function (response) {
            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));
            if (response.data.message) {

                $scope.ceekPoints = response.data.message.token_balance_indecimals.toFixed(2);
                $scope.ETH_balance = response.data.message.ETH_balance_indecimals.toFixed(4);
                $scope.$parent.showLoading = false;
            }
            $scope.makeCode();
        };
        var ongetbalanceerror = function (response) {
            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));
            $scope.message = "Failed to load Account details"
        };


        
        $scope.loadaccountdetails = function () {
            $scope.$parent.showLoading = true;
            // $scope.profile = sessionStorage.getItem("profile");
            $scope.model.ceek_userid = $scope.$parent.ceek_userid;
            $scope.model.email = $scope.$parent.email;
            $scope.model.userName = $scope.$parent.username;
            profileFactory.walletdetails($scope.model).then(ongetaccountsuccess, ongetaccounterror);
            profileFactory.cryptobalance($scope.model).then(ongetbalancesuccess, ongetbalanceerror);
        }


        $scope.refreshwalletbalance = function () {
            $scope.$parent.showLoading = true;
            $rootScope.$emit("RefreshWalletBalanceOnChain", {});
            $scope.accountmodel.ceek_points = sessionStorage.getItem('ceekPoints');
        }


        if (sessionStorage.getItem("profile") != null) {
            $scope.loadaccountdetails();

        }

        var qrcode = new QRCode("qrcode");

        $scope.makeCode = function () {
            var elText = document.getElementById("text");
            $scope.var = $scope.accountmodel.crypto_addr_public;
            if (!$scope.var) {
                alert("Input a text");
                elText.focus();
                return;
            }

            qrcode.makeCode($scope.var);
        }

        //$scope.makeCode();

        $("#text").
            on("blur", function () {
                makeCode();
            }).
            on("keydown", function (e) {
                if (e.keyCode == 13) {
                    makeCode();
                }
            });

    });
});