(function () {
    define(['main'], function ($location, $rootScope) {
        'use strict';
        return function ($state, $location, $rootScope, $scope, $http, $window, apiFactory) {

            $scope.showLoading = false;
            $scope.isArtist = false;
            $scope.eventList = [];
            $scope.selectedEventId = null;
            $scope.selectedEvent = {};
            $scope.selectedEventName = null;
            $scope.noOfEvents = 0;

            $scope.getallevents = function () {
                var eventsData = sessionStorage.getItem('eventsList');
                if (eventsData != '') {
                    $scope.eventList = JSON.parse(eventsData);
                   // $scope.noOfEvents = $scope.eventList.length;

                    var eventid = sessionStorage.getItem('event_id');
                    if (eventid != null && eventid != '') {
                        $scope.selectedEventId = eventid;
                        $scope.selectedEventName = sessionStorage.getItem('selected_event_name');

                        angular.forEach($scope.eventList, function (value, key) {
                            if (value.event_name == $scope.selectedEventName)
                                $scope.selectedEvent = value;
                        });
                    }
                    else {
                        $scope.selectedEventId = $scope.eventList[0].id;
                        $scope.selectedEventName = $scope.eventList[0].event_name;
                        sessionStorage.setItem('event_id', $scope.selectedEventId);
                        sessionStorage.setItem('selected_event_name', $scope.selectedEventName);
                        $scope.selectedEvent = $scope.eventList[0];
                        // $scope.selectedUser = $scope.eventList[0];
                    }
                }
            };

         

            $scope.Logout = function () {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('profile');
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('userid');
                sessionStorage.removeItem('event_id');
                sessionStorage.removeItem('selected_event_name');
                sessionStorage.removeItem('eventsList');
                sessionStorage.removeItem('two_faauthenable');
                sessionStorage.removeItem('user_type');
                sessionStorage.removeItem('changepswdemail');
                $scope.isAuth = false;
                $scope.isArtist = false;
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path("login");
            };

            $scope.menu = function () {
                jQuery("#user-menu").fadeToggle("slow");
            }

            $scope.isAuth = false;
            $scope.token = null;
            $scope.profile = null;
            $scope.username = '';
            $scope.email = '';
            $scope.userid = '';

            if (!sessionStorage.getItem('profile')) {
                $scope.Logout();
            }
            else {
                $scope.isAuth = true;
                $scope.isenable2fa = true;
                $scope.disable2fa = false;
                $scope.profile = JSON.parse(sessionStorage.getItem('profile'));
                $scope.username = sessionStorage.getItem('username');
                $scope.email = sessionStorage.getItem('email');
                $scope.user_type = sessionStorage.getItem('user_type');
                $scope.userid = sessionStorage.getItem('userid');
                $scope.two_faauthenable = JSON.parse(sessionStorage.getItem('two_faauthenable'));
                if ($scope.two_faauthenable == true) {
                    $scope.isenable2fa = false;
                    $scope.disable2fa = true;
                }
                else {
                    $scope.isenable2fa = true;
                    $scope.disable2fa = false;
                }
                $scope.getallevents();
            }

            $rootScope.$on("Login", function () {

                $scope.isAuth = false;
                $scope.isenable2fa = true;
                $scope.disable2fa = false;
                $scope.username = sessionStorage.getItem('username');
                $scope.email = sessionStorage.getItem('email');
                $scope.profile = sessionStorage.getItem('profile');
                $scope.userid = sessionStorage.getItem('userid');
                $scope.user_type = sessionStorage.getItem('user_type');
                $scope.two_faauthenable = JSON.parse(sessionStorage.getItem('two_faauthenable'));
                //var obj = JSON.parse($scope.profile);
                //$scope.two_faauthenable = obj.two_faauthenable;
                if ($scope.two_faauthenable == true) {
                    $scope.isenable2fa = false;
                    $scope.disable2fa = true;
                    $scope.isAuth = false;
                }
                else {
                    $scope.disable2fa = false;
                    $('#myModal').hide();
                    $('.modal-backdrop').remove();
                    $scope.isAuth = true;
                    $location.path('artist');
                }
                jQuery("#user-menu").hide();
                //$location.path('artist');
                $scope.getallevents();

            });

            $rootScope.$on("RefreshEventsdropdown", function () {
                debugger;
                GetActiveEvents();
            });
            $rootScope.$on("validate2fa", function () {
                $scope.isenable2fa = false;
                $scope.disable2fa = true;
                $scope.isAuth = true;
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path('artist');
            });
            $scope.setting = function () {
                jQuery("#user-menu").hide();
                $location.path('setting');
            }
            $scope.blockchain = function () {
                jQuery("#user-menu").hide();
                $location.path('blockchaintranscation');
            }
            $scope.enable2fa = function () {
                jQuery("#user-menu").hide();
                $location.path('qrcode');
            }

            $scope.dashboard = function () {
                jQuery("#user-menu").hide();
                $location.path('dashboard');
            }
            $scope.eventdashboard = function () {
                jQuery("#user-menu").hide();
                $location.path('eventdashboard');
            }
            $scope.Admins = function () {
                jQuery("#user-menu").hide();
                $location.path('user');
            }
            $scope.NewAdmin = function () {
                jQuery("#user-menu").hide();
                $location.path('userInfo');
            }
            $scope.Events = function () {
                jQuery("#user-menu").hide();
                $location.path('event');
            }
            $scope.NewEvent = function () {
                jQuery("#user-menu").hide();
                $location.path('eventInfo');
            }
            $scope.disable = function () {
                
                $scope.profile = sessionStorage.getItem("profile");
                var obj = JSON.parse($scope.profile);
                $scope.id = obj.id;
                $scope.emailid = obj.emailid;

                var input = {
                    'userid': $scope.id,
                    'emailid': $scope.emailid,
                    'enable_2fa': 'false'
                }
                disable2fa(input);

            }
            function disable2fa(input) {
                $scope.showLoading = true;
                $http.post(apiFactory.baseURL() + 'USER/Change2faAuthStatus', input).
                      then(function (data, status, headers, config) {
                          $scope.response = data.data.message[0].cvr_set_2fa_details;
                          sessionStorage.setItem('two_faauthenable', $scope.response.two_faauthenable);

                          $scope.isenable2fa = true;
                          $scope.disable2fa = false;
                          $scope.showLoading = false;
                      },
                      function (error) {
                          $scope.showLoading = false;
                         // $scope.change2fastatusError = "Failed to disable 2FA";

                      });
            }
            function GetActiveEvents() {
                $http.get(apiFactory.baseURL() + 'event/GetActiveEvents/0').
                      then(function (data, status, headers, config) {
                          sessionStorage.removeItem('event_id');
                          sessionStorage.removeItem('selected_event_name');
                          sessionStorage.setItem('eventsList',JSON.stringify(data.data.message[0].cvr_getallevents));
                          $scope.getallevents();
                      },
                      function (error) {

                          console.log("GetActiveEvents Error", error);

                      });
            }

            $scope.EventChanged = function () {

                for (var i = 0 ; i < $scope.eventList.length; i++) {

                    var eventdata = $scope.eventList[i];
                    if (eventdata.id == $scope.selectedEvent.id) {
                        console.log("eventdata : ", eventdata);
                        sessionStorage.setItem('event_id', $scope.selectedEvent.id);
                        sessionStorage.setItem('selected_event_name', eventdata.event_name);


                    }
                }

                $window.location.reload();

            };

            //$scope.getallevents();

        }
    });
}());