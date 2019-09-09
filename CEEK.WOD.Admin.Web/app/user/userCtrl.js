var dependencies = ['main', 'user/userFactory'];
define(dependencies, function (app, userFactory) {
    app.controller("userCtrl", function ($scope, $stateParams, userFactory, $location) {
        'use strict';

        $scope.$parent.isArtist = false;

        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        $scope.serverURL = userFactory.fileserverURL;
        $scope.model = userFactory.model();
        //var artistListObj = artistFactory.mockData();

        //if (typeof (artistListObj.artistList) != 'undefined') {
        //    for (var i = 0; i < artistListObj.artistList.length; i++) {
        //        artistListObj.artistList[i].userVote = 1;
        //    }
        //}

        //$scope.model = artistListObj;

        $scope.input = {
            "pageno": "1",
            "pagesize": "10"
        };

        $scope.changepassword = function (x) {
            sessionStorage.setItem('changepswdemail', JSON.stringify(x));
           
            $location.path('changepassword');
        }
        $scope.showError = false;
        $scope.Edit = function (model) {

            $location.path('userInfo/' + model.uniqueid);
        };

        $scope.userListmodel = {};
        $scope.userList = {};
        var ongetalluserssuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {


                $scope.userListmodel = response.data.message[0];
                $scope.userList = $scope.userListmodel.cvr_getalladmins;
              
            }

        };

        var ongetallusererror = function (response) {
            console.log(JSON.stringify(response));
            $scope.showError = true;
        };


        $scope.loadUsers = function () {
            $scope.$parent.showLoading = true;
            $scope.showError = false;

            userFactory.getallusers($scope.input).then(ongetalluserssuccess, ongetallusererror);
        }
        $scope.show = false;
        if (sessionStorage.getItem("profile") != null) {
            $scope.loadUsers();
            $scope.user_type = sessionStorage.getItem('user_type');
            if ($scope.user_type == "superadmin") {
                $scope.show = true;
            }
            else {
                $scope.show = false;
            }
        }

        $scope.move_up = function () {
            $(".box-row").animate({ "top": "-=8vw" }, "slow");
            $(".txt-ranking").animate({ "top": "-=8vw" }, "slow");
        }
        $scope.move_down = function () {

            if ($('.box-row').css('top') < '0px') {
                $(".box-row").animate({ "top": "+=8vw" }, "slow");
                $(".txt-ranking").animate({ "top": "+=8vw" }, "slow");
            }

        }

    });
});