var dependencies = ['main', 'profile/profileFactory'];
define(dependencies, function (app, profileFactory) {
    app.controller("accountHistoryCtrl", function ($scope, $stateParams, $rootScope, $anchorScroll, profileFactory, $location, apiFactory) {
        'use strict';

        var web3 = new Web3();
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        if (!sessionStorage.getItem("event_id")) {
            $location.path('home');
        }
        $scope.model = profileFactory.model();
        $scope.serverURL = profileFactory.fileserverURL;
        $scope.$parent.isArtist = true;
        $scope.ceekContractAddress = '0xb056c38f6b7dc4064367403e26424cd2c60655e1';
        $scope.wallet_addres = sessionStorage.getItem('wallet_address');
        $scope.wallet_address = $scope.wallet_addres.toLowerCase();

        // defining page size manually
        $scope.pagesize = 10;
        $scope.ethpagesize = 10;
        $scope.ercpagesize = 10;
        //  passing the paging options to ui-grid
        //   $scope.totalPages = 5;
        $scope.pageNo = 1;
        $scope.ethpageNo = 1;
        $scope.ercpageNo = 1;
        $scope.searchText = '';
        $scope.state = true;
        $scope.enableNextPage = $scope.totalPages - $scope.currentPage > 0;
        $scope.enablePrevPage = $scope.currentPage > 1;

        $scope.ethenableNextPage = $scope.ethtotalPages - $scope.ethcurrentPage > 0;
        $scope.ethenablePrevPage = $scope.ethcurrentPage > 1;

        $scope.ercenableNextPage = $scope.erctotalPages - $scope.erccurrentPage > 0;
        $scope.ercenablePrevPage = $scope.erccurrentPage > 1;
        //Go for next page in ui-grid
        $scope.nextPage = function () {
            $scope.pageNo++;
            $scope.enableNextPage = $scope.totalPages - $scope.pageNo > 0;
            $scope.enablePrevPage = $scope.pageNo > 1;
            $scope.getPaymentTransactionbyUser();
            // $scope.ClearFilter();
            $anchorScroll();
        };

        $scope.ethnextPage = function () {
            $scope.ethpageNo++;
            $scope.ethenableNextPage = $scope.ethtotalPages - $scope.ethpageNo > 0;
            $scope.ethenablePrevPage = $scope.ethpageNo > 1;
            ethTransactions();
            // $scope.ClearFilter();
            $anchorScroll();
        };

        $scope.ercnextPage = function () {
            $scope.ercpageNo++;
            $scope.ercenableNextPage = $scope.erctotalPages - $scope.ercpageNo > 0;
            $scope.ercenablePrevPage = $scope.ercpageNo > 1;
            ERC20Transactions();
            // $scope.ClearFilter();
            $anchorScroll();
        };

        //Go for Previous page in ui-grid
        $scope.prevPage = function () {
            $scope.pageNo--;
            $scope.enableNextPage = $scope.totalPages - $scope.pageNo > 0;
            $scope.enablePrevPage = $scope.pageNo > 1;

            $scope.getPaymentTransactionbyUser();
            // $scope.ClearFilter();
            $anchorScroll();
        };

        $scope.ethprevPage = function () {
            $scope.ethpageNo--;
            $scope.ethenableNextPage = $scope.ethtotalPages - $scope.ethpageNo > 0;
            $scope.ethenablePrevPage = $scope.ethpageNo > 1;
            ethTransactions();
            $anchorScroll();
        };

        $scope.ercprevPage = function () {
            $scope.ercpageNo--;
            $scope.ercenableNextPage = $scope.erctotalPages - $scope.ercpageNo > 0;
            $scope.ercenablePrevPage = $scope.ercpageNo > 1;
            ERC20Transactions();
            $anchorScroll();
        };




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

        var ongetalltransctionsuccess = function (response) {
            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));
            if (response.data.message) {

                var lst = response.data.message[0].cvr_getpaymenttransactionsbyuserid;

                if (lst == null) {
                    $scope.message1 = "You haven't made any transactions yet!";
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
                        $scope.transactionmodel = lst;
                    }

                    $scope.totalPages = 1;
                    $scope.enableNextPage = true;
                    $scope.enablePrevPage = $scope.pageNo > 1;

                    if (lst.length != $scope.pagesize) {
                        $scope.enableNextPage = false;

                    }

                }
            }
        };
        var ongetalltransctionerror = function (response) {
            $scope.message2 = "Failed to load Transcations"
            //console.log(JSON.stringify(response));

        };



        $scope.show = true;
        $scope.btn = true;


        $scope.getPaymentTransactionbyUser = function () {
            $scope.$parent.showLoading = true;

            $scope.show = true;
            $scope.btn = true;

            // $scope.profile = sessionStorage.getItem("profile");
            //"ceek_userid" = $scope.$parent.ceek_userid;
            //  "pageno" = "1"
            profileFactory.getPaymentTransactions({
                "ceek_userid": $scope.$parent.ceek_userid,
                eventid: JSON.parse(sessionStorage.getItem('event_id')),
                pagesize: $scope.pagesize,
                pageno: $scope.pageNo
            }).then(ongetalltransctionsuccess, ongetalltransctionerror);
        }


        function ethTransactions() {
            $scope.$parent.showLoading = true;

            $scope.show = true;
            $scope.btn = true;

            profileFactory.getETHTransactions($scope.wallet_address, $scope.ethpageNo, $scope.ethpagesize).then(ongetETHTransactions_success, ongetETHTransactions_error);

        };

        function ongetETHTransactions_success(response) {
            console.log("eth" + response);
            //debugger;
            $scope.$parent.showLoading = false;

            $scope.ETHtransactionmodel = response.data.result;

            var ethmodel = $scope.ETHtransactionmodel;

            if (ethmodel.length == 0) {
                $scope.ethmessage1 = "No Transactions found!";
            }

            if (typeof (ethmodel) != 'undefined') {

                for (var i = 0; i < ethmodel.length; i++) {

                    var hash = ethmodel[i].hash;
                    var from = ethmodel[i].from;
                    var to = ethmodel[i].to;


                    $scope.ETHtransactionmodel[i].hash1 = hash.substring(0, 15) + ".......";
                    $scope.ETHtransactionmodel[i].from1 = from.substring(0, 15) + ".......";
                    $scope.ETHtransactionmodel[i].to1 = to.substring(0, 15) + ".......";

                    var Value = ethmodel[i].value;
                    ethmodel[i].value = web3.utils.fromWei(Value, 'ether');
                    console.log(ethmodel[i].value); // "0.021"

                }
            }
            $scope.ETHtransactionmodel.wallet = sessionStorage.getItem('wallet_address');
            $scope.w_address = $scope.ETHtransactionmodel.wallet.toLowerCase();
            $scope.wallet_addres = sessionStorage.getItem('wallet_address');
            $scope.wallet_address = $scope.wallet_addres.toLowerCase();


            $scope.ethtotalPages = 1;
            $scope.ethenableNextPage = true;
            $scope.ethenablePrevPage = $scope.ethpageNo > 1;

            if (ethmodel.length != $scope.ethpagesize) {
                $scope.ethenableNextPage = false;

            }
        }

        function ongetETHTransactions_error(error) {
            console.error("Failed to load ETH Transactions", error);
            $scope.ethmessage2 = "Failed to load ETH Transactions";
        }

        function ERC20Transactions() {
            $scope.$parent.showLoading = true;

            $scope.show = true;
            $scope.btn = true;

            profileFactory.getERC20Transactions($scope.wallet_address, $scope.ercpageNo, $scope.ercpagesize).then(ongetERC20Transactions_success, ongetERC20Transactions_error);

        };

        function ongetERC20Transactions_success(response) {
            console.log("erc20" + response);
            //debugger;
            $scope.$parent.showLoading = false;
            $scope.ERCtransactionmodel = response.data.result;

            var erc20model = $scope.ERCtransactionmodel;

            if (erc20model.length == 0) {
                $scope.ercmessage1 = "No Transactions found!";
            }

            if (typeof (erc20model) != 'undefined') {


                for (var i = 0; i < erc20model.length; i++) {


                    var hash = erc20model[i].hash;
                    var from = erc20model[i].from;
                    var to = erc20model[i].to;


                    $scope.ERCtransactionmodel[i].hash1 = hash.substring(0, 15) + ".......";
                    $scope.ERCtransactionmodel[i].from1 = from.substring(0, 15) + ".......";
                    $scope.ERCtransactionmodel[i].to1 = to.substring(0, 15) + ".......";

                    
                    var Value = erc20model[i].value;
                    erc20model[i].value = web3.utils.fromWei(Value, 'ether');
                    console.log(erc20model[i].value); // "0.021"
                  

                }

            }


            $scope.erctotalPages = 1;
            $scope.ercenableNextPage = true;
            $scope.ercenablePrevPage = $scope.ercpageNo > 1;

            if (erc20model.length != $scope.ercpagesize) {
                $scope.ercenableNextPage = false;

            }
        }

        function ongetERC20Transactions_error(error) {
            console.error("Failed to load ERC20 Transactions", error);
            $scope.ercmessage2 = "Failed to load ERC20 Transactions";
        }


        if (sessionStorage.getItem("profile") != null) {
            ethTransactions();
            ERC20Transactions();
            $scope.getPaymentTransactionbyUser();
        }

        $scope.hash = function (x) {
            window.open(apiFactory.etherscanURL + 'tx/' + x.hash, '_blank');
        }
        $scope.hash1 = function (x) {
            window.open(apiFactory.etherscanURL + 'tx/' + x.transactionhash, '_blank');
        }
        $scope.from = function (x) {
            window.open(apiFactory.etherscanURL + 'address/' + x.from, '_blank');
        }
        $scope.to = function (x) {
            window.open(apiFactory.etherscanURL + 'address/' + x.to, '_blank');
        }
        $scope.openPrivateBlockchainTX = function (x) {
            window.open(apiFactory.privateBlockchainURL + 'tx/' + x.transactionhash, '_blank');
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