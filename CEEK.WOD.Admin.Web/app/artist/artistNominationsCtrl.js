var dependencies = ['main', 'artist/artistFactory'];
define(dependencies, function (app, artistFactory) {
    app.controller("artistNominationsCtrl", function ($scope, $stateParams, artistFactory,$anchorScroll, $location) {
        'use strict';
        //check for auth status  -  redirect if not 
        $scope.$parent.isArtist = true;
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        //#region Initilization

        //get fileserver url
        $scope.serverURL = artistFactory.fileserverURL;

        //get page model 
        $scope.model = artistFactory.model();
        $scope.model.eventid = JSON.parse(sessionStorage.getItem('event_id'));
        
        //defining page size manually
        $scope.pagesize = 10;

        //passing the paging options to ui-grid  
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

        $scope.showError = false;

        //Initialize artist list model
        $scope.artistListmodel = {};
        $scope.artistList = {};

        //#endregion

        // #region Edit 
        $scope.Edit = function (model) {

            //valueService.set(model.artistUniqueid);

            $location.path('nomination/' + model.artistUniqueid);
            $anchorScroll();
           
        };

        //#endregion

        // #region Get All Nominations
        var ongetallnominationssuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {

                $scope.artistList = response.data.message[0].cvr_getallusernominations;

                
                if ($scope.artistList == null) {
                    $scope.message1 = "You don't have artists anymore !";
                    $scope.enableNextPage = false;
                    $scope.enablePrevPage = false;
                }
                if (typeof ($scope.artistList) != 'undefined') {
                    for (var i = 0; i < $scope.artistList.length; i++) {
                        if ($scope.artistList[i].artistImageUrl == "") {
                            $scope.artistList[i].fullimageurl = 'img/user-placeholder.png';
                        } else {
                            $scope.artistList[i].fullimageurl = $scope.serverURL + $scope.artistList[i].artistImageUrl;
                        }
                    }
                }
                //console.log("$scope.artistListmodel  : ", $scope.artistListmodel);

                $scope.totalPages = 1;
                $scope.enableNextPage = true;
                $scope.enablePrevPage = $scope.pageno > 1;

                if ($scope.artistList.length != $scope.pagesize) {
                    $scope.enableNextPage = false;

                }
            }

        };

        var ongetallnominationserror = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.showError = true;
            $scope.message = "Failed to load artists";
        };


        $scope.loadartists = function () {

            $scope.$parent.showLoading = true;

            $scope.show = true;
            $scope.btn = true;
            $scope.enableNextPage = false;
            $scope.enablePrevPage = false;


          //  $scope.event_name = sessionStorage.getItem('selected_event_name');
            $scope.showError = false;
            artistFactory.getallnominations({
                "pageno": "1",
                "pagesize": "10",
                "status": "nomination",
                "event_id": $scope.model.eventid

            }).then(ongetallnominationssuccess, ongetallnominationserror);
        }
        //#endregion

        // #region Get Nominations by PageNumber
        $scope.submit1 = function () {
            $scope.artistList = {};
            $scope.paginate_model = {};
            $scope.message = "";
            $scope.show = true;
            $scope.btn = true;

            $scope.$parent.showLoading = true;
            //$scope.showError = false;
            $scope.paginate_model.pageno = $scope.pageno;
            $scope.paginate_model.pagesize = $scope.pagesize;
            $scope.paginate_model.status = "nomination";
            $scope.paginate_model.event_id = $scope.model.eventid;
           
            artistFactory.getallnominations($scope.paginate_model).then(ongetallnominationssuccess, ongetallnominationserror);
        }
        //#endregion

        //get user profile
        if (sessionStorage.getItem("profile") != null) {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            $scope.loadartists();
        }

   

    });


});