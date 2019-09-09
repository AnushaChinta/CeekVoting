var dependencies = ['main', 'events/eventFactory'];
define(dependencies, function (app, eventFactory) {
    app.controller("eventCtrl", function ($scope, $stateParams, eventFactory, $location) {
        'use strict';

        $scope.$parent.isArtist = false;
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        $scope.serverURL = eventFactory.fileserverURL;
        $scope.model = eventFactory.model();

        $scope.showError = false;
        $scope.Edit = function (x) {

            $location.path('eventInfo/' + x.uniqueid);
        };

  
        $scope.eventList = {};
        var ongetalleventssuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {


                $scope.eventList = response.data.message[0].cvr_getallevents;
              
                if (typeof ($scope.eventList) != 'undefined') {
                    for (var i = 0; i < $scope.eventList.length; i++) {
                        $scope.eventList[i].fullimageurl = $scope.serverURL + $scope.eventList[i].event_logo;
                    }
                }

            }

        };

        var ongetalleventserror = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message ="Failed to load Events";
        };


        $scope.loadevents = function () {
            $scope.$parent.showLoading = true;
            $scope.message = "";
            eventFactory.getallevents().then(ongetalleventssuccess, ongetalleventserror);
        }

        if (sessionStorage.getItem("profile") != null) {
            $scope.loadevents();
        }

        $scope.move_down = function () {
            if (jQuery('.video').css('top') < '0px') {
                jQuery(".video").animate({ "top": "+=16vw" }, "slow");
            }

        }

        $scope.move_up = function () {
            jQuery(".video").animate({ "top": "-=16vw" }, "slow");
        }


    });
});