var dependencies = ['main', 'artist/artistFactory'];
define(dependencies, function (app, artistFactory) {
    app.controller("artistCtrl", function ($scope, $stateParams, artistFactory, $location,$anchorScroll) {
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

        //get eventid from session
        $scope.model.eventid = JSON.parse(sessionStorage.getItem('event_id'));

        //Initialize variables
        $scope.showError = false;

        //#endregion


        // #region Edit 
        $scope.Edit = function (model) {

            //valueService.set(model.artistUniqueKey);

            $location.path('artistInfo/' + model.artistUniqueKey);
            $anchorScroll();
        };

        //#endregion


        // #region Get All Artists 
        $scope.artistListmodel = {};
        $scope.artistList = {};
        var ongetallartistssuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {

                $scope.artistListmodel = response.data.message[0];
               
                $scope.artistList = $scope.artistListmodel.cvr_getparticipantbyeventid[0].participants;
                if ($scope.artistList == null) {
                    $scope.message1 = "You don't have artists for this event !";
                }
                if (typeof ($scope.artistList) != 'undefined') {
                    for (var i = 0; i < $scope.artistList.length; i++) {
                        if ($scope.artistList[i].uf_default_artistimageurl == null) {
                            $scope.artistList[i].fullimageurl = 'img/user-placeholder.png';
                        } else {
                            $scope.artistList[i].fullimageurl = $scope.serverURL + $scope.artistList[i].uf_default_artistimageurl;
                        }
                    }
                }
                //console.log("$scope.artistListmodel  : ", $scope.artistListmodel);
            }

        };

        var ongetallartistserror = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.showError = true;
            $scope.message = "Failed to load artists";
        };


        $scope.loadartists = function () {
            
            $scope.$parent.showLoading = true;
            $scope.event_name = sessionStorage.getItem('selected_event_name');
            $scope.showError = false;
            artistFactory.getallartists($scope.model.eventid).then(ongetallartistssuccess, ongetallartistserror);
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