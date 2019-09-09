var dependencies = ['main', 'profile/profileFactory'];
define(dependencies, function (app, profileFactory) {
    app.controller("myvotesCtrl", function ($scope, $stateParams, profileFactory, $location) {
        'use strict';
        $scope.$parent.isArtist = true;
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        if (!sessionStorage.getItem("event_id")) {
            $location.path('home');
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
        $scope.serverURL = profileFactory.fileserverURL;
        $scope.myvotemodel = {};
        var ongetmyvotesuccess = function (response) {
            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));
            if (response.data.message) {
                var myvotemodel = response.data.message[0].cvr_getuserbyvotesbyid;

                if (myvotemodel == null) {
                    $scope.message1 = "You haven't voted to any participant yet!";
                }

                var totalVotes = 0;
                if (typeof (myvotemodel) != 'undefined') {
                    for (var i = 0; i < myvotemodel.length; i++) {
                        totalVotes = totalVotes + myvotemodel[i].numberofvotes;
                        myvotemodel.totaluservotes = totalVotes;
                    }
                    for (var i = 0; i < myvotemodel.length; i++) {
                        myvotemodel[i].artistvotesperc = parseInt(myvotemodel[i].numberofvotes * 100 / totalVotes);
                        myvotemodel[i].artistrank = i + 1;
                        
                    }
                }
                $scope.myvotemodel = myvotemodel;

                if (typeof ($scope.myvotemodel) != 'undefined') {
                    for (var i = 0; i < $scope.myvotemodel.length; i++) {
                        if ($scope.myvotemodel[i].participants != null) {
                            if ($scope.myvotemodel[i].participants[0].imageurl == null) {
                                $scope.myvotemodel[i].fullimageurl = 'img/user-placeholder.png';
                            }else
                            $scope.myvotemodel[i].fullimageurl = $scope.serverURL + $scope.myvotemodel[i].participants[0].imageurl;
                        }
                    }
                }
            }


        };
        var ongetmyvoteerror = function (response) {
            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));
            $scope.message="Failed to load response"

        };
        $scope.myvotes = function () {
            $scope.$parent.showLoading = true;
            $scope.event_name = sessionStorage.getItem('selected_event_name');
            $scope.event_logo = sessionStorage.getItem('event_logo');
            if ($scope.event_logo) {
                $scope.eventimg = $scope.serverURL + $scope.event_logo;
            }
            profileFactory.getmyvotes({ ceek_userid: $scope.$parent.ceek_userid, eventid: JSON.parse(sessionStorage.getItem('event_id')) }).then(ongetmyvotesuccess, ongetmyvoteerror);
        }
        $scope.myvotes();
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