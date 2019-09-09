var dependencies = ['main', 'forgotpassword/forgotpasswordFactory'];
define(dependencies, function (app, forgotpasswordFactory) {
    app.controller("forgotpasswordCtrl", function ($scope, $stateParams, forgotpasswordFactory, $location) {
        'use strict';


        $scope.login = function () {
            $location.path('login');
        }
        var onInsertSuccess = function (response) {
           
            $scope.$parent.showLoading = false;
            $scope.message = "Mail has been sent to your Email Id"
           

        };

        var onInsertError = function (response) {

            //console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message1 = response.data.error.text;
            if(!response.data.error.text)
            $scope.message2 = response.data.error;
        };
        $scope.msg = function () {
            $scope.message = "";
            $scope.message1 = "";
            $scope.message2 = "";
        }
        $scope.save = function (form) {
            if (form.$valid) {
                $scope.message = "";
                $scope.message1 = "";
                $scope.$parent.showLoading = true;
                console.log("model", $scope.model);
                forgotpasswordFactory.forgotpswd($scope.model).then(onInsertSuccess, onInsertError);
            }

        }

    });
});