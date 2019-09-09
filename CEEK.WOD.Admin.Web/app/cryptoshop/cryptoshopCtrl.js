var dependencies = ['main', 'cryptoshop/cryptoshopFactory'];
define(dependencies, function (app, cryptoshopFactory) {
    app.controller("cryptoshopCtrl", function ($scope, $stateParams, cryptoshopFactory, $location) {
        'use strict';

        $scope.$parent.isArtist = false;
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        $scope.model = cryptoshopFactory.mockData();
        $scope.serverURL = cryptoshopFactory.fileserverURL;
      

        $scope.showError = false;

        $scope.Edit = function (model) {
            $location.path('cryptoInfo/' + model.packageUniqueKey);
        };


        $scope.Sub_planModel = {

        };

        var onGetall_subplansSuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log("onGetall_subplansSuccess : ", response);
            if (response.data.message != "") {


                $scope.packageList = response.data.message["0"].cvr_getallsubscriptionplans;

                if (typeof ($scope.packageList) != 'undefined') {
                    for (var i = 0; i < $scope.packageList.length; i++) {
                        if ($scope.packageList[i].packageImageUrl == "") {
                            $scope.packageList[i].fullimageurl = 'img/Plans_placeholder.png';
                        } else {
                            $scope.packageList[i].fullimageurl = $scope.serverURL + $scope.packageList[i].packageImageUrl;
                        }
                    }
                }
               

                // console.log("packageList : ", $scope.packageList);



            }

        };

        var onGetall_subplansError = function (response) {
            console.log("onGetall_subplansError:", JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.showError = true;
            $scope.$parent.showLoading = false;

        };


        $scope.getall_subplans = function () {
            $scope.$parent.showLoading = true;
            cryptoshopFactory.getALLSubscriptionPlans().then(onGetall_subplansSuccess, onGetall_subplansError);
        };

        $scope.move_up = function () {
           
            $('#list').animate({ scrollTop: '400px' }, 800);
        }
        $scope.move_down = function () {

            $('#list').animate({ scrollTop: '0px' }, 800);
        }

        $scope.getall_subplans();


    });
});