var dependencies = ['main', 'home/homeFactory'];
define(dependencies, function (app, homeFactory) {
    app.controller("homeCtrl", function ($scope,$rootScope, $stateParams, $anchorScroll, homeFactory, $location) {
        'use strict';

        $scope.serverURL = homeFactory.fileserverURL;
        $scope.showLoading = false;
     
        $scope.open = function (x) {
            $scope.selectedEventId = x.id;
            $scope.selectedEventname = x.event_name;
            $scope.selectedEventlogo = x.event_logo;
            sessionStorage.setItem('event_id', $scope.selectedEventId);
            sessionStorage.setItem('selected_event_name', $scope.selectedEventname);
            sessionStorage.setItem('event_logo', $scope.selectedEventlogo);

            if (!$scope.$parent.isAuth) {
                $location.path('login');
                $anchorScroll();
                return;
            }
            else {

                $rootScope.$emit("Selectedevent", {});
                $location.path('artist');
                $anchorScroll();
            }
        }

        var on_getevents_success = function (response) {
            $scope.showLoading = false;
            // console.log(JSON.stringify(response));
            if (response.data.message) {
                var eventsData = response.data.message[0].cvr_getallevents;
                $scope.eventlist = eventsData;
                if (typeof ($scope.eventlist) != 'undefined') {
                   
                    for (var i = 0; i < $scope.eventlist.length; i++) {
                        $scope.eventlist[i].fullimageurl = $scope.serverURL + $scope.eventlist[i].event_logo;
                           
                        
                    }
                    sessionStorage.setItem('event_id', eventsData[0].id);
                    sessionStorage.setItem('selected_event_name', eventsData[0].event_name);
                    sessionStorage.setItem('event_logo', eventsData[0].event_logo);

                }
              //  sessionStorage.setItem('eventsList', $scope.eventlist);
                //$rootScope.$emit("Login", {});
            }
            else {

            }

        };

        var on_getevents_error = function (response) {
            $scope.showLoading = false;
           // console.log(JSON.stringify(response));
            $scope.message = "Failed to load events";
        };

        var ongetGetUimessagessuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {
                $scope.UImessageModel = response.data.message[0].cvr_getalluimessages[0];
                     $scope.field_message1 = $scope.UImessageModel.field_message

                           
                //for (var i = 0; i < $scope.UImessageModel.length; i++) {

                //    $scope.UImessageModel[i].field_name = $scope.UImessageModel[i].field_name;

                //}


            }

        };
        var ongetGetUimessageserror = function (response) {

            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to get UImessages";

        };

        $scope.getUImessages = function () {
            $scope.$parent.showLoading = true;

            homeFactory.GetUimessages().then(ongetGetUimessagessuccess, ongetGetUimessageserror);
        }

        $scope.load = function () {
            $scope.showLoading = true;
            homeFactory.getEvents().then(on_getevents_success, on_getevents_error);

        }
        $scope.load();
        $scope.getUImessages();
    });
});