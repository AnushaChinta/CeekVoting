var dependencies = ['main', 'profile/profileFactory'];
define(dependencies, function (app, profileFactory) {
    app.controller("myFavouriteCtrl", function ($scope, $stateParams, profileFactory, $location) {
        'use strict';

        $scope.serverURL = profileFactory.fileserverURL;
        //get vote input model
        $scope.votemodel = profileFactory.votemodel();

        $scope.selectedArtist = null;

       
        var ongetallfavsucess = function (response) {
            $scope.$parent.showLoading = false;
            $scope.favourites = response.data.message[0].cvr_getuserfavoritesbyceekuserid;
            console.log("result : ", $scope.favourites);

            if ($scope.favourites == null) {
                $scope.message1 = "You don't have favourites anymore !";
                $scope.enableNextPage = false;
                $scope.enablePrevPage = true;
            }
            if (typeof ($scope.favourites) != 'undefined') {
                for (var i = 0; i < $scope.favourites.length; i++) {
                    if ($scope.favourites[i].uf_default_artistimageurl == null) {
                        $scope.favourites[i].fullimageurl = 'img/user-placeholder.png';
                    } else {
                        $scope.favourites[i].fullimageurl = $scope.serverURL + $scope.favourites[i].uf_default_artistimageurl;
                    }
                }
            }
         }

        var ongetallfaverror = function (response) {
            //console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to load artists";
        };

        $scope.getfavourites = function () {
            $scope.$parent.showLoading = true;
            if(sessionStorage.getItem('event_id')){
                $scope.event_id=JSON.parse(sessionStorage.getItem('event_id'));
                }
            profileFactory.getmyfav({ "ceek_userid": $scope.$parent.ceek_userid, "event_id": $scope.event_id }).then(ongetallfavsucess, ongetallfaverror);
        }

        $scope.getfavourites();

        $scope.cryptoshop = function () {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            $location.path('buyceekcoins');
            $anchorScroll();
        }
        $scope.ranking = function () {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            $location.path('votes');
            $anchorScroll();
        }

        // Vote Thanks Popup
        $scope.openVoteThanksPopup = function () {
            $scope.showVoteThanksPopUp = true;
        };

        $scope.closeArtistPopup = function () {
            $scope.showArtistPopUp = false;
           
        };
        //vote
        var onvotesuccess = function (response) {
            
            $scope.$parent.showLoading = false;
            $scope.closeArtistPopup();
            $scope.openVoteThanksPopup();
            $rootScope.$emit("RefreshTotalVotes", {});
            $rootScope.$emit("RefreshWalletBalance", {});
            $scope.showThanksPopUp = true;

           // $scope.loadartists();
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
      
        $scope.vote = function (form) {
            if (form.$valid) {


                $scope.$parent.showLoading = true;
                var voteObj = $scope.votemodel;
                voteObj.eventid = JSON.parse(sessionStorage.getItem('event_id'));
                voteObj.numberofvotes = $scope.selectedArtist.numberofvotes;
                voteObj.participantid = $scope.selectedArtist.artistid;
                voteObj.eventname = sessionStorage.getItem('selected_event_name');
                voteObj.artistid = $scope.selectedArtist.artistid;
                voteObj.ceek_userid = $scope.$parent.ceek_userid;

                // debugger;

                profileFactory.vote(voteObj).then(onvotesuccess, onvoteerror);

            }

        }
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


        var getartistfilesbyidSuccess = function (response) {
            $scope.$parent.showLoading = false;

            console.log(JSON.stringify(response));
            if (response.data.message) {
                $scope.popupImage.imagearray = [];

                $scope.fileslist = response.data.message[0].cvr_getuserfilesbyartistid;
                if (typeof ($scope.fileslist) != 'undefined') {
                    for (var i = 0; i < $scope.fileslist.length; i++) {

                        //  $scope.fileslist[i].fullimageurl = $scope.serverURL + $scope.fileslist[i].url;
                        if ($scope.fileslist[i].filetype == "Image") {
                            $scope.showimage = true;
                            $scope.fileslist[i].fullimageurl = $scope.serverURL + $scope.fileslist[i].url;
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
        $scope.openArtistPopup = function (x) {
            console.log('openArtistPopup');
            $scope.Vote_errorMessage = "";
            $scope.Vote_errorMessage1 = "";
            console.log(x);
            $scope.selectedArtist = x;
            $scope.selectedArtist.numberofvotes = 10;
            $scope.showArtistPopUp = true;
            $scope.showVoteThanksPopUp = false;
            $scope.popupImage.imagearray = [];
            profileFactory.getartistfiles(x.artistid).then(getartistfilesbyidSuccess, getartistfilesbyidError);

           
        };
    });
});