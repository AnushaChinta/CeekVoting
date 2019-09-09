var dependencies = ['main', 'profile/profileFactory'];
define(dependencies, function (app, profileFactory) {
    app.controller("transactionDashboardCtrl", function ($scope, $stateParams, profileFactory, $location, $filter, $window) {
        'use strict';

        $scope.$parent.isArtist = true;

        $scope.model = profileFactory.model();
        $scope.dashboardModel = profileFactory.dashboardModel();
        $scope.serverURL = profileFactory.fileserverURL;
        $scope.model.eventid = JSON.parse(sessionStorage.getItem('event_id'));
        $scope.profile = sessionStorage.getItem("profile");
        var obj = JSON.parse($scope.profile);
        $scope.id = obj.id;
        $scope.model.userid = $scope.id;
        $scope.Vote = true;

        //var dateToday = new Date();
        //var dates = $("#from, #to").datepicker({
        //    defaultDate: "+1w",
        //    changeMonth: true,
        //    numberOfMonths: 1,
        //    minDate: dateToday,
        //    onSelect: function (selectedDate) {
        //        var option = this.id == "from" ? "minDate" : "maxDate",
        //           instance = $(this).data("datepicker"),
        //            date = $.datepicker.parseDate($.datepicker._defaults.dateFormat, selectedDate);
        //        dates.not(this).datepicker("option", option, date);
        //    }
        //});
        $scope.dashboardModel.fromdate ='';
        $scope.dashboardModel.todate = '';
        $(function () {
            $("#txtFrom").datepicker({
                numberOfMonths: 1,
                dateFormat: 'yy-mm-dd',
                onSelect: function (selected) {
                    var dt = new Date(selected);
                    dt.setDate(dt.getDate() + 1);
                    $("#txtTo").datepicker("option", "minDate", dt);
                    $scope.dashboardModel.fromdate = selected;
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
                    $scope.dashboardModel.todate = selected;
                    //$scope.transactionmodel.todate = $filter('date')(selected, "dd-MM-yyyy");
                }
            });
        });

        //$scope.TrasactionDetails = profileFactory.mockData();

        //if (typeof ($scope.TrasactionDetails.Trasaction_details) != 'undefined') {
        //    for (var i = 0; i < $scope.TrasactionDetails.Trasaction_details.length; i++) {
        //        $scope.List = $scope.TrasactionDetails.Trasaction_details[i];

        //    }
        //}


        // defining page size manually
        $scope.pagesize = 10;
        //  passing the paging options to ui-grid
        //   $scope.totalPages = 5;
        $scope.pageNo = 1;
        $scope.searchText = '';
        $scope.state = true;
        $scope.enableNextPage = $scope.totalPages - $scope.currentPage > 0;
        $scope.enablePrevPage = $scope.currentPage > 1;

        //Go for next page in ui-grid
        $scope.nextPage = function () {
            $scope.pageNo++;
            $scope.enableNextPage = $scope.totalPages - $scope.pageNo > 0;
            $scope.enablePrevPage = $scope.pageNo > 1;
            $scope.submit();
            // $scope.ClearFilter();
        };

        //Go for Previous page in ui-grid
        $scope.prevPage = function () {
            $scope.pageNo--;
            $scope.enableNextPage = $scope.totalPages - $scope.pageNo > 0;
            $scope.enablePrevPage = $scope.pageNo > 1;
            $scope.submit();
            // $scope.ClearFilter();
        };

        $scope.showVoteThanksPopUp = false;
        $scope.showVoteThanksPopUp1 = false;


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

        var ongetDashboardsuccess = function (response) {
            $scope.$parent.showLoading = false;
         
            console.log(JSON.stringify(response));
            if (response.data.message) {

                var lst = response.data.message[0].cvr_getpaymenttransactionsforadmin;
                if (lst == null) {
                    $scope.message1 = "You don't have transactions !";
                }

                if (typeof (lst) != 'undefined') {
                    for (var i = 0; i < lst.length; i++) {

                        if (lst[i].voteartistpic != 'undefined') {
                            lst[i].voteartistpic = $scope.serverURL + lst[i].voteartistpic;
                            if (lst[i].TokenGainedOrBurned != null)
                                lst[i].TokenGainedOrBurned2 = lst[i].TokenGainedOrBurned.toFixed(2);
                            else
                                lst[i].TokenGainedOrBurned2 = null;

                        }
                        lst[i].SubsciptionPlanCost = lst[i].SubsciptionPlanCost / 100;
                       
                    }
                    $scope.transactionmodel = lst;
                    console.log("table : " + $scope.transactionmodel);
                 

                }

                $scope.totalPages = 1;
                $scope.enableNextPage = true;
                $scope.enablePrevPage = $scope.pageNo > 1;

                if (lst.length != $scope.pagesize) {
                    $scope.enableNextPage = false;
                    //sessionStorage.removeItem('selectedproj');
                }

            }

        };
        var ongetDashboarderror = function (response) {
            $scope.$parent.showLoading = false;
            if (response.status == 401) {
                console.log("Token expired ");

                $scope.profile = "";

                $scope.message2 ="Token expired";

            }

            console.log(JSON.stringify(response));

        };

        $scope.show = true;
        $scope.btn = true;
        
        $scope.showVoteThanksPopUp1 = false;
        $scope.submit1 = function (form) {
            if (form.$valid) {
                $scope.pageNo = 1;
                $scope.$parent.showLoading = true;
                $scope.show = true;
                $scope.btn = true;
                $scope.Vote = true;
                $scope.transactionmodel = {};
                $scope.message1 = "";
                if ($scope.dashboardModel.fromdate && $scope.dashboardModel.todate) {

                    $scope.dashboardModel.pagesize = $scope.pagesize;
                    $scope.dashboardModel.pageno = $scope.pageNo;
                    $scope.dashboardModel.eventid = $scope.model.eventid;
                    $scope.dashboardModel.searchtext = $scope.search;

                    if ($scope.dashboardModel.searchtext) {
                        $scope.Vote = false;
                    }

                    profileFactory.dashboard($scope.dashboardModel).then(ongetDashboardsuccess, ongetDashboarderror);
                }
                else {
                    $scope.$parent.showLoading = false;
                    $scope.showVoteThanksPopUp1 = true;
                    $scope.showVoteThanksPopUp = true;

                }
            }

        }

       
        $scope.submit = function () {
           
            $scope.$parent.showLoading = true;
            $scope.show = true;
            $scope.btn = true;
          
            if ($scope.dashboardModel.fromdate && $scope.dashboardModel.todate) {
                $scope.transactionmodel = {};
                $scope.message1 = "";
                $scope.dashboardModel.pagesize = $scope.pagesize;
                $scope.dashboardModel.pageno = $scope.pageNo;
                $scope.dashboardModel.eventid = $scope.model.eventid;
                $scope.dashboardModel.searchtext = $scope.search;
                
                profileFactory.dashboard($scope.dashboardModel).then(ongetDashboardsuccess, ongetDashboarderror);
            }
            else {
                $scope.$parent.showLoading = false;
                $scope.showVoteThanksPopUp1 = true;
                $scope.showVoteThanksPopUp = true;
               
            }
           
        }
        
        $scope.back = function () {
            $scope.showVoteThanksPopUp = false;
            $scope.showVoteThanksPopUp1 = false;
           // $window.location.reload();
        }

        $scope.close = function () {
            $scope.showVoteThanksPopUp1 = false;
            $window.location.reload();
        }

        //if (sessionStorage.getItem("profile") != null) {
        //  $scope.getDashboard();
        //}

       
       
    });
});