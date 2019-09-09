var dependencies = ['main', 'profile/profileFactory'];
define(dependencies, function (app, profileFactory) {
    app.controller("changePasswordCtrl", function ($scope, $stateParams,$rootScope, profileFactory, $location) {
        'use strict';
    
        $scope.login = function () {
            $location.path('login');
        }
        //Submit form on press enter
        var input = document.getElementById("password");
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("create").click();
            }
        });
        var onInsertSuccess = function (response) {

            $scope.$parent.showLoading = false;
            $scope.message = "Password updated Successfully";
        };

        var onInsertError = function (response) {

            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message1 = "Failed to update Password";
           
        };
        var data=sessionStorage.getItem('changepswdemail')
       
        var obj = JSON.parse(data);
        $scope.emailid = obj.emailid;
        $scope.save = function (form) {
            if (form.$valid) {
                $scope.message = "";
                $scope.message1 = "";
                $scope.$parent.showLoading = true;
                var data = sessionStorage.getItem('changepswdemail')
                var obj = JSON.parse(data);
                $scope.id = obj.id;
                $scope.model.userid = $scope.id;
                $scope.model.emailid = $scope.emailid;
                profileFactory.changepassword($scope.model).then(onInsertSuccess, onInsertError);
            }

        }
        $scope.cancel = function () {
            $location.path('user');
        }
       
    });
});