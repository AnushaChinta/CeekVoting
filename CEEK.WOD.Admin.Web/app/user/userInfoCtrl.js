var dependencies = ['main', 'user/userFactory'];
define(dependencies, function (app, userFactory) {
    app.controller("userInfoCtrl", function ($scope, $stateParams, userFactory, $location, $http) {
        'use strict';

        $scope.$parent.isArtist = false;

        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        $scope.profile = JSON.parse(sessionStorage.getItem("profile"));
        debugger;
        $scope.serverURL = userFactory.fileserverURL;
        $scope.uniqueid = typeof ($stateParams.id) == 'undefined' ? '' : $stateParams.id;
        $scope.model = userFactory.model();
        $scope.uploadModel = userFactory.uploadModel();
        $scope.uploadModel.createdby = $scope.profile.id;
        $scope.input = {
            "uniqueid": $scope.uniqueid,
            "id": 0,
        };
        $scope.isEdit = false;
        $scope.show1 = true;
        var onInsertSuccess = function (response) {
            console.log(JSON.stringify(response));
            if (response.data.message[0].cvr_insert_user.messgae) {
                $scope.message = response.data.message[0].cvr_insert_user.messgae;
            }
            else {
                $location.path('user');
            }
        };

        var onInsertError = function (response) {
            console.log(JSON.stringify(response));
            $scope.showError = true;
            $scope.message = "Failed to create user"
            $scope.$parent.showLoading = false;
        };


        var onupdateSuccess = function (response) {
            console.log(JSON.stringify(response));

            $location.path('user');
            $scope.$parent.showLoading = false;

        };

        var onupdateError = function (response) {
            console.log(JSON.stringify(response));
            $scope.message = "Failed to update user";
            $scope.$parent.showLoading = false;
        };



        $scope.save = function (form) {
            if (form.$valid) {

                console.log("model", $scope.model);
                $scope.model.user_type = "admin";
                // $scope.model.password = "1234";
                //  $scope.model.fullname = $scope.model.firstname + $scope.model.lastname;
                $scope.profile = sessionStorage.getItem("profile");
                var obj = JSON.parse($scope.profile);
                $scope.id = obj.id;
                $scope.model.userid = $scope.id;
                if ($scope.uniqueid != '') {
                    userFactory.update($scope.model).then(onupdateSuccess, onupdateError);


                }
                else {
                    userFactory.insert($scope.model).then(onInsertSuccess, onInsertError);
                }
            }
        }

        $scope.cancel = function () {
            $location.path('user');
        }

        var getuserbyidSuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {


                $scope.artistmodel = response.data.message[0];
                $scope.model = $scope.artistmodel.cvr_getuserbyid[0];


            }
        };
        $scope.closepopup = function () {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
        }
        var getuserbyidError = function (response) {
            console.log(JSON.stringify(response));
            $scope.message = "Failed to get User details";
            $scope.$parent.showLoading = false;
        };
      
        //Get details if Id present
        if ($scope.uniqueid != '') {
            $scope.isEdit = true;
            $scope.show = true;
            $scope.show1 = false;
            $scope.$parent.showLoading = true;
            userFactory.getuser($scope.input).then(getuserbyidSuccess, getuserbyidError);


        }

        //Delete artist

        var ondeleteSuccess = function (response) {
            $scope.show = false;
            console.log(JSON.stringify(response));
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            $location.path('user');
        };
        var ondeleteError = function (response) {
            console.log(JSON.stringify(response));
            $scope.message = "Failed to delete User";
            $scope.$parent.showLoading = false;
        };


        $scope.delete = function () {
           
            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);
            $scope.id = obj.id;

            userFactory.softdelete({ userid: $scope.id, id: $scope.model.id }).then(ondeleteSuccess, ondeleteError)
        }

    });

});

