var dependencies = ['main', 'cryptoshop/cryptoshopFactory'];
define(dependencies, function (app, cryptoshopFactory) {
    app.controller("cryptoInfoCtrl", function ($scope, $http, $stateParams, cryptoshopFactory, $location) {
        'use strict';

        $scope.$parent.isArtist = false;
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        $scope.model = cryptoshopFactory.infoModel();
        $scope.serverURL = cryptoshopFactory.fileserverURL;
      
        $scope.isEdit = false;
        //Getting ID from Queryparams
        $scope.uniqueid = typeof ($stateParams.id) == 'undefined' ? '' : $stateParams.id;


        $scope.cancel = function () {
            $location.path('cryptoshop');
        }
      
     


        var onGetPlan_infoSuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log("onGetPlan_infoSuccess : ", response);

            if (response.data.Message != "") {

                $scope.model = response.data.message["0"].cvr_getsubscriptionplansbyid["0"];
                var fullimageurl = $scope.serverURL + $scope.model.image;
                $scope.model.fullimageurl = fullimageurl;

            }

        };

        var onGetPlan_infoError = function (response) {
            $scope.$parent.showLoading = false;
            console.log("onGetPlan_infoError:", JSON.stringify(response));
            $scope.message = "Failed to get plan details";
        };


        var onCreateSuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log("onCreateSuccess : ", response);


            $location.path('cryptoshop');

        };

        var onCreateError = function (response) {
            console.log("onCreateError:", JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to create plan";
        };


        var onUpdateSuccess = function (response) {
            console.log("onUpdateSuccess : ", response);
            $scope.$parent.showLoading = false;

            $location.path('cryptoshop');

        };

        var onUpdateError = function (response) {
            console.log("onUpdateError:", JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to update plan";
        };

        //Get details if ID present
        if ($scope.uniqueid != '') {
            $scope.isEdit = true;
            $scope.show = true;
            $scope.show1 = true;
            cryptoshopFactory.getSubscriptionPlanbyID($scope.uniqueid).then(onGetPlan_infoSuccess, onGetPlan_infoError);
            $scope.model = {};
            $scope.$parent.showLoading = true;
        }
     //   $scope.model.fullimageurl = $scope.serverURL + response.data.filename.path;

        //Delete Cryptoshop

        var ondeleteSuccess = function (response) {
                $scope.show1 = false;
                console.log(JSON.stringify(response));
                $location.path('cryptoshop');
            };
            var ondeleteError = function (response) {
                console.log(JSON.stringify(response));
                $scope.message = "Failed to delete plan";
            };


            $scope.delete = function () {
               
                $scope.profile = sessionStorage.getItem("profile");
                var obj = JSON.parse($scope.profile);
                $scope.id = obj.id;

                cryptoshopFactory.softdelete({ userid: $scope.id, id: $scope.model.id }).then(ondeleteSuccess, ondeleteError)
            }

        //File upload
        $scope.package = {};
        $scope.uploadFile = function () {
            $scope.$parent.showLoading = true;
            $scope.message = "";
               var uploadUrl = $scope.serverURL + "api/v1/api/file";

            var fd = new FormData();

            fd.append("userFile", $scope.package.file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }

            })
            .then(function (response) {
                $scope.$parent.showLoading = false;
                $scope.model.image = response.data.filename.path;
                $scope.model.fullimageurl = $scope.serverURL + response.data.filename.path;
            },function (error){

            });
        };

        //Saving the details
        $scope.save = function (form) {
            if (form.$valid) {
                $scope.profile = sessionStorage.getItem("profile");
              
                var obj = JSON.parse($scope.profile);
                $scope.id = obj.id;
                $scope.model.userid = $scope.id;

                console.log(JSON.stringify($scope.model));
                if ($scope.model.plan_cost == "0") {
                    $scope.message = "Plan cost should be greater than 0";
                } else {
                    $scope.$parent.showLoading = true;
                    $scope.event_name = sessionStorage.getItem('selected_event_name');
                    if ($scope.uniqueid != '')
                        cryptoshopFactory.UpdateSubscriptionPlan($scope.model).then(onUpdateSuccess, onUpdateError);
                    else
                        cryptoshopFactory.createSubscriptionPlan($scope.model).then(onCreateSuccess, onCreateError);
                }
                
                   
            }
        }

    });

    app.directive('fileModel', ['$parse', function ($parse) {
        return {

            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                var maxSize = 5000000;
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                        var filesize = scope.package.file.size;
                        if (filesize > maxSize) {
                            scope.message = "Max file size exceeded 5MB";

                        }
                        else {

                            scope.uploadFile();
                        }
                    });
                   
                });
            }

        };
    }]);
});