(function () {
    define(['main'], function ($location, $rootScope) {
        'use strict';
        return function ($state, $location, $rootScope, $anchorScroll, $scope, $http, $window, apiFactory) {

            $scope.showLoading = false;
            $scope.serverURL = apiFactory.serverURL;
            $scope.eventList = [];
            $scope.selectedEventId = null;
            $scope.selectedEvent = {};
            $scope.selectedEventName = null;
            $scope.event_description = null;
            $scope.noOfEvents = 0;
            $scope.isArtist = false;


            //    $scope.selectedEventName = sessionStorage.getItem('selected_event_name');

            $rootScope.$on("Selectedevent", function () {
                debugger;
                $scope.getallevents();
            });


            $scope.getallevents = function () {
                var eventsData = sessionStorage.getItem('eventsList');
                if (eventsData != '' && eventsData != null) {
                    $scope.eventList = JSON.parse(eventsData);
                    // $scope.noOfEvents = $scope.eventList.length;

                    var eventid = sessionStorage.getItem('event_id');
                    if (eventid != null && eventid != '') {
                        $scope.selectedEventId = eventid;
                        $scope.selectedEventName = sessionStorage.getItem('selected_event_name');
                        $scope.event_description = sessionStorage.getItem('event_description');

                        angular.forEach($scope.eventList, function (value, key) {
                            if (value.event_name == $scope.selectedEventName)
                                $scope.selectedEvent = value;
                        });
                    }
                    else {
                        $scope.selectedEventId = $scope.eventList[0].id;
                        $scope.selectedEventName = $scope.eventList[0].event_name;
                        $scope.event_description = $scope.eventList[0].event_description;
                        $scope.event_logo = $scope.eventList[0].event_logo
                        sessionStorage.setItem('event_id', $scope.selectedEventId);
                        sessionStorage.setItem('selected_event_name', $scope.selectedEventName);
                        sessionStorage.setItem('event_description', $scope.event_description);
                        sessionStorage.setItem('event_logo', $scope.event_logo);
                        $scope.selectedEvent = $scope.eventList[0];
                        // $scope.selectedUser = $scope.eventList[0];
                    }
                }
            };


            $scope.refreshWalletBalanceUI = function () {
                $scope.showLoading = true;
                var input = { "ceek_userid": $scope.ceek_userid };
                GetCEEKPoints_FromBlockchain(input);

            }



            $scope.Logout = function () {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('profile');
                sessionStorage.removeItem('ceekPoints');
                sessionStorage.removeItem('totalVotes');
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('ceek_userid');
                sessionStorage.removeItem('event_id');
                sessionStorage.removeItem('selected_event_name');
                sessionStorage.removeItem('eventsList');
                $scope.isArtist = false;
                $scope.isAuth = false;
               
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path("login");
                $anchorScroll();
            };

            $scope.menu = function () {
                jQuery("#user-menu").fadeToggle("slow");
            }

            //debugger;
            $scope.isAuth = false;
            $scope.isdropAuth = false;
            $scope.token = null;
            $scope.profile = null;
            $scope.ceekPoints = 0;
            $scope.ceekPointsOnChain = 0;
            $scope.ceekPointsOnDB = 0;
            $scope.totalVotes = 0;
            $scope.username = '';
            $scope.email = '';
            $scope.ceek_userid = '';

            if (!sessionStorage.getItem('profile')) {
                $scope.Logout();
            }
            else {
                $scope.isAuth = true;
                $scope.isdropAuth = false;
                $scope.profile = JSON.parse(sessionStorage.getItem('profile'));
                if ($scope.profile.avatar != '') {
                    $scope.avatar = $scope.profile.avatar;
                }
                else
                    $scope.avatar = "img/user-placeholder.png";

                $scope.ceekPoints = sessionStorage.getItem('ceekPoints');
                $scope.totalVotes = sessionStorage.getItem('totalVotes');
                $scope.username = sessionStorage.getItem('username');
                $scope.email = sessionStorage.getItem('email');
                $scope.ceek_userid = sessionStorage.getItem('ceek_userid');
                //if (sessionStorage.getItem('event_id') != 'null')
                //    $scope.model.id = sessionStorage.getItem('event_id');

                $scope.getallevents();
            }

            $scope.isLoginExecuting = false;
            $rootScope.$on("Login", function () {
                $scope.isAuth = true;
                $scope.isdropAuth = false;
                //debugger;

                $scope.ceekPoints = $scope.ceekPointsOnDB = sessionStorage.getItem('ceekPoints');
                $scope.ceek_userid = sessionStorage.getItem('ceek_userid');
                var input = { "ceek_userid": $scope.ceek_userid };

                GetCEEKPoints_FromBlockchain(input);

                $scope.totalVotes = sessionStorage.getItem('totalVotes');
                $scope.username = sessionStorage.getItem('username');
                $scope.email = sessionStorage.getItem('email');
                $scope.profile = JSON.parse(sessionStorage.getItem('profile'));


                if ($scope.profile.avatar != '') {
                    $scope.avatar = $scope.profile.avatar;
                }
                else
                    $scope.avatar = "img/user-placeholder.png";

                jQuery("#user-menu").hide();

                //$scope.showLoading = false;
                $scope.isLoginExecuting = true;
                $location.path('home');
                $scope.getallevents();
                if (sessionStorage.getItem('event_id')) {
                    GetVotesByEventId(JSON.parse(sessionStorage.getItem('event_id')), 1);
                }
                $scope.myFunction();
            });


            $rootScope.$on("RefreshWalletBalance", function () {
                debugger;
                var input = { "ceek_userid": $scope.ceek_userid };
                GetCEEKPoints(input);
            });

            $rootScope.$on("RefreshWalletBalanceOnChain", function () {
                debugger;
                var input = { "ceek_userid": $scope.ceek_userid };
                GetCEEKPoints_FromBlockchain(input);
            });

            $rootScope.$on("RefreshTotalVotes", function () {

                GetVotesByEventId(JSON.parse(sessionStorage.getItem('event_id')), 1);
            });

            $scope.vote = function () {
                $scope.isdropAuth = false;
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path('myvote');
                $anchorScroll();
            }
            $scope.favorite = function () {
                $scope.isdropAuth = false;
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path('myfavourites');
                $anchorScroll();
            }
            //$scope.nominate = function () {
            //    $('#myModal').hide();
            //    $('.modal-backdrop').remove();
            //    $location.path('nominate');
            //    $anchorScroll();
            //}
            $scope.signup = function () {
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path('signup');
                $anchorScroll();
            }

            //$scope.home = function () {
            //    $('#myModal').hide();
            //    $('.modal-backdrop').remove();
            //    $location.path('home');
            //    $anchorScroll();
            //}

            //$scope.artist = function () {
            //    $('#myModal').hide();
            //    $('.modal-backdrop').remove();
            //    $location.path('artist');
            //    $anchorScroll();
            //}

            $scope.home = function () {
                $scope.isdropAuth = false;
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path('home');
                $anchorScroll();
            }
            $scope.artist = function () {
                $scope.isdropAuth = false;
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path('artist');
                $anchorScroll();
            }
            $scope.nominate = function () {
                $scope.isdropAuth = false;
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path('nominate');
                $anchorScroll();
            }
            $scope.account = function () {
                $scope.isdropAuth = false;
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path('account');
                $anchorScroll();
            }
            $scope.accountHistory = function () {
                $scope.isdropAuth = false;
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path('accountHistory');
                $anchorScroll();
            }
            $scope.ranking = function () {
                $scope.isdropAuth = false;
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path('votes');
                $anchorScroll();
            }
            $scope.Profile = function () {
                $scope.isdropAuth = false;
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path('profile');
                $anchorScroll();
            }
            $scope.cryptoshop = function () {
                $scope.isdropAuth = false;
                $('#myModal').hide();
                $('.modal-backdrop').remove();
                $location.path('buyceekcoins');
                $anchorScroll();
            }
            $scope.shop = function () {
                window.open('https://shop.ceek.com/', '_blank');
                //$location.path("buyceekcoins");
                //$anchorScroll();
            }
            $scope.login = function () {

                $location.path('login');
                $anchorScroll();
            }
            $scope.buy = function () {
                $scope.isdropAuth = false;
                $location.path('buyceekcoins');
                $anchorScroll();
            }
            $scope.EventChanged = function () {

                for (var i = 0 ; i < $scope.eventList.length; i++) {

                    var eventdata = $scope.eventList[i];
                    if (eventdata.id == $scope.selectedEvent.id) {
                        console.log("eventdata : ", eventdata);
                        sessionStorage.setItem('event_id', $scope.selectedEvent.id);
                        sessionStorage.setItem('selected_event_name', eventdata.event_name);
                        sessionStorage.setItem('event_logo', eventdata.event_logo);


                    }
                }

                $window.location.reload();
                $anchorScroll();

            };

            //$scope.move_down = function() {
            //    if (jQuery('.video').css('top') < '0px') {
            //        jQuery(".video").animate({ "top": "+=16vw" }, "slow");
            //    }
            //}

            //setTimeout(function () {
            //   if ($scope.isAuth == true) {
            //       //$scope.getData();
            //       //$scope.getAlertCount();

            //       $scope.totalVotes = sessionStorage.getItem('totalVotes');

            //   }
            //}, 3000);


            //time interval
            var myVar;
            $scope.myFunction = function () {
                if ($scope.isAuth == true) {
                    myVar = setInterval($scope.alertFunc, 10000);
                }
            }


            $scope.alertFunc = function () {
                var eid = sessionStorage.getItem('event_id');
                if (typeof (eid) != 'undefined' && eid != null && eid != '') {
                    GetVotesByEventId(JSON.parse(eid), 1);
                }
            }
            if (sessionStorage.getItem("profile") != null) {
                $scope.myFunction();
            }
            if (sessionStorage.getItem("profile") != null) {
                $scope.alertFunc();
            }
            function GetVotesByEventId(eventid, userid) {
                $http.get(apiFactory.baseURL() + 'vote/getVotesByEventID/' + eventid + '/' + userid).
                      then(function (data, status, headers, config) {
                          $scope.totalVotes = data.data.message[0].cvr_getvotesbyeventid[0].vtotalvotes;
                          sessionStorage.setItem('totalVotes', $scope.totalVotes);
                      },
                      function (error) {
                          $scope.showLoading = false;
                          console.log("GetVotesByEventId Error", error);

                      });
            }

            function GetCEEKPoints_FromBlockchain(input) {
                return apiFactory.httpPost(apiFactory.baseURL() + "vote/votercryptobalance", input)
                          .then(function (response) {
                              // console.log(response);
                              //debugger;
                              $scope.showLoading = false;
                              $scope.ceekPointsOnChain = response.data.message.token_balance_indecimals.toFixed(2);
                              if ($scope.ceekPointsOnChain > $scope.ceekPointsOnDB) {
                                  $scope.ceekPoints = $scope.ceekPointsOnChain;
                                  sessionStorage.setItem('ceekPoints', $scope.ceekPoints);


                                  //Call api to update db balance
                                  apiFactory.httpPost(apiFactory.baseURL() + "SP/sync_walletwithblockchain",
                                                                            {
                                                                                "ceek_userid": $scope.ceek_userid,
                                                                                "ceek_tokens": $scope.ceekPoints,
                                                                                "currencytype": "ceek",
                                                                                "paymenttype": "blockchainsync",
                                                                                "transstatus": "success",
                                                                                "status": "success"
                                                                            })
                                                 .then(function (response) {
                                                     console.log(response);
                                                     $scope.ceekPointsOnDB = $scope.ceekPointsOnChain;
                                                 },
                                                  function (error) {

                                                      console.error("sync_walletwithblockchain Error", error);

                                                  });
                              }


                          });

            };


            function GetCEEKPoints(input) {
                return apiFactory.httpPost(apiFactory.baseURL() + "vote/getCEEKpointsByuser", input)
                          .then(function (response) {
                              //debugger;
                              $scope.ceekPoints = response.data.message[0].cvr_getuserceekspointsbyuserid[0].ceek_points.toFixed(2);
                              sessionStorage.setItem('ceekPoints', $scope.ceekPoints);

                          });
            };

            getUImessages();

            function getUImessages() {
                return apiFactory.httpGet(apiFactory.baseURL() + "UiMessages/GetAllMessages")
                          .then(function (response) {
                              //debugger;
                              $scope.$parent.showLoading = false;
                              console.log(JSON.stringify(response));
                              if (response.data.message) {
                                  $scope.UImessageModel = response.data.message[0].cvr_getalluimessages[1];
                                  $scope.field_message2 = $scope.UImessageModel.field_message


                              }


                          });
            };

        }
    });
}());