var dependencies = ['main', 'events/eventFactory'];
define(dependencies, function (app, eventFactory) {
    app.controller("eventInfoCtrl", function ($scope,$rootScope, $stateParams, eventFactory,$filter, $location, $http) {
        'use strict';

        $scope.$parent.isArtist = false;

        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        $scope.profile = JSON.parse(sessionStorage.getItem("profile"));
        debugger;
        $scope.serverURL = eventFactory.fileserverURL;
        $scope.uniqueid = typeof ($stateParams.id) == 'undefined' ? '' : $stateParams.id;
        $scope.model = eventFactory.model();
        //$scope.model.event_endtime = '';
        //$scope.model.event_starttime = '';
        $(function () {
            $("#txtFrom").datepicker({
                numberOfMonths: 1,
                dateFormat: 'yy-mm-dd',
                onSelect: function (selected) {
                    var dt = new Date(selected);
                    dt.setDate(dt.getDate() + 1);
                    $("#txtTo").datepicker("option", "minDate", dt);
                    if (selected) {
                        $scope.model.event_starttime = selected;
                    }
                    // $scope.transactionmodel.fromdate = $filter('date')(selected, "dd-MM-yyyy");
                }
            });
            $("#txtTo").datepicker({
                numberOfMonths: 1,
                dateFormat: 'yy-mm-dd',
                onSelect: function (selected) {
                    var dt = new Date(selected);
                    dt.setDate(dt.getDate() - 1);
                    $("#txtFrom").datepicker("option", "maxDate", dt);
                    if (selected) {
                        $scope.model.event_endtime = selected;
                    }
                    //$scope.transactionmodel.todate = $filter('date')(selected, "dd-MM-yyyy");
                }
            });
        });
        $scope.closepopup = function () {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
        }

        var onInsertSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $location.path('event');
            $rootScope.$emit("RefreshEventsdropdown", {});

        };

        var onInsertError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.showError = true;
            $scope.message = "Failed to create event"
        };


        var onupdateSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $location.path('event');
            $rootScope.$emit("RefreshEventsdropdown", {});
        };

        var onupdateError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to update event";
        };



        $scope.save = function (form) {
            if (form.$valid) {
                $scope.$parent.showLoading = true;
                console.log("model", $scope.model);
                $scope.profile = sessionStorage.getItem("profile");
                var obj = JSON.parse($scope.profile);
                $scope.id = obj.id;
                $scope.model.userid = $scope.id;
               
                if ($scope.uniqueid != '') {
                    eventFactory.update($scope.model).then(onupdateSuccess, onupdateError);


                }
                else {
                    eventFactory.insert($scope.model).then(onInsertSuccess, onInsertError);
                }
            }
        }
        $scope.cancel = function () {
            $location.path('event');
        }
      
        var geteventbyidSuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {


                $scope.eventmodel = response.data.message[0];
                $scope.model = $scope.eventmodel.cvr_geteventsbyid[0];
                var fullimageurl = $scope.serverURL + $scope.model.event_logo;
                $scope.model.fullimageurl = fullimageurl;
                $scope.model.event_endtime = $filter("date")($scope.model.event_endtime, 'yyyy-MM-dd');
                $scope.model.event_starttime = $filter("date")($scope.model.event_starttime, 'yyyy-MM-dd');
            }
        };

        var geteventbyidError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to get event details";
        };

        //Get details if Id present
        if ($scope.uniqueid != '') {
            $scope.isEdit = true;
            $scope.show = true;
            $scope.show1 = true;
            $scope.message = "";
            $scope.$parent.showLoading = true;
            eventFactory.getevent($scope.uniqueid).then(geteventbyidSuccess, geteventbyidError);
         
        }
        var ondeleteSuccess = function (response) {
            $scope.show1 = false;
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            $location.path('event');
            $rootScope.$emit("RefreshEventsdropdown", {});
        };
        var ondeleteError = function (response) {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            $scope.message = "Failed to delete Event";
        };
     
        $scope.delete = function () {
            
            $scope.$parent.showLoading = true;
            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);
            $scope.id = obj.id;

            eventFactory.softdelete({ userid: $scope.id, id: $scope.model.id }).then(ondeleteSuccess, ondeleteError)
        }
        //File Upload
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
                $scope.model.event_logo = response.data.filename.path;
                $scope.model.fullimageurl = $scope.serverURL + response.data.filename.path;
            }, function (error) {

            });
        };


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

