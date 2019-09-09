var dependencies = ['main', 'votes/votesFactory'];
define(dependencies, function (app, votesFactory) {
    app.controller("votesCtrl", function ($scope, $anchorScroll, $rootScope, $stateParams, votesFactory, $location) {
        'use strict';
        $scope.$parent.isArtist = true;
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        if (!sessionStorage.getItem("event_id")) {
            $location.path('home');
        }

        $scope.model = votesFactory.mockData();
        $scope.votemodel = votesFactory.votemodel();
        $scope.showError = false;
        //UI functions
        $scope.showVotePopOverId = 0;

        $scope.voteHoverIn = function (id) {
            console.log('hoverin');
            $scope.showVotePopOverId = id;
        };

        $scope.voteHoverOut = function (id) {
            console.log('hoverout');
            $scope.showVotePopOverId = 0;
        };


        //Images in popup
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



        $scope.serverURL = votesFactory.fileserverURL;

        $scope.model = votesFactory.model();

        $scope.artistListmodel = {};
        $scope.artistList = {};
        var ongetallartistssuccess = function (response) {
            $scope.$parent.showLoading = false;
            $scope.showError = false;
            //console.log(JSON.stringify(response));
            if (response.data.message) {


                $scope.artistListmodel = response.data.message[0];
                var artistList = $scope.artistListmodel.cvr_getparticipantbyeventid[0].participants;
                var totalVotes = 0;
                if (typeof (artistList) != 'undefined') {
                    if (artistList == null) {
                        $scope.message1 = "No Artists available for this event"
                    } else {
                        for (var i = 0; i < artistList.length; i++) {
                            totalVotes = totalVotes + artistList[i].artistvotes;

                        }
                        for (var i = 0; i < artistList.length; i++) {
                            artistList[i].artistvotesperc = parseInt(artistList[i].artistvotes * 100 / totalVotes);
                            artistList[i].artistrank = i + 1;
                            artistList[i].numberofvotes = 10;
                        }
                    }
                }
                $scope.artistList = artistList;
                $scope.artistList.title="RANK"
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
            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));
            $scope.showError = true;
            $scope.message = "Failed to load artists";
        };


        var onGetimagesSuccess = function (response) {
            //console.log(JSON.stringify(response));


            $scope.popupImage.imagearray = response.data.message[0].cvr_getallimagesbyuserid;

            if (typeof ($scope.popupImage.imagearray) != 'undefined') {
                for (var i = 0; i < $scope.popupImage.imagearray.length; i++) {
                    $scope.popupImage.imagearray[i].fullimageurl = $scope.serverURL + $scope.popupImage.imagearray[i].imageurl;
                }
            }

            $scope.popupImage.initialize();
           // document.getElementById('id01').style.display = 'block';
        };
        var onGetimagesError = function (response) {
            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));
            $scope.message2 = "Failed to load images";
        };
        $scope.cryptoshop = function () {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            $location.path('buyceekcoins');
            $anchorScroll();
        }
        //Get All Artists
        $scope.loadartists = function () {
            $scope.ceekpoints = sessionStorage.getItem('ceekPoints');
            $scope.event_name = sessionStorage.getItem('selected_event_name');
            $scope.event_logo = sessionStorage.getItem('event_logo');
            if ($scope.event_logo) {
                $scope.eventimg = $scope.serverURL + $scope.event_logo;
            }
            $scope.$parent.showLoading = true;
            $scope.model.event_id = JSON.parse(sessionStorage.getItem('event_id'));
            votesFactory.getallartists($scope.model.event_id).then(ongetallartistssuccess, ongetallartistserror);
        }

        if (sessionStorage.getItem("event_id")) {
            $scope.loadartists();
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


        var onvotesuccess = function (response) {
            //console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.closeArtistPopup();
            $scope.openVoteThanksPopup();
            $rootScope.$emit("RefreshTotalVotes", {});
            $rootScope.$emit("RefreshWalletBalance", {});
            $scope.loadartists();
            //  artistFactory.bvote({ username: $scope.selectedArtist.artistname.trim(), fromuser: 'ceekuser' }).then(onbvotesuccess, onbvoteerror);

        };
        var onvoteerror = function (response) {
            $scope.$parent.showLoading = false;

            if (response.data.message == "voter ETH balance return empty") {
                $scope.Vote_errorMessage = "ETH balance for gas price not available (min. 8 gwei). Please transfer required ETH to your wallet for successful transaction.";;
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




        $scope.selectedArtist = null;

        $scope.vote = function (form) {
            if (form.$valid) {
                $scope.$parent.showLoading = true;
                var voteObj = $scope.votemodel;
                voteObj.eventid = JSON.parse(sessionStorage.getItem('event_id'));
                voteObj.numberofvotes = $scope.selectedArtist.numberofvotes;
                voteObj.participantid = $scope.selectedArtist.artistid;

                voteObj.artistid = $scope.selectedArtist.artistid;
                voteObj.ceek_userid = $scope.$parent.ceek_userid;

                // debugger;

                votesFactory.vote(voteObj).then(onvotesuccess, onvoteerror);

            }

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

        // Artist Popup
        $scope.openArtistPopup = function (x) {
            console.log('openArtistPopup');
            console.log(x);
            $scope.Vote_errorMessage = "";
            $scope.Vote_errorMessage1 = "";
            $scope.selectedArtist = x;
            // $scope.selectedArtist.numberofvotes = 10;
            $scope.showArtistPopUp = true;
            $scope.showVoteThanksPopUp = false;
            votesFactory.getartistfiles(x.artistid).then(getartistfilesbyidSuccess, getartistfilesbyidError);

            //votesFactory.getallimages({ "uniqueid": x.artistUniqueKey }).then(onGetimagesSuccess, onGetimagesError);

        };

        $scope.closeArtistPopup = function () {
            $scope.showArtistPopUp = false;
            //$('#myModal').hide();
            //$('.modal-backdrop').remove();
        };

        // Vote Thanks Popup
        $scope.openVoteThanksPopup = function () {
            $scope.showVoteThanksPopUp = true;
        };

        $scope.closeVoteThanksPopup = function () {
            $scope.showVoteThanksPopUp = false;
            $('#myModal').hide();
            $('.modal-backdrop').remove();
        };

    });
});