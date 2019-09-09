var dependencies = ['main', 'artist/artistFactory'];
define(dependencies, function (app, artistFactory) {
    app.controller("artistCtrl", function ($scope,$anchorScroll, $rootScope, $stateParams, artistFactory, $location) {
        'use strict';

        //check for auth status  -  redirect if not 
        $scope.$parent.isArtist = true;
        if (!$scope.$parent.isAuth) {
            $location.path('home');
            return;
        }
        if (!sessionStorage.getItem("event_id")) {
            $location.path('home');
        }
        //#region Initilization
        //get fileserver url
        $scope.serverURL = artistFactory.fileserverURL;

        //get artist input model
        $scope.model = artistFactory.model();

        //get vote input model
        $scope.votemodel = artistFactory.votemodel();

        //Initialize variables
        $scope.selectedArtistnumberofvotes = 1;
        $scope.artistListmodel = {};
        $scope.artistList = {};
        $scope.showVotePopOverId = 0;
        $scope.showArtistPopUp = false;
        $scope.showThanksPopUp = false;
        $scope.showVoteThanksPopUp = false;
        $scope.showFailurePopUp = false;
        $scope.selectedArtist = null;

        //#endregion

        //#region Page Navigations
        //Page navigation for Artistpage
        $scope.artistdetails = function (x) {
            var replaceSpace = x.artistName;
            var result = replaceSpace.replace(" ", "-");
            $location.path('artist/' + result);
            $anchorScroll();
        }
        //Page navigation for CryptoshopPage
        $scope.cryptoshop = function () {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            $location.path('buyceekcoins');
            $anchorScroll();
        }
        //Page navigation for Rankingpage
        $scope.ranking = function () {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            $location.path('votes');
            $anchorScroll();
        }
        //#endregion

        //#region Processing popupImages
        //Initialize variable for popupImages
        $scope.popupImage = {};
        $scope.popupImage.index = 0;
        $scope.popupImage.imagearray = [];
        $scope.popupImage.fullimageurl = "";
        $scope.popupImage.showImagePrev = false;
        $scope.popupImage.showImageNext = false;
        $scope.popupImage.ImagePrev = function () {
            var i = $scope.popupImage.index - 1;
            $scope.popupImage.Process(i);
        }
        $scope.popupImage.ImageNext = function () {
            var i = $scope.popupImage.index + 1;
            $scope.popupImage.Process(i);
        }
        $scope.popupImage.initialize = function () {
            $scope.popupImage.Process(0);
        }

        $scope.popupImage.Process = function (index) {
            var ind = index;

            if (index > $scope.popupImage.fullimageurl.length - 1 || index < 0)
                ind = 0;
            $scope.popupImage.index = ind;

            if ($scope.popupImage.imagearray[ind] !== void 0) {
                $scope.popupImage.fullimageurl = $scope.popupImage.imagearray[ind].fullimageurl;
            }

            if ($scope.popupImage.index == 0)
                $scope.popupImage.showImagePrev = false;
            else
                $scope.popupImage.showImagePrev = true;

            if ($scope.popupImage.index == $scope.popupImage.imagearray.length - 1)
                $scope.popupImage.showImageNext = false;
            else
                $scope.popupImage.showImageNext = true;
        }

        //#endregion

        //#region Get All Artists
       
        var ongetallartistssuccess = function (response) {

            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));
            if (response.data.message) {


                $scope.artistListmodel = response.data.message[0];
               

                $scope.artistList = $scope.artistListmodel.cvr_getparticipantbyeventid[0].participants;
                $scope.event_description = $scope.artistListmodel.cvr_getparticipantbyeventid[0].event_description;
               
                if (typeof ($scope.artistList) != 'undefined') {
                    if ($scope.artistList == null) {
                        $scope.message1 = "No Artists available for this event"
                    } else {
                        for (var i = 0; i < $scope.artistList.length; i++) {
                            if ($scope.artistList[i].uf_default_artistimageurl == null) {
                                $scope.artistList[i].fullimageurl = 'img/user-placeholder.png';
                            } else {
                                $scope.artistList[i].fullimageurl = $scope.serverURL + $scope.artistList[i].uf_default_artistimageurl;
                                $scope.artistList[i].numberofvotes = 10;
                            }
                        }
                    }
                }
                //console.log("$scope.artistListmodel  : ", $scope.artistListmodel);
                
            }

        };

        //on GetArtist Error
        var ongetallartistserror = function (response) {
            //console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to load artists";
        };

        //Get All Artists
        $scope.loadartists = function () {
            $scope.$parent.showLoading = true;
            $scope.ceekpoints = sessionStorage.getItem('ceekPoints');
            $scope.event_name = sessionStorage.getItem('selected_event_name');
            $scope.event_description = sessionStorage.getItem('event_description');
            $scope.event_logo = sessionStorage.getItem('event_logo');
            if ($scope.event_logo) {
                $scope.eventimg = $scope.serverURL + $scope.event_logo;
            }
            $scope.model.event_id = JSON.parse(sessionStorage.getItem('event_id'));
            artistFactory.getallartists($scope.model.event_id).then(ongetallartistssuccess, ongetallartistserror);
        }

        //load artist if eventid
        if (sessionStorage.getItem("event_id")) {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            $scope.loadartists();
        }

        //#endregion

      

        //var onGetimagesSuccess = function (response) {
        //    //console.log(JSON.stringify(response));


        //    $scope.popupImage.imagearray = response.data.message[0].cvr_getallimagesbyuserid;

        //    if (typeof ($scope.popupImage.imagearray) != 'undefined') {
        //        for (var i = 0; i < $scope.popupImage.imagearray.length; i++) {
        //            $scope.popupImage.imagearray[i].fullimageurl = $scope.serverURL + $scope.popupImage.imagearray[i].imageurl;
        //        }
        //    }

        //    $scope.popupImage.initialize();
        //    // document.getElementById('id01').style.display = 'block';
        //};
        //var onGetimagesError = function (response) {

        //    //console.log(JSON.stringify(response));
        //    $scope.message2 = "Failed to load images";
        //};

        //#region Vote

      
        //var onbvotesuccess = function (response) {
        //    //console.log(JSON.stringify(response));
        //};
        //var onbvoteerror = function (response) {
        //    //console.log(JSON.stringify(response));

        //};

        var onvotesuccess = function (response) {
            //console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.closeArtistPopup();
            $scope.openVoteThanksPopup();
            $rootScope.$emit("RefreshTotalVotes", {});
            $rootScope.$emit("RefreshWalletBalance", {});
            $scope.showThanksPopUp = true;
           
            $scope.loadartists();
            //  artistFactory.bvote({ username: $scope.selectedArtist.artistname.trim(), fromuser: 'ceekuser' }).then(onbvotesuccess, onbvoteerror);

        };
        var onvoteerror = function (response) {
            $scope.$parent.showLoading = false;

            if (response.data.message == "voter ETH balance return empty") {
               
                $scope.Vote_errorMessage = "ETH balance for gas price not available (min. 8 gwei). Please transfer required ETH to your wallet for successful transaction.";
                return;
            }

            $scope.noVotes = response.data.message[0].cvr_insert_userbyvotes.message
            if ($scope.noVotes == "votes not avaliable") {
                $scope.Vote_errorMessage1 = "Your current Ceek balance is 0. Please purchase Ceek Coins to vote.";
                $scope.buymsg = true;
            } else {

                $scope.Vote_errorMessage1 = "Request failed to vote";
            }

            //console.log(JSON.stringify(response));



        };


        var ongetVotesByEventIDsuccess = function (response) {
            //console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.closeArtistPopup();
            $scope.openVoteThanksPopup();
            $scope.loadartists();
            //  artistFactory.bvote({ username: $scope.selectedArtist.artistname.trim(), fromuser: 'ceekuser' }).then(onbvotesuccess, onbvoteerror);

        };
        var ongetVotesByEventIDerror = function (response) {
            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));

        };

       

        //SUBMIT VOTE
        $scope.vote = function (form) {
            if (form.$valid) {

               
                $scope.$parent.showLoading = true;
                var voteObj = $scope.votemodel;
                voteObj.eventid = JSON.parse(sessionStorage.getItem('event_id'));
                voteObj.numberofvotes = $scope.selectedArtist.numberofvotes;
                voteObj.participantid = $scope.selectedArtist.artistid;
                voteObj.eventname = sessionStorage.getItem('event_name');
                voteObj.artistid = $scope.selectedArtist.artistid;
                voteObj.ceek_userid = $scope.$parent.ceek_userid;

                // debugger;

                artistFactory.vote(voteObj).then(onvotesuccess, onvoteerror);

            }

        }


        $scope.votepop = function (x) {
            $scope.$parent.showLoading = true;
          
            var voteObj = x;
            x.ceek_userid = $scope.$parent.ceek_userid;

            artistFactory.vote(voteObj).then(onvotesuccess, onvoteerror);

        }

        //#endregion
        
        //// Vote Hover Popup
        //$scope.voteHoverIn = function (id) {
        //    $scope.showVotePopOverId = id;
        //};

        //$scope.voteHoverOut = function (id) {
        //    $scope.showVotePopOverId = 0;
        //};

        //#region Get Artist Files
        var getartistfilesbyidSuccess = function (response) {
            $scope.$parent.showLoading = false;

           // console.log(JSON.stringify(response));
            if (response.data.message) {
                $scope.popupImage.imagearray = [];

                $scope.fileslist = response.data.message[0].cvr_getuserfilesbyartistid;
                if (typeof ($scope.fileslist) != 'undefined') {
                    for (var i = 0; i < $scope.fileslist.length; i++) {

                        //  $scope.fileslist[i].fullimageurl = $scope.serverURL + $scope.fileslist[i].url;
                        if ($scope.fileslist[i].filetype == "Image") {
                            $scope.showimage = true;
                           
                            $scope.fileslist[i].fullimageurl = $scope.serverURL+$scope.fileslist[i].url;
                            $scope.fileslist[i].imageurl = $scope.fileslist[i].filename;
                            $scope.imagefileresponse = $scope.fileslist[i];
                            $scope.popupImage.imagearray.push($scope.imagefileresponse);

                        }
                        
                        }
                    }
                }               
                if ($scope.popupImage.imagearray.length > 0) {
                    
                    $scope.popupImage.initialize();
            }


        };
        var getartistfilesbyidError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message2 = "Failed to load images";
        };

        //#endregion

        //#region Open Artist popup
        //open Artist Popup
        $scope.openArtistPopup = function (x) {
            console.log('openArtistPopup');
            $scope.Vote_errorMessage = "";
            $scope.Vote_errorMessage1 = "";
            console.log(x);
            $scope.selectedArtist = x;
            // $scope.selectedArtist.numberofvotes = 10;
            $scope.showArtistPopUp = true;
            $scope.showVoteThanksPopUp = false;
            $scope.popupImage.imagearray = [];
            artistFactory.getartistfiles(x.artistid).then(getartistfilesbyidSuccess, getartistfilesbyidError);

           //artistFactory.getallimages({ "uniqueid": x.artistUniqueKey }).then(onGetimagesSuccess, onGetimagesError);

        };

        //close artist popup
        $scope.closeArtistPopup = function () {
            $scope.showArtistPopUp = false;
            
        };

        // Vote Thanks Popup
        $scope.openVoteThanksPopup = function () {
            $scope.showVoteThanksPopUp = true;
        };
        //close Vote Thanks Popup
        $scope.closeVoteThanksPopup = function () {
            $scope.showVoteThanksPopUp = false;
            $('#myModal').hide();
            $('.modal-backdrop').remove();
        };
        //#endregion

        // Failure Popup
        //$scope.openFailurePopup = function () {
        //    $scope.showFailurePopUp = true;
        //};

        //$scope.closeFailurePopup = function () {
        //    $scope.showFailurePopUp = false;
        //};

 
    });
});