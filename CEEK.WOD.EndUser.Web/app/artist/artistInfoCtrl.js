var dependencies = ['main', 'artist/artistFactory','ngSanitize'];
define(dependencies, function (app, artistFactory) {
    app.controller("artistInfoCtrl", function ($scope, $sce, artistFactory, $location, $anchorScroll, $rootScope, $stateParams) {
        'use strict';

       

        //get fileserver url
        $scope.serverURL = artistFactory.fileserverURL;

        $scope.votemodel = artistFactory.votemodel();
        //create favourites model
        $scope.favmodel = artistFactory.favmodel();
        $scope.artistname = typeof ($stateParams.id) == 'undefined' ? '' : $stateParams.id;
        if ($scope.artistname) {
            $scope.$parent.isdropAuth = true;
        }
        //Initialize variables 
        $scope.selectedArtist = null;
        $scope.selectedEventName = "";
        $scope.showphotosprev = false;
        $scope.showphotosnext = false;
        $scope.showaudioprev = false;
        $scope.showaudionext = false;
        $scope.showvideoprev = false;
        $scope.showvideonext = false;
        $scope.fullheaderimageurl = "";

        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            var settings_ap = {
                disable_volume: 'off'
                      , disable_scrub: 'default'
                      , design_skin: 'skin-wave'
                      , skinwave_dynamicwaves: 'on'

            };
            dzsag_init('.audiogallery', {
                'transition': 'fade'
            , 'autoplay': 'off'

            , 'settings_ap': settings_ap

            });
        });


        $scope.popupImage = {};
        $scope.popupImage.index = 0;
        $scope.popupImage.imagearray = [];
        $scope.popupImage.fullimageurl = "";
       
        //popup images
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


        //video processing
        $scope.popupvideo = {};
        $scope.popupvideo.videoarray = [];
        $scope.popupvideo.initialize = function () {
            $scope.popupvideo.Process(0);
        }

        $scope.popupvideo.Process = function (index) {
            $scope.$parent.showLoading = true;
            index = 0;
            if ($scope.popupvideo.videoarray[index] !== void 0) {
                if ($scope.popupvideo.videoarray.length > index) {
                    for (var i = 0; i < $scope.popupvideo.videoarray.length; i++) {
                        $scope.youtubelink = true;
                        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                        var match = $scope.popupvideo.videoarray[i].filename.match(regExp);
                        if ($scope.popupvideo.videoarray[i].filename.match(regExp)) {
                            var video_id = match[2];
                           // var video_id = $scope.popupvideo.videoarray[i].filename.split('v=')[1].split('&')[0];
                            $scope.popupvideo.videoarray[i].fullvideourl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);
                            $scope.popupvideo.videoarray[i].isyoutubelink = true;
                        } else {
                            
                            $scope.popupvideo.videoarray[i].fullvideourl = $sce.trustAsResourceUrl($scope.popupvideo.videoarray[i].fullvideourl);
                            $scope.popupvideo.videoarray[i].isyoutubelink = false;
                        }
                    }
                }
                if ($scope.popupvideo.videoarray.length > 3) {
                    $scope.showvideoprev = true;
                    $scope.showvideonext = true;
                }
            }
          
            $scope.$parent.showLoading = false;
          
        }
        
        //processing audio
        //#region Upload Audio
        $scope.popupaudio = {};
        $scope.popupaudio.audioarray = [];
        $scope.popupaudio.initialize = function () {
            $scope.popupaudio.Process(0);
        }

        $scope.popupaudio.Process = function (index) {
           // $scope.$parent.showLoading = true;
            index = 0;
            if ($scope.popupaudio.audioarray[index] !== void 0) {
                if ($scope.popupaudio.audioarray.length > index) {
                    for (var i = 0; i < $scope.popupaudio.audioarray.length; i++) {
                      
                            $(".audioplayer-tobe").attr("data-source", $scope.popupaudio.audioarray[i].fullaudiourl)
                            var settings_ap = {
                                disable_volume: 'off'
                            , disable_scrub: 'default'
                            , design_skin: 'skin-wave'
                            , skinwave_dynamicwaves: 'on'

                            };
                            dzsag_init('#ag1', {
                                'transition': 'fade'
                            , 'autoplay': 'off'

                            , 'settings_ap': settings_ap

                            });
                       
                    }
                }
                if ($scope.popupaudio.audioarray.length > 3) {
                    $scope.showaudioprev = true;
                    $scope.showaudionext = true;
                }
            }

        }

        //artist processing
        $scope.popupartists = {};
        $scope.popupartists.index = 0;
        $scope.popupartists.imagearray = [];
        $scope.popupartists.fullimageurl = "";
        $scope.popupartists.fullimageurl1 = "";
        $scope.popupartists.fullimageurl2 = "";
        $scope.popupartists.showMultartistsPrev = false;
        $scope.popupartists.showMultartistsNext = false;
        $scope.popupartists.MultartistsPrev = function () {
            var i = $scope.popupartists.index - 3;
            $scope.popupartists.ProcessMult(i);
        }
        $scope.popupartists.MultartistsNext = function () {
            var i = $scope.popupartists.index + 3;
            $scope.popupartists.ProcessMult(i);
        }
        $scope.popupartists.initializemultimages = function () {
            $scope.popupartists.ProcessMult(0);
        }

        $scope.popupartists.ProcessMult = function (index) {
            var ind = index;
            if (index > $scope.popupartists.fullimageurl.length - 1 || index < 0)
                ind = 0;
            $scope.popupartists.index = ind;
            if ($scope.popupartists.imagearray[ind] !== void 0) {
               
                if ($scope.popupartists.imagearray.length > index + 1) {
                    if ($scope.popupartists.imagearray.length > $scope.popupartists.index + 2) {
                        $scope.popupartists.fullimageurl = $scope.popupartists.imagearray[ind].fullimageurl;
                        $scope.popupartists.fullimageurl1 = $scope.popupartists.imagearray[ind + 1].fullimageurl;
                        $scope.popupartists.fullimageurl2 = $scope.popupartists.imagearray[ind + 2].fullimageurl;
                        $scope.popupartists.fullname = $scope.popupartists.imagearray[ind].fullname;
                        $scope.popupartists.fullname1 = $scope.popupartists.imagearray[ind+1].fullname;
                        $scope.popupartists.fullname2 = $scope.popupartists.imagearray[ind+2].fullname;
                        $scope.showartist = true;
                        $scope.showartist1 = true;
                        $scope.showartist2 = true;
                        if ($scope.popupartists.index == $scope.popupartists.imagearray.length - 3)
                            $scope.popupartists.showMultartistsNext = false;
                        else
                            $scope.popupartists.showMultartistsNext = true;
                    }
                    else if ($scope.popupartists.imagearray.length > $scope.popupartists.index + 1) {
                        $scope.popupartists.fullimageurl = $scope.popupartists.imagearray[ind].fullimageurl;
                        $scope.popupartists.fullimageurl1 = $scope.popupartists.imagearray[ind + 1].fullimageurl;
                        $scope.popupartists.fullimageurl2 = "";
                        $scope.popupartists.fullname = $scope.popupartists.imagearray[ind].fullname;
                        $scope.popupartists.fullname1 = $scope.popupartists.imagearray[ind + 1].fullname;
                        $scope.popupartists.fullname2 = "";
                        $scope.popupartists.showMultartistsNext = false;
                        $scope.showartist = true;
                        $scope.showartist1 = true;
                        $scope.showartist2 = false;
                    }
                    else if ($scope.popupartists.imagearray.length > $scope.popupartists.index) {
                        $scope.popupartists.fullimageurl = $scope.popupartists.imagearray[ind].fullimageurl;
                        $scope.popupartists.fullimageurl1 = "";
                        $scope.popupartists.fullimageurl2 = "";
                        $scope.popupartists.fullname = $scope.popupartists.imagearray[ind].fullname;
                        $scope.popupartists.fullname1 = "";
                        $scope.popupartists.fullname2 = "";
                        $scope.popupartists.showMultartistsNext = false;
                        $scope.showartist = true;
                        $scope.showartist1 = false;
                        $scope.showartist2 = false;
                    }
                }
                else {
                    $scope.popupartists.fullimageurl = $scope.popupartists.imagearray[ind].fullimageurl;
                    $scope.popupartists.fullimageurl1 = "";
                    $scope.popupartists.fullimageurl2 = "";
                    $scope.popupartists.fullname = $scope.popupartists.imagearray[ind].fullname;
                    $scope.popupartists.fullname1 = "";
                    $scope.popupartists.fullname2 = "";
                    $scope.popupartists.showMultartistsNext = false;
                    $scope.showartist = true;
                    $scope.showartist1 = false;
                    $scope.showartist2 = false;
                }

            }


            if ($scope.popupartists.index == 0)
                $scope.popupartists.showMultartistsPrev = false;
            else
                $scope.popupartists.showMultartistsPrev = true;

           

        }



        var onGetimagesSuccess = function (response) {

            $scope.popupImage.imagearray = response.data.message[0].cvr_getallimagesbyuserid;

            if (typeof ($scope.popupImage.imagearray) != 'undefined') {
                for (var i = 0; i < $scope.popupImage.imagearray.length; i++) {
                    $scope.popupImage.imagearray[i].fullimageurl = $scope.serverURL + $scope.popupImage.imagearray[i].imageurl;
                }
            }

            $scope.popupImage.initialize();

        };
        var onGetimagesError = function (response) {
            //console.log(JSON.stringify(response));
            $scope.message2 = "Failed to load images";
        };

        // Artist Popup
        $scope.openArtistPopup = function () {
            console.log('openArtistPopup');
            $scope.Vote_errorMessage = "";
            $scope.Vote_errorMessage1 = "";
          //  console.log(x);
            $scope.selectedArtist = $scope.artistmodel;
            $scope.selectedArtist.numberofvotes = 10;
            $scope.showArtistPopUp = true;
            $scope.showVoteThanksPopUp = false;
            $scope.showfavouritesPopUp = false;
            $scope.popupImage.initialize();
           // artistFactory.getallimages({ "uniqueid": $scope.artistmodel.uniqueid }).then(onGetimagesSuccess, onGetimagesError);

        };
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
        $scope.closeArtistPopup = function () {
            $scope.showArtistPopUp = false;

        };
        $scope.openVoteThanksPopup = function () {
            $scope.showVoteThanksPopUp = true;
        };

        // #region scroller for photos

        $('#right-button').click(function () {
            event.preventDefault();
            $('#content1').animate({
                scrollLeft: "+=300px"
            }, "slow");
        });

        $('#left-button').click(function () {
            event.preventDefault();
            $('#content1').animate({
                scrollLeft: "-=300px"
            }, "slow");
        });

        // #region scroller for videos

        $('#videoright-button').click(function () {
            event.preventDefault();
            $('#content').animate({
                scrollLeft: "+=300px"
            }, "slow");
        });

        $('#videoleft-button').click(function () {
            event.preventDefault();
            $('#content').animate({
                scrollLeft: "-=300px"
            }, "slow");
        });


        // #region scroller for audio

        $('#audioright-button').click(function () {
            event.preventDefault();
            $('#content2').animate({
                scrollLeft: "+=300px"
            }, "slow");
        });

        $('#audioleft-button').click(function () {
            event.preventDefault();
            $('#content2').animate({
                scrollLeft: "-=300px"
            }, "slow");
        });


        $scope.closeVoteThanksPopup = function () {
            $scope.showVoteThanksPopUp = false;
            $('#myModal').hide();
            $('.modal-backdrop').remove();
        };
        var onvotesuccess = function (response) {
            //console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.closeArtistPopup();
            $scope.openVoteThanksPopup();
            $rootScope.$emit("RefreshTotalVotes", {});
            $rootScope.$emit("RefreshWalletBalance", {});
            $scope.showThanksPopUp = true;

            //  $scope.loadartists();

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

        };



        $scope.vote = function (form) {
            if (form.$valid) {
                $scope.$parent.showLoading = true;
                var voteObj = $scope.votemodel;
                voteObj.eventid = JSON.parse(sessionStorage.getItem('event_id'));
                voteObj.numberofvotes = $scope.selectedArtist.numberofvotes;
                voteObj.participantid = $scope.selectedArtist.id;
                voteObj.eventname = sessionStorage.getItem('selected_event_name');
                voteObj.artistid = $scope.selectedArtist.id;
                voteObj.ceek_userid = $scope.$parent.ceek_userid;

                artistFactory.vote(voteObj).then(onvotesuccess, onvoteerror);

            }

        }
        var onGetMultimagesSuccess = function (response) {

            $scope.popupImage.imagearray = response.data.message[0].cvr_getallimagesbyuserid;

            if (typeof ($scope.popupImage.imagearray) != 'undefined') {
                for (var i = 0; i < $scope.popupImage.imagearray.length; i++) {
                    $scope.popupImage.imagearray[i].fullimageurl = $scope.serverURL + $scope.popupImage.imagearray[i].imageurl;
                }
            }

            //$scope.popupImage.initializemultimages();

        };
        $scope.close = function () {
            $scope.showfavouritesPopUp = false;
            $('#myModal').hide();
            $('.modal-backdrop').remove();
           
        }

        $scope.otherartist = function (artist) {
			var replaceSpace = artist;
            var result = replaceSpace.replace(" ", "-");
            $location.path('artist/' + result);
            $anchorScroll();
            //$location.path('artist/' + artist);
        }
        var ongetartisterror = function (response) {
            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));

        };
        var ongetartistsuccess = function (response) {

            $scope.$parent.showLoading = false;
            //console.log(JSON.stringify(response));
            if (response.data.message) {
                $scope.artistmodel = response.data.message[0].cvr_getparticipantbyname;
                $scope.selectedEventName = sessionStorage.getItem('selected_event_name');
                $scope.artistmodel.bio = $sce.trustAsHtml($scope.artistmodel.bio);
                if ($scope.artistmodel.isuserfavorite == false) {
                    $scope.showfav = false;
                    $scope.showfav1 = true;
                }
                else {
                    $scope.showfav1 = false;
                    $scope.showfav = true;
                }
                $scope.fileslist = $scope.artistmodel.userfiles;
                if (typeof ($scope.fileslist) != 'undefined' && $scope.fileslist !=null) {
                    for (var i = 0; i < $scope.fileslist.length; i++) {
                        if ($scope.fileslist[i].filetype == "footerpic") {
                            $scope.fullfooterimageurl = $scope.serverURL + $scope.fileslist[i].url;
                        }
                        else if ($scope.fileslist[i].filetype == "headerpic") {
                            $scope.fullheaderimageurl = $scope.serverURL + $scope.fileslist[i].url;
                        }
                        else if ($scope.fileslist[i].filetype == "Image") {
                            $scope.hphotos = true;
                            $scope.fileslist[i].fullimageurl = $scope.serverURL+ $scope.fileslist[i].url;
                            $scope.fileslist[i].imageurl = $scope.fileslist[i].filename;
                            $scope.imagefileresponse = $scope.fileslist[i];
                            $scope.popupImage.imagearray.push($scope.imagefileresponse);

                        }
                        else if ($scope.fileslist[i].filetype == "video") {
                            $scope.hvideos = true;
                            //if ($scope.fileslist[i].url.match('youtube')) {
                            //    $scope.fileslist[i].fullvideourl = $scope.fileslist[i].url;
                            //} else {
                            //    $scope.fileslist[i].fullvideourl =  $scope.fileslist[i].url
                            //}
                            $scope.videofileresponse = $scope.fileslist[i];
                            $scope.popupvideo.videoarray.push($scope.videofileresponse);


                        }
                        else if ($scope.fileslist[i].filetype == "audio") {
                            $scope.showaudio = true;
                            $scope.haudio = true;
                            $scope.fileslist[i].fullaudiourl =  $scope.fileslist[i].url;
                            $scope.fileslist[i].filename = $scope.fileslist[i].filename;
                            $scope.audiofileresponse = $scope.fileslist[i];
                            $scope.popupaudio.audioarray.push($scope.audiofileresponse);

                        }
                    }
                }
                if ($scope.fullheaderimageurl == "") {
                   $scope.fullheaderimageurl="img/default-banner.jpg";
                }
                if ($scope.popupvideo.videoarray.length > 0) {
                    $scope.popupvideo.initialize();
                }
                else {
                    $scope.hvideos = false;
                    $scope.showvideo = false;
                    $scope.youtubelink = false;
                }
                if ($scope.popupaudio.audioarray.length > 0) {
                    $scope.popupaudio.initialize();
                }
                else {
                    $scope.showaudio = false;
                    $scope.haudio = false;
                }
                if ($scope.popupImage.imagearray.length>3) {
                    $scope.showphotosprev = true;
                    $scope.showphotosnext = true;
                }
            }
          // artistFactory.getallimages({ "uniqueid": $scope.artistmodel.uniqueid }).then(onGetMultimagesSuccess, onGetimagesError);
        };

        //get artist data based on name
        if ($scope.uniqueid != '') {
           
            $scope.$parent.showLoading = true;
            var replaceSpace = $scope.artistname;
            $scope.fullname = replaceSpace.replace("-", " ");
            artistFactory.getartistbyname($scope.fullname).then(ongetartistsuccess, ongetartisterror);
           
        }

       
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
                            $scope.artists = { fullimageurl: $scope.artistList[i].fullimageurl, fullname: $scope.artistList[i].artistName }
                            $scope.popupartists.imagearray.push($scope.artists);
                        }
                    
                    }
                   
                    $scope.popupartists.initializemultimages();
                }
               
              
            }

        };

        var ongetallartistserror = function (response) {
            //console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to load artists";
        };
        $scope.loadartists = function () {
            $scope.$parent.showLoading = true;
            $scope.ceekpoints = sessionStorage.getItem('ceekPoints');
            $scope.event_name = sessionStorage.getItem('selected_event_name');
            $scope.event_description = sessionStorage.getItem('event_description');
            $scope.event_logo = sessionStorage.getItem('event_logo');
            if ($scope.event_logo) {
                $scope.eventimg = $scope.serverURL + $scope.event_logo;
            }
            $scope.event_id = JSON.parse(sessionStorage.getItem('event_id'));
            artistFactory.getallartists($scope.event_id).then(ongetallartistssuccess, ongetallartistserror);
        }
        $scope.loadartists();
       
        var oncreatefavsuccess = function (response) {
            $scope.showfavouritesPopUp = true;
            $scope.$parent.showLoading = false;
            $scope.showfav1 = false;
            $scope.showfav = true;


            //console.log(JSON.stringify(response));
            if (response.data.message) {
                $scope.favourites = response.data.message[0].cvr_insert_userfavorite;
                if ($scope.favourites.message) {
                    $scope.favmsg = "Artist already added to Favorites ";
                }
                else {
                    $scope.favmsg = "Artist added to Favorites ";
                }
            }
        }
            var oncreatefaverror = function (response) {

                $scope.$parent.showLoading = false;
                //console.log(JSON.stringify(response));
                
            };
       
            $scope.addfavourite = function () {
                $scope.favmsg = "";
                $scope.$parent.showLoading = true;
                $scope.showArtistPopUp = false;
                $scope.showVoteThanksPopUp = false;
            $scope.favmodel.ceek_userid = sessionStorage.getItem('ceek_userid');
            $scope.favmodel.artistid = $scope.artistmodel.id;;
            artistFactory.createfav($scope.favmodel).then(oncreatefavsuccess, oncreatefaverror);
        }
        
    });
    app.directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    });

});