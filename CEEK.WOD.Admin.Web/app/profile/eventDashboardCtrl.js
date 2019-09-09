var dependencies = ['main', 'profile/profileFactory'];
define(dependencies, function (app, profileFactory) {
    app.controller("eventDashboardCtrl", function ($scope, $stateParams, profileFactory, $location) {
        'use strict';

        $scope.$parent.isArtist = true;

     
        var eventId =JSON.parse(sessionStorage.getItem('event_id'));

        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        app.filter('utcToLocal', Filter);
        function Filter($filter) {
            return function (utcDateString, format) {
                // return if input date is null or undefined
                if (!utcDateString) {
                    return;
                }

                // append 'Z' to the date string to indicate UTC time if the timezone isn't already specified
                if (utcDateString.indexOf('Z') === -1 && utcDateString.indexOf('+') === -1) {
                    utcDateString += 'Z';
                }

                // convert and format date using the built in angularjs date filter
                return $filter('date')(utcDateString, format);
            };
        }
        $scope.profile = JSON.parse(sessionStorage.getItem("profile"));
        var ongeteventssuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {
                $scope.eventmodel = response.data.message[0].cvr_event_dashboard[0];
                if (!$scope.eventmodel.TotalVotesPolled) {
                    $scope.eventmodel.TotalVotesPolled = 0;
                }
                if (!$scope.eventmodel.TotalArtistsInEvent) {
                    $scope.eventmodel.TotalArtistsInEvent = 0;
                }
                if (!$scope.eventmodel.CeekPointsSpent) {
                    $scope.eventmodel.CeekPointsSpent = 0;
                }
              }

        };
        var ongeteventsserror = function (response) {
            $scope.$parent.showLoading = false;
            $scope.message="Failed to load dashboard"
            console.log(JSON.stringify(response));

        };
        $scope.loadevents = function () {
            $scope.$parent.showLoading = true;
           
            profileFactory.eventdashboard({ "event_id": eventId }).then(ongeteventssuccess, ongeteventsserror);
        }
        $scope.loadevents();
    });
});