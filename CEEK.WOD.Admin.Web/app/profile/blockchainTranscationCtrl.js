var dependencies = ['main', 'profile/profileFactory'];
define(dependencies, function (app, profileFactory) {
    app.controller("blockchainTranscationCtrl", function ($scope, $stateParams, profileFactory, $location, $filter, $window, apiFactory) {
        'use strict';

        $scope.showimg = false;


        // defining page size manually
        $scope.pagesize = 10;
        //  passing the paging options to ui-grid
        //   $scope.totalPages = 5;
        $scope.pageno = 1;
        $scope.searchText = '';
        $scope.state = true;
        $scope.enableNextPage = $scope.totalPages - $scope.currentPage > 0;
        $scope.enablePrevPage = $scope.currentPage > 1;

        //Go for next page in ui-grid
        $scope.nextPage = function () {
            $scope.pageno++;
            $scope.enableNextPage = $scope.totalPages - $scope.pageno > 0;
            $scope.enablePrevPage = $scope.pageno > 1;
            $scope.submit1();
            // $scope.ClearFilter();
        };

        //Go for Previous page in ui-grid
        $scope.prevPage = function () {
            $scope.pageno--;
            $scope.enableNextPage = $scope.totalPages - $scope.pageno > 0;
            $scope.enablePrevPage = $scope.pageno > 1;
            $scope.submit1();
            // $scope.ClearFilter();
        };


        var ongetblockchainsuccess = function (response) {
            $scope.$parent.showLoading = false;
            // console.log(JSON.stringify(response));
            if (response.data.message) {

                $scope.blockchainmodel = response.data.message[0];

                $scope.blockchainListmodel = $scope.blockchainmodel.cvr_getallblockchaintxn;
                if ($scope.blockchainListmodel == null) {
                    $scope.enableNextPage = false;
                    $scope.enablePrevPage = false;
                    $scope.message = "You don't have transactions ! ";
                } else {
                    for (var i = 0; i < $scope.blockchainListmodel.length; i++) {
                        if ($scope.blockchainListmodel[i].status == 'fail') {
                            $scope.showimg = true;
                        }
                    }
                    $scope.totalPages = 1;
                    $scope.enableNextPage = true;
                    $scope.enablePrevPage = $scope.pageno > 1;

                    if ($scope.blockchainListmodel.length != $scope.pagesize) {
                        $scope.enableNextPage = false;

                    }
                }
                //console.log("$scope.artistListmodel  : ", $scope.artistListmodel);
            }

        };

        var ongetblockchainerrorerror = function (response) {
            // console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.showError = true;
        };
        $scope.showVoteThanksPopUp = false;
        $scope.errormsg = function (x) {
            $scope.showVoteThanksPopUp = true;
            $scope.error = x.error;
        }
        $scope.showVoteThanksPopUp1 = false;
        $scope.back = function () {
            $scope.showVoteThanksPopUp1 = false;
            $scope.showVoteThanksPopUp = false;

        }

        $scope.close = function () {
            $scope.showVoteThanksPopUp1 = false;
            $scope.showVoteThanksPopUp = false;

        }
        $scope.from_address = function (x) {
            window.open(apiFactory.etherscanURL + 'address/' + x.from_address, '_blank');
        }
        $scope.to_address = function (x) {
            window.open(apiFactory.etherscanURL + 'address/' + x.to_address, '_blank');
        }
        $scope.hash = function (x) {
            window.open(apiFactory.etherscanURL + 'tx/' + x.transactionhash, '_blank');
        }
        $scope.statuslist = [
         { "id": 1, "name": 'true', "value": 'True' },
          { "id": 2, "name": 'fail', "value": 'Fail' },
         { "id": 3, "name": 'completed', "value": 'Completed' }

        ]
        $scope.transcationlist = [
                { "id": 1, "name": 'buyceeks', "value": 'Buyceeks' },
                { "id": 2, "name": 'votecast', "value": 'Votecast' },
                { "id": 3, "name": 'transfor_ethers_for_gas_price', "value": 'Transfer Ethers for Gasprice' },
                { "id": 4, "name": 'votecast_batchprocess', "value": 'Votecast Batchprocess' }
        ]

        $scope.show = true;
        $scope.btn = true;
        $scope.selectedstatus = $scope.statuslist[0];
        $scope.selectedtranstype = $scope.transcationlist[0];
        $scope.submit = function (form) {
            $scope.showimg = false;
            $scope.enableNextPage = false;
            $scope.enablePrevPage = false;
            $scope.pageno = 1;
            $scope.show = true;
            $scope.btn = true;
            $scope.blockchainListmodel = {};
            $scope.model = {
                "pageno": "1",
                "pagesize": "10",
            }
            $scope.message = "";
            if (form.$valid) {
                $scope.$parent.showLoading = true;
                $scope.showError = false;
                // $scope.model.pageno = $scope.pageNo;
                //$scope.model.pagesize = $scope.pagesize;
                $scope.model.status = $scope.selectedstatus.name;
                $scope.model.trantype = $scope.selectedtranstype.name;
                $scope.model.from_address = $scope.address;
                profileFactory.GetBlockchaintranscation($scope.model).then(ongetblockchainsuccess, ongetblockchainerrorerror);
            }
            else {
                $scope.$parent.showLoading = false;
                $scope.showVoteThanksPopUp1 = true;

            }
        }
        $scope.submit1 = function () {
            $scope.blockchainListmodel = {};
            $scope.message = "";
            $scope.show = true;
            $scope.btn = true;

            $scope.$parent.showLoading = true;
            $scope.showError = false;
            $scope.model.pageno = $scope.pageno;
            $scope.model.pagesize = $scope.pagesize;
            $scope.model.status = $scope.selectedstatus.name;
            $scope.model.trantype = $scope.selectedtranstype.name;
            $scope.model.from_address = $scope.address;
            profileFactory.GetBlockchaintranscation($scope.model).then(ongetblockchainsuccess, ongetblockchainerrorerror);

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