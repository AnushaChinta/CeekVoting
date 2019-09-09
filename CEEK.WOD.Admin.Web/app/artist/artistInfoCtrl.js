var dependencies = ['main', 'artist/artistFactory', 'multi-select'];
define(dependencies, function (app, artistFactory) {
    app.controller("artistInfoCtrl", function ($sce, $scope, $stateParams, artistFactory, $location, $http, valueService) {
        'use strict';

        $scope.$parent.isArtist = true;

        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        tinyMCE.remove();
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

        $scope.artistUniqueid = "";
        $scope.Name = "Add Artist";
        $scope.url = window.location.href;
        if ($scope.url.match('nomination')) {
            $scope.Name = "Edit Nominations";
            $scope.shownomination = true;
        }
        $scope.profile = JSON.parse(sessionStorage.getItem("profile"));
        debugger;
        $scope.serverURL = artistFactory.fileserverURL;
        $scope.uniqueid = typeof ($stateParams.id) == 'undefined' ? '' : $stateParams.id;
        // $scope.artistUniqueid = model.artistUniqueid;
        $scope.model = artistFactory.model();
        //  $scope.model.eventid = JSON.parse(sessionStorage.getItem('event_id'));
        $scope.uploadModel = artistFactory.uploadModel();
        $scope.userfilesmodel = artistFactory.userfilesmodel();
        $scope.uploadModel.createdby = $scope.profile.id;
        $scope.input = {
            "uniqueid": $scope.uniqueid,
            "id": 0,
        };

        //configure tiny textarea editor
        tinyMCE.init({
            //mode : "textareas",
            mode: "specific_textareas",
            editor_selector: "tinymceTextEditor",
            //theme: "simple"
            menubar: false,
            statusbar: false,
            toolbar: false
        });
        //service call
        //if ($scope.uniqueid != '') {
        //    $scope.artistUniqueid = valueService.get();
        //}

        //$scope.approve_input = {
        //    "uniqueid": $scope.artistUniqueid,

        //};
        $scope.notemsg = false;
        $scope.isEdit = false;
        $scope.message = "";
        $scope.createmessage = "";
        $scope.btn = true;
        $scope.popupImage = {};
        $scope.popupImage.index = 0;
        $scope.popupImage.imagearray = [];
        $scope.popupImage.fullimageurl = "";
        $scope.popupImage.fullimageurl1 = "";
        $scope.popupImage.fullimageurl2 = "";
        $scope.popupImage.imageurl = "";
        $scope.popupImage.showImagePrev = false;
        $scope.popupImage.showImageNext = false;
        $scope.showremove = false;
        $scope.showremove1 = false;
        $scope.showremove2 = false;


        $scope.showphotosprev = false;
        $scope.showphotosnext = false;
        $scope.showaudioprev = false;
        $scope.showaudionext = false;
        $scope.showvideoprev = false;
        $scope.showvideonext = false;

        //video processing
        $scope.popupvideo = {};
        $scope.popupvideo.index = 0;
        $scope.popupvideo.videoarray = [];
        $scope.popupvideo.fullvideourl = "";
        $scope.popupvideo.fullvideourl1 = "";
        $scope.popupvideo.fullvideourl2 = "";


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
            $('#content3').animate({
                scrollLeft: "+=300px"
            }, "slow");
        });

        $('#videoleft-button').click(function () {
            event.preventDefault();
            $('#content3').animate({
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
                        $scope.showvideo = true;
                        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                        var match = $scope.popupvideo.videoarray[i].filename.match(regExp);
                        if ($scope.popupvideo.videoarray[i].filename.match(regExp)) {
                            var video_id = match[2];
                           // var video_id = $scope.popupvideo.videoarray[i].filename.split('v=')[1].split('&')[0];
                            $scope.popupvideo.videoarray[i].fullvideourl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);
                            $scope.popupvideo.videoarray[i].isyoutubelink = true;
                        } else {
                            // $scope.showvideo = true;

                            //$scope.youtubelink = false;
                            $scope.popupvideo.videoarray[i].fullvideourl = $scope.popupvideo.videoarray[i].fullvideourl;
                            $scope.popupvideo.videoarray[i].isyoutubelink = false;
                        }
                    }

                    if ($scope.popupvideo.videoarray.length > 2) {
                        $scope.showvideoprev = true;
                        $scope.showvideonext = true;
                    }
                    else {
                        $scope.showvideoprev = false;
                        $scope.showvideonext = false;
                    }
                }
            }
            else {
                $scope.youtubelink = false;

            }
            $scope.$parent.showLoading = false;
            $scope.youtube = "";
        }
        var onyoutubeuploadsucess = function (response) {
            $scope.youtube = "";
            console.log(JSON.stringify(response));
            artistFactory.getartistfiles($scope.model.id).then(getartistfilesbyidSuccess, getartistfilesbyidError);

            $scope.$parent.showLoading = false;
        };

        var onyoutubeuploaderror = function (response) {
            console.log(JSON.stringify(response));
            $scope.message = "Failed to upload youtubelink"
            $scope.$parent.showLoading = false;
        };

        $scope.youtubeupload = function () {
            $scope.showmsg = "";
            var url = $scope.youtube;
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if ($scope.uniqueid) {
               
                if (match && match[2].length == 11) {
                    $scope.profile = sessionStorage.getItem("profile");
                    var obj = JSON.parse($scope.profile);
                    artistFactory.userfiles({
                        "userid": obj.id,
                        "artistid": $scope.model.id,
                        "url": $scope.youtube,
                        "filetype": "video",
                        "filename": $scope.youtube,
                        "createdby": "1",
                        "isdefault": "true"
                    }).then(onyoutubeuploadsucess, onyoutubeuploaderror);
                }
                else {
                    $scope.showmsg = "Please Enter Valid Youtube url"
                    $scope.youtube = '';
                }
            }
            else if (url != undefined || url != '') {
             
                if (match && match[2].length == 11) {
                    $scope.$parent.showLoading = true;
                    $scope.showmsg = "";
                    $scope.url = $scope.youtube;
                    $scope.video = { id: $scope.url, filename: $scope.url, fullvideourl: $scope.url };
                    $scope.popupvideo.videoarray.push($scope.video);
                    $scope.popupvideo.initialize();
                    $scope.showvideo1 = true;

                }
                else {
                    $scope.showmsg = "Please Enter Valid Youtube url"
                    $scope.youtube = '';
                }
            }



        }

        //processing audio
        //#region Upload Audio
        $scope.popupaudio = {};
        $scope.popupaudio.audioarray = [];
        $scope.popupaudio.initialize = function () {
            $scope.popupaudio.Process(0);
        }

        $scope.popupaudio.Process = function (index) {
            $scope.$parent.showLoading = true;
            index = 0;
            if ($scope.popupaudio.audioarray[index] !== void 0) {
                if ($scope.popupaudio.audioarray.length > index) {
                    for (var i = 0; i < $scope.popupaudio.audioarray.length; i++) {
                        $scope.showaudio = true;

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
            }
            $scope.$parent.showLoading = false;
        }


        var onUploadSuccess = function (response) {
            console.log(JSON.stringify(response));
           // artistFactory.getallimages($scope.input).then(onGetimagesSuccess, onGetimagesError);
            artistFactory.getartistfiles($scope.model.id).then(getartistfilesbyidSuccess, getartistfilesbyidError);


        };

        var onUploadError = function (response) {
            console.log(JSON.stringify(response));
            $scope.message = "Failed to upload image"
            $scope.$parent.showLoading = false;
        };


        var onGetimagesSuccess = function (response) {
            console.log(JSON.stringify(response));


            $scope.popupImage.imagearray = response.data.message[0].cvr_getallimagesbyuserid;

            if (typeof ($scope.popupImage.imagearray) != 'undefined' && $scope.popupImage.imagearray != null) {
                for (var i = 0; i < $scope.popupImage.imagearray.length; i++) {
                    $scope.popupImage.imagearray[i].fullimageurl = $scope.serverURL + $scope.popupImage.imagearray[i].imageurl;
                }
            }

            //$scope.popupImage.initialize();
            $scope.$parent.showLoading = false;


        };




        var onGetimagesError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            // $scope.message = "Failed to load images";
        };
        var onyoutubelinksucess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;

        };
        var onyoutubelinkerror = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
        };

        var onInsertSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.artistid = response.data.message[0].cvr_insert_user.id;
            $scope.createheaderfiles();
            $scope.createfooterfiles();
            $scope.createvideofiles();
            $scope.createaudiofiles();
            $scope.createimagefiles();
            //if ($scope.youtube) {
            //    $scope.url = $scope.youtube;
            //    $scope.profile = sessionStorage.getItem("profile");
            //    var obj = JSON.parse($scope.profile);
            //    artistFactory.userfiles({
            //        "userid": obj.id,
            //        "artistid": $scope.artistid,
            //        "url": $scope.url,
            //        "filetype": "video",
            //        "filename": "",
            //        // "ismainvedio": "",
            //        "createdby": "1",
            //        "isdefault": "true"
            //    }).then(onyoutubelinksucess, onyoutubelinkerror);

            //}
            $scope.$parent.showLoading = false;
            $location.path('artist');

        };

        var onInsertError = function (response) {
            console.log(JSON.stringify(response));
            $scope.showError = true;
            $scope.$parent.showLoading = false;
            $scope.createmessage = "Failed to create artist"
        };


        var onupdateSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $location.path('artist');

        };

        var onupdateError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to update artist";
        };

        $scope.closepopup = function () {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
        }
        $scope.mevent_id = [];
        $scope.save = function (form) {
           
            var a = tinyMCE.get('desc').getContent();
            if (a === "" || a === null) {
                $("#questionValid").html("<b>Bio required</b>");

            }
            else {
              //  a = a.replace(/^\<p\>/, "").replace(/\<\/p\>$/, "");
                $scope.model.bio = a;
            }
            if (form.$valid && $scope.model.bio) {
                $scope.$parent.showLoading = true;
                console.log("model", $scope.model);
                console.log("event", $scope.event);
                for (var i = 0; i < $scope.event.length; i++) {
                    if ($scope.event[i].id) {
                        $scope.mevent_id.push($scope.event[i].id);
                    }
                    else {
                        $scope.mevent_id.push($scope.event[i].event_id);
                    }
                }

                var myVar = $scope.mevent_id.join(',');
                $scope.model.mevent_id = myVar;
                $scope.model.isnominated = "false";
                $scope.model.nominatedby = "";
                $scope.model.user_type = "participant";
                $scope.model.password = "1234";
                $scope.profile = sessionStorage.getItem("profile");
                var obj = JSON.parse($scope.profile);
                $scope.id = obj.id;
                $scope.model.userid = $scope.id;

                if ($scope.uniqueid != '') {
                    artistFactory.update($scope.model).then(onupdateSuccess, onupdateError);


                }
                else {
                    artistFactory.insert($scope.model).then(onInsertSuccess, onInsertError);
                }
            }
        }

        $scope.cancel = function () {
            if ($scope.url.match('nomination')) {
                $location.path('nomination');
            } else
                $location.path('artist');
        }
        var onremovevideoSuccess = function (response) {
            console.log(JSON.stringify(response));
            $('#vidModal').hide();
            $('.modal-backdrop').remove();
            $scope.$parent.showLoading = false;
            $scope.popupvideo.videoarray = [];
            artistFactory.getartistfiles($scope.model.id).then(getartistfilesbyidSuccess, getartistfilesbyidError);

        }
        var onremovevideoError = function (response) {
            $('#vidModal').hide();
            $('.modal-backdrop').remove();
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
        }
        $scope.removevideo = function (popupvideo) {
            $scope.$parent.showLoading = true;
            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);
            if ($scope.uniqueid) {
                artistFactory.removefiles({
                    "userid": obj.id,
                    "id": popupvideo,
                    "status": "false"
                }).then(onremovevideoSuccess, onremovevideoError)
            }
            else {
                for (var i = 0; i < $scope.popupvideo.videoarray.length; i++) {
                    if ($scope.popupvideo.videoarray[i].filename === popupvideo) {
                        $scope.popupvideo.videoarray.splice(i, 1);
                    }
                }
                $scope.$parent.showLoading = false;
                $('#vidModal').hide();
                $('.modal-backdrop').remove();
                $scope.popupvideo.initialize();
            }
        }
        var onremoveaudioSuccess = function (response) {
            console.log(JSON.stringify(response));
            $('#audModal').hide();
            $('.modal-backdrop').remove();
            $scope.$parent.showLoading = false;
            $scope.popupaudio.audioarray = [];
            artistFactory.getartistfiles($scope.model.id).then(getartistfilesbyidSuccess, getartistfilesbyidError);

        }
        var onremoveaudioError = function (response) {
            console.log(JSON.stringify(response));
            $('#audModal').hide();
            $('.modal-backdrop').remove();
            $scope.$parent.showLoading = false;
        }
        $scope.removeaudio = function (popupaudio) {
            $scope.$parent.showLoading = true;
            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);
            if ($scope.uniqueid) {
                artistFactory.removefiles({
                    "userid": obj.id,
                    "id": popupaudio,
                    "status": "false"
                }).then(onremoveaudioSuccess, onremoveaudioError)
            } else {
                for (var i = 0; i < $scope.popupaudio.audioarray.length; i++) {
                    if ($scope.popupaudio.audioarray[i].filename === popupaudio) {
                        $scope.popupaudio.audioarray.splice(i, 1);
                    }
                }
                if ($scope.popupaudio.audioarray.length > 2) {
                    $scope.showaudioprev = true;
                    $scope.showaudionext = true;
                }
                else {
                    $scope.showaudioprev = false;
                    $scope.showaudionext = false;
                }
                $('#audModal').hide();
                $('.modal-backdrop').remove();
                $scope.$parent.showLoading = false;
                //$scope.popupaudio.initialize();
            }
        }


        $('#Modal1').on('show.bs.modal', function (e) {
            var bookId = $(e.relatedTarget).data('book-id');
            $scope.modalimageurl = bookId;
        });


        $('#vidModal').on('show.bs.modal', function (e) {
            var videoId = $(e.relatedTarget).data('video-id');
            $scope.modalvideourl = videoId;
        });

        $('#audModal').on('show.bs.modal', function (e) {
            var audioId = $(e.relatedTarget).data('audio-id');
            $scope.modalaudiourl = audioId;
        });

        var getartistbyidError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to get Artist details";
        };

        $scope.youtubelink = false;

        var getartistfilesbyidSuccess = function (response) {
            $scope.$parent.showLoading = false;

            console.log(JSON.stringify(response));
            if (response.data.message) {
                $scope.popupvideo.videoarray = [];
                $scope.popupImage.imagearray = [];
                $scope.popupaudio.audioarray = [];
                $scope.fileslist = response.data.message[0].cvr_getuserfilesbyartistid;
                if (typeof ($scope.fileslist) != 'undefined') {
                    for (var i = 0; i < $scope.fileslist.length; i++) {

                        //  $scope.fileslist[i].fullimageurl = $scope.serverURL + $scope.fileslist[i].url;
                        if ($scope.fileslist[i].filetype == "footerpic") {
                            $scope.fullfooterimageurl = $scope.serverURL + $scope.fileslist[i].url;
                            $scope.footerfileresponse = $scope.fileslist[i];
                            $scope.footerpicpath = $scope.footerfileresponse.filename;
                        }
                        else if ($scope.fileslist[i].filetype == "headerpic") {
                            $scope.fullheaderimageurl = $scope.serverURL + $scope.fileslist[i].url;
                            $scope.headerfileresponse = $scope.fileslist[i];
                            $scope.headerpicpath = $scope.headerfileresponse.filename;
                        }
                        else if ($scope.fileslist[i].filetype == "Image") {
                            $scope.showimage = true;
                            $scope.fileslist[i].fullimageurl =$scope.serverURL+ $scope.fileslist[i].url;
                            $scope.fileslist[i].imageurl = $scope.fileslist[i].filename;
                            $scope.model.imageurl = $scope.fileslist[i].filename;
                            $scope.imagefileresponse = $scope.fileslist[i];
                            $scope.popupImage.imagearray.push($scope.imagefileresponse);

                        }
                        else if ($scope.fileslist[i].filetype == "video") {
                            $scope.showvideo1 = true;

                            if ($scope.fileslist[i].url.match('youtube')) {
                                $scope.fileslist[i].fullvideourl = $scope.fileslist[i].url;
                            } else {
                                $scope.fileslist[i].fullvideourl = $scope.fileslist[i].url
                            }
                            $scope.videofileresponse = $scope.fileslist[i];
                            // $scope.popupvideo.videoarray = [{ videoname: $scope.fileslist[i].filename, fullvideourl: $scope.fileslist[i].fullimageurl }];
                            $scope.popupvideo.videoarray.push($scope.videofileresponse);


                        }
                        else if ($scope.fileslist[i].filetype == "audio") {
                            $scope.showaudio = true;

                            $scope.fileslist[i].fullaudiourl = $scope.fileslist[i].url;
                          //  $scope.fileslist[i].filename = $scope.fileslist[i].filename;
                            $scope.audiofileresponse = $scope.fileslist[i];
                            $scope.popupaudio.audioarray.push($scope.audiofileresponse);

                            //jQuery(document).ready(function ($) {
                            //    $(".audioplayer-tobe").attr("data-source", $scope.audiolist)
                            //    var settings_ap = {
                            //        disable_volume: 'off'
                            //    , disable_scrub: 'default'
                            //    , design_skin: 'skin-wave'
                            //    , skinwave_dynamicwaves: 'on'

                            //    };
                            //    dzsag_init('#ag1', {
                            //        'transition': 'fade'
                            //    , 'autoplay': 'off'

                            //    , 'settings_ap': settings_ap

                            //    });
                            //});
                        }
                    }
                }
                if ($scope.popupvideo.videoarray.length > 0) {
                    $scope.showvideo1 = true;
                    $scope.popupvideo.initialize();

                }
                else {
                    $scope.showvideo = false;
                    $scope.youtubelink = false;
                }
                if ($scope.popupaudio.audioarray.length > 0) {
                    $scope.showaudio = true;
                    $scope.popupaudio.initialize();

                }
                else {
                    $scope.showaudio = false;

                }

                if ($scope.popupImage.imagearray.length > 2) {
                    $scope.showphotosprev = true;
                    $scope.showphotosnext = true;
                }
                else {
                    $scope.showphotosprev = false;
                    $scope.showphotosnext = false;
                    }
                if ($scope.popupaudio.audioarray.length > 2) {
                    $scope.showaudioprev = true;
                    $scope.showaudionext = true;
                }
                else {
                    $scope.showaudioprev = false;
                    $scope.showaudionext = false;
                    }
            }


        };
        $scope.eventchanged = function () {
            var $selects = $('select');
            if ($scope.event) {
                $scope.event = $scope.event.concat($scope.events);
            } else {
                $scope.event = $scope.events;
            }
            angular.forEach($scope.event, function (value, key) {

                $selects.find('option[value="' + value.event_name + '"]')
                       .prop('selected', true);
               
            });
           // $scope.event = $scope.events;
        }
        $scope.events = [];
        $scope.event1 = [];
        var getartistbyidSuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {


                $scope.artistmodel = response.data.message[0];
                $scope.events = $scope.artistmodel.cvr_getuserbyid.events;
                //for (var i = 0; i < $scope.events.length; i++) {
                //    $scope.events[i].disable = true;
                //}
                $scope.event = $scope.events;//$scope.event1.join(',');
                var $selects = $('select');
                $selects.find('option').prop('disabled', false);
         
                angular.forEach($scope.events, function (value, key) {
                    
                    $selects.find('option[value="' + value.event_name + '"]')
                            .prop('disabled', true);
                    $selects.find('option[value="' + value.event_name + '"]')
                           .prop('selected', true);
                   
                });
               

             
                $scope.model = $scope.artistmodel.cvr_getuserbyid;

                var fullimageurl = $scope.serverURL + $scope.model.imageurl;
                $scope.model.fullimageurl = fullimageurl;
                artistFactory.getartistfiles($scope.model.id).then(getartistfilesbyidSuccess, getartistfilesbyidError);

                //if ($scope.model.bio) {
                //    $('#desc').html($scope.model.bio);
                //    //var reg = "<[^>]*>";
                //    //if ($scope.model.bio.match(reg)) {
                //    //   // $('#desc').html($($scope.model.bio).text());
                //    //} else {
                //    //    $('#desc').html($scope.model.bio);
                //    //}
                //}

                //tinyMCE.get('desc').setContent($scope.model.bio);

                //configure tiny textarea editor
                tinyMCE.init({
                    //mode : "textareas",
                    mode: "specific_textareas",
                    editor_selector: "tinymceTextEditor",
                    //theme: "simple"
                    menubar: false,
                    statusbar: false,
                    toolbar: false
                });

                if ($scope.model.bio) {
                    $(tinymce.get('desc').getBody()).html($scope.model.bio);
                }
                $scope.loadevents();
            }
        };



        var getartistfilesbyidError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to get Artist details";
        };

        //Get details if Id present
        if ($scope.uniqueid != '') {
            $scope.message = "";
            $scope.isEdit = true;
            $scope.btn = false
            $scope.show = true;
            $scope.show1 = true;
            $scope.$parent.showLoading = true;
            if ($scope.url.match('nomination')) {
                $scope.Name = "Edit Nominations";
                $scope.shownomination = true;

            } else {
                $scope.Name = "Edit Artist";
            }
            tinyMCE.remove();
            artistFactory.getartist($scope.input).then(getartistbyidSuccess, getartistbyidError);

            // artistFactory.getallimages($scope.input).then(onGetimagesSuccess, onGetimagesError);

        }
        var approveSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            // $scope.message = "Nomination approved Successfully";

        };


        var approveError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to approve Nomination";
        };


        $scope.approvepopup = function () {

            $location.path('nomination');
        }

        $scope.approve = function () {
            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);
            artistFactory.approvenominations({
                "artistid": $scope.model.id,
                "status": "approved",
                "statuschangeby": obj.id
            }).then(approveSuccess, approveError);

        }

        var ongetalleventssuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {


                $scope.eventList = response.data.message[0].cvr_getallevents;
                $('#people').multiSelect();
                //    $('#people').multiSelect();
                //    $('div .multi-select-container').hover(
                //function () {
                //    var value = $(this).find('span.multi-select-button').text();
                //    $('#select_val').text(value).show();
                //}, function () {
                //    $('#select_val').hide();
                //});


            }

        };

        var ongetalleventserror = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to load Events";
        };


        $scope.loadevents = function () {
            $scope.$parent.showLoading = true;
            $scope.message = "";
            artistFactory.getallevents().then(ongetalleventssuccess, ongetalleventserror);
        }
        //pageloads
        if ($scope.uniqueid == "") {
             $scope.loadevents();
        }
    
        //Delete artist

        var ondeleteSuccess = function (response) {
            $scope.show1 = false;
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            console.log(JSON.stringify(response));
            if ($scope.url.match('nomination')) {
                $location.path('nomination');
            } else
                $location.path('artist');
        };
        var ondeleteError = function (response) {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            console.log(JSON.stringify(response));
            $scope.message = "Failed to delete Artist";
        };
        var oncreateaudiofilesSuccess = function (response) {
            //$scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
        };
        var oncreateaudiofilesError = function (response) {
            //$scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
        };
        var oncreatevideofilesSuccess = function (response) {
            //$scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
        };
        var oncreatevideofilesError = function (response) {
            //$scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
        };
        var oncreatefooterfilesSuccess = function (response) {
            //$scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));

        };
        var oncreatefooterfilesError = function (response) {
            //$scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
        };
        var oncreateheaderfilesSuccess = function (response) {
            //$scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));

        };
        var oncreateheaderfilesError = function (response) {
            //$scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
        };
        var oncreateimagefilesSuccess = function (response) {
            //$scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));

        };
        var oncreateimagefilesError = function (response) {
            //$scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
        };
        $scope.createheaderfiles = function () {

            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);

            $scope.userfilesmodel.userid = obj.id;

            $scope.userfilesmodel.artistid = $scope.artistid;
            if ($scope.headerpicpath) {
                $scope.userfilesmodel.url = $scope.headerpicpath;
                $scope.userfilesmodel.filename = $scope.headerpicname;
                $scope.userfilesmodel.filetype = "headerpic";
                artistFactory.userfiles($scope.userfilesmodel).then(oncreateheaderfilesSuccess, oncreateheaderfilesError);

            }

        }
        $scope.createfooterfiles = function () {

            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);
            $scope.footerfilesmodel = {
                "userid": obj.id,
                "artistid": $scope.artistid,
                "url": "",
                "filetype": "",
                "filename": "",
                // "ismainvedio": "",
                "createdby": "1",
               // "isdefault": "true"
            }
            if ($scope.footerpicpath) {
                $scope.footerfilesmodel.url = $scope.footerpicpath;
                $scope.footerfilesmodel.filename = $scope.footerpicname;
                $scope.footerfilesmodel.filetype = "footerpic";
                artistFactory.userfiles($scope.footerfilesmodel).then(oncreatefooterfilesSuccess, oncreatefooterfilesError);

            }
        }
        $scope.createimagefiles = function () {
            if ($scope.popupImage.imagearray.length > 0) {
                for (var i = 0; i < $scope.popupImage.imagearray.length; i++) {
                    $scope.profile = sessionStorage.getItem("profile");
                    var obj = JSON.parse($scope.profile);
                    var imagefilesmodel = {
                        "userid": obj.id,
                        "artistid": $scope.artistid,
                        "url": "",
                        "filetype": "",
                        "filename": "",
                        // "ismainvedio": "",
                        "createdby": "1",
                        "isdefault": "true"
                    }

                    imagefilesmodel.url = $scope.popupImage.imagearray[i].imageurl;
                    imagefilesmodel.filename = $scope.popupImage.imagearray[i].imageurl;
                    imagefilesmodel.filetype = "Image";
                    artistFactory.userfiles(imagefilesmodel).then(oncreateimagefilesSuccess, oncreateimagefilesError);

                }
            }


        }
        $scope.createvideofiles = function () {
            if ($scope.popupvideo.videoarray.length > 0) {
                for (var i = 0; i < $scope.popupvideo.videoarray.length; i++) {

                    $scope.profile = sessionStorage.getItem("profile");
                    var obj = JSON.parse($scope.profile);
                    var videofilesmodel = {
                        "userid": obj.id,
                        "artistid": $scope.artistid,
                        "url": "",
                        "filetype": "",
                        "filename": "",
                        // "ismainvedio": "",
                        "createdby": "1",
                        "isdefault": "true"
                    }

                    videofilesmodel.url = $scope.popupvideo.videoarray[i].fullvideourl;
                    videofilesmodel.filename = $scope.popupvideo.videoarray[i].filename;
                    videofilesmodel.filetype = "video";
                    artistFactory.userfiles(videofilesmodel).then(oncreatevideofilesSuccess, oncreatevideofilesError);

                }
            }



        }
        $scope.createaudiofiles = function () {
            if ($scope.popupaudio.audioarray.length > 0) {
                for (var i = 0; i < $scope.popupaudio.audioarray.length; i++) {
                    $scope.profile = sessionStorage.getItem("profile");
                    var obj = JSON.parse($scope.profile);
                    var audiofilesmodel = {
                        "userid": obj.id,
                        "artistid": $scope.artistid,
                        "url": "",
                        "filetype": "",
                        "filename": "",
                        // "ismainvedio": "",
                        "createdby": "1",
                        "isdefault": "true"
                    }

                    audiofilesmodel.url = $scope.popupaudio.audioarray[i].fullaudiourl;
                    audiofilesmodel.filename = $scope.popupaudio.audioarray[i].filename;
                    audiofilesmodel.filetype = "audio";

                    artistFactory.userfiles(audiofilesmodel).then(oncreateaudiofilesSuccess, oncreateaudiofilesError);

                }
            }


        }


        var onremoveISuccess = function (response) {
            console.log(JSON.stringify(response));
            $('#Modal1').hide();
            $('.modal-backdrop').remove();
            // ngToast.success('Artist Created successfuly');
            //  $location.path('artist');
            $scope.popupImage.imagearray = [];
            artistFactory.getartistfiles($scope.model.id).then(getartistfilesbyidSuccess, getartistfilesbyidError);


        };

        var onremoveIError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $('#Modal1').hide();
            $('.modal-backdrop').remove();
            $scope.message = "Failed to remove image";
        };

        var ondefaultISuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            // ngToast.success('Artist Created successfuly');
            //  $location.path('artist');
           // artistFactory.getallimages($scope.input).then(onGetimagesSuccess, onGetimagesError);
            artistFactory.getartistfiles($scope.model.id).then(getartistfilesbyidSuccess, getartistfilesbyidError);

        };

        var ondefaultIError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to make default image";
        };

        $scope.defaultImage = function (images) {
            $scope.show = false;
            $scope.$parent.showLoading = true;
            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);
            $scope.id = obj.id;

            artistFactory.defaultimage({ "user_uniqueid": $scope.uniqueid, imageurl: images.imageurl }).then(ondefaultISuccess, ondefaultIError)
        }


        $scope.removeImage = function (popupImage) {
            $scope.show = false;
            $scope.$parent.showLoading = true;
            if ($scope.uniqueid) {
                $scope.profile = sessionStorage.getItem("profile");
                var obj = JSON.parse($scope.profile);
                $scope.id = obj.id;
                artistFactory.removefiles({
                    "userid": obj.id,
                    "id": popupImage,
                    "status": "false"
                }).then(onremoveISuccess, onremoveIError)
                //artistFactory.removeimage({ userid: $scope.id, imageurl: popupImage }).then(onremoveISuccess, onremoveIError)
            } else {
                for (var i = 0; i < $scope.popupImage.imagearray.length; i++) {
                    if ($scope.popupImage.imagearray[i].imageurl === popupImage) {
                        $scope.popupImage.imagearray.splice(i, 1);
                    }
                }
                if ($scope.popupImage.imagearray.length > 2) {
                    $scope.showphotosprev = true;
                    $scope.showphotosnext = true;
                }
                else {
                    $scope.showphotosprev = false;
                    $scope.showphotosnext = false;
                }
                //$scope.popupImage.initialize();
                $scope.$parent.showLoading = false;
                $('#Modal1').hide();
                $('.modal-backdrop').remove();
            }
        }

        $scope.delete = function () {

            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);
            $scope.id = obj.id;

            artistFactory.softdelete({ userid: $scope.id, id: $scope.model.id }).then(ondeleteSuccess, ondeleteError)
        }

        $scope.header = {};
        $scope.footer = {};
        $scope.showvideo = false;
        $scope.showvideo1 = false;
        var onmultivideoSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            artistFactory.getartistfiles($scope.model.id).then(getartistfilesbyidSuccess, getartistfilesbyidError);


        };
        var onmultivideoError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;

        };
        var onmultiaudioSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.filename = "";
            artistFactory.getartistfiles($scope.model.id).then(getartistfilesbyidSuccess, getartistfilesbyidError);


        };
        var onmultiaudioError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;

        };

        $scope.uploadVideoFile = function () {
            $scope.$parent.showLoading = true;
            $scope.message = "";
            var uploadUrl = $scope.serverURL + "api/v1/api/avfile";

            var fd = new FormData();

            fd.append("userFile", $scope.myFile); //$scope.package.file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined },

            })
              .then(function (response) {
                  $scope.$parent.showLoading = false;
                  //   $scope.popupvideo.fullvideourl = $sce.trustAsResourceUrl($scope.serverURL + response.data.filename.path);
                  // $scope.popupvideo.fullvideourl1 = "";
                  // $scope.popupvideo.fullvideourl2 = "";

                  $scope.videopath = $scope.serverURL + response.data.filename.path;
                  $scope.videoname = response.data.filename.originalname;
                  $scope.showvideo1 = true;
                  $scope.remvideo = false;

                  if ($scope.uniqueid) {
                      $scope.profile = sessionStorage.getItem("profile");
                      var obj = JSON.parse($scope.profile);

                      artistFactory.userfiles({
                          "userid": obj.id,
                          "artistid": $scope.model.id,
                          "url": $scope.videopath,
                          "filetype": "video",
                          "filename": $scope.videoname,
                          // "ismainvedio": "",
                          "createdby": "1",
                          "isdefault": "true"

                      }).then(onmultivideoSuccess, onmultivideoError);

                  }
                  else {
                      $scope.video = { id: response.data.filename.path, filename: response.data.filename.path, fullvideourl: $scope.serverURL + response.data.filename.path };
                      $scope.popupvideo.videoarray.push($scope.video);
                      $scope.popupvideo.initialize();
                  }
              }, function (error) {
                  $scope.$parent.showLoading = false;
                  console.log("error");
              });


        };
        $scope.showaudio = false;
        $scope.audiotitle = function () {
            $scope.notemsg = false;
        }
        $scope.uploadaudio = function () {
            $scope.$parent.showLoading = true;
            $scope.message = "";
            var uploadUrl = $scope.serverURL + "api/v1/api/avfile";

            var fd = new FormData();

            fd.append("userFile", $scope.audio); //$scope.package.file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined },

            })
              .then(function (response) {
                  $scope.$parent.showLoading = false;
                  $scope.model.fullaudiourl = $scope.serverURL + response.data.filename.path;
                  $scope.audiopath = $scope.serverURL + response.data.filename.path;
                  $scope.audioname = response.data.filename.originalname;
                  $scope.showaudio = true;
                  $scope.remvideo = false;
                  if ($scope.uniqueid) {
                      $scope.profile = sessionStorage.getItem("profile");
                      var obj = JSON.parse($scope.profile);

                      artistFactory.userfiles({
                          "userid": obj.id,
                          "artistid": $scope.model.id,
                          "url": $scope.audiopath,
                          "filetype": "audio",
                          "filename": $scope.filename,
                          // "ismainvedio": "",
                          "createdby": "1",
                          "isdefault": "true"

                      }).then(onmultiaudioSuccess, onmultiaudioError);
                  }
                  else {
                      $scope.audio = {filename:$scope.filename, id: response.data.filename.originalname, fullaudiourl: $scope.serverURL + response.data.filename.path };
                      $scope.popupaudio.audioarray.push($scope.audio);
                      if ($scope.popupaudio.audioarray.length > 2) {
                          $scope.showaudioprev = true;
                          $scope.showaudionext = true;
                      }
                      $scope.filename = "";
                      //$scope.popupaudio.initialize();
                  }
              }, function (error) {
                  $scope.$parent.showLoading = false;
                  console.log("error");
              });


        };

        $scope.fullfooterimageurl = "";
        $scope.fullheaderimageurl = "";
        var onupdateheadersuccess = function (response) {
            console.log(JSON.stringify(response));
        }
        var onupdateheadererror = function (response) {
            console.log(JSON.stringify(response));
        }
        var onupdatefootersuccess = function (response) {
            console.log(JSON.stringify(response));
        }
        var onupdatefootererror = function (response) {
            console.log(JSON.stringify(response));
        }
        $scope.uploadheaderpic = function (resizedImage) {
            $scope.$parent.showLoading = true;
            var uploadUrl = $scope.serverURL + "api/v1/api/file";

            var fd = new FormData();

            var resizedImageFile = new File([resizedImage], 'blob.jpg', { type: 'image/jpg', lastModified: Date.now() });
            fd.append("userFile", resizedImageFile); //$scope.package.file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }

            })
            .then(function (response) {
                $scope.$parent.showLoading = false;
                $scope.headerpicpath = response.data.filename.path;
                $scope.headerpicname = response.data.filename.originalname;
                $scope.fullheaderimageurl = $scope.serverURL + response.data.filename.path;
                if ($scope.uniqueid) {
                    if ($scope.headerfileresponse) {

                        artistFactory.updatepic({
                            "id": $scope.headerfileresponse.id,
                            "artistid": $scope.headerfileresponse.artistid,
                            "modifiedby": "1",
                            "isdefault": "true",
                            "url": $scope.headerpicpath,
                            "filetype": "headerpic",
                            "filename": $scope.headerpicname,
                            "userid": $scope.headerfileresponse.userid


                        }).then(onupdateheadersuccess, onupdateheadererror)
                    }
                    else {
                        $scope.profile = sessionStorage.getItem("profile");
                        var obj = JSON.parse($scope.profile);

                        $scope.userfilesmodel.userid = obj.id;

                        $scope.userfilesmodel.artistid = $scope.model.id;
                        if ($scope.headerpicpath) {
                            $scope.userfilesmodel.url = $scope.headerpicpath;
                            $scope.userfilesmodel.filename = $scope.headerpicname;
                            $scope.userfilesmodel.filetype = "headerpic";
                            artistFactory.userfiles($scope.userfilesmodel).then(oncreateheaderfilesSuccess, oncreateheaderfilesError);

                        }
                    }
                }

            }, function (error) {
                $scope.$parent.showLoading = false;
            });


        };
        $scope.uploadfooterpic = function (resizedImage) {
            $scope.$parent.showLoading = true;
            var uploadUrl = $scope.serverURL + "api/v1/api/file";

            var fd = new FormData();

            var resizedImageFile = new File([resizedImage], 'blob.jpg', { type: 'image/jpg', lastModified: Date.now() });
            fd.append("userFile", resizedImageFile); //$scope.package.file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }

            })
            .then(function (response) {
                $scope.$parent.showLoading = false;
                $scope.footerpicpath = response.data.filename.path;
                $scope.footerpicname = response.data.filename.originalname;
                $scope.fullfooterimageurl = $scope.serverURL + response.data.filename.path;
                if ($scope.uniqueid) {
                    if ($scope.footerfileresponse) {
                        artistFactory.updatepic({
                            "id": $scope.footerfileresponse.id,
                            "artistid": $scope.footerfileresponse.artistid,
                            "modifiedby": "1",
                            "isdefault": "true",
                            "url": $scope.footerpicpath,
                            "filetype": $scope.footerfileresponse.filetype,
                            "filename": $scope.footerpicname,
                            "userid": $scope.footerfileresponse.userid


                        }).then(onupdatefootersuccess, onupdatefootererror)
                    }
                    else {
                        $scope.profile = sessionStorage.getItem("profile");
                        var obj = JSON.parse($scope.profile);
                        $scope.footerfilesmodel = {
                            "userid": obj.id,
                            "artistid": $scope.model.id,
                            "url": "",
                            "filetype": "",
                            "filename": "",
                            // "ismainvedio": "",
                            "createdby": "1",
                            "isdefault": "true"
                        }
                        if ($scope.footerpicpath) {
                            $scope.footerfilesmodel.url = $scope.footerpicpath;
                            $scope.footerfilesmodel.filename = $scope.footerpicname;
                            $scope.footerfilesmodel.filetype = "footerpic";
                            artistFactory.userfiles($scope.footerfilesmodel).then(oncreatefooterfilesSuccess, oncreatefooterfilesError);

                        }
                    }
                }
            }, function (error) {
                $scope.$parent.showLoading = false;
            });


        };
        //File Upload
        $scope.package = {};
        $scope.uploadFile = function (resizedImage) {
            $scope.$parent.showLoading = true;
            $scope.message = "";
            var uploadUrl = $scope.serverURL + "api/v1/api/file";

            var fd = new FormData();

            var resizedImageFile = new File([resizedImage], 'blob.jpg', { type: 'image/jpg', lastModified: Date.now() });
            fd.append("userFile", resizedImageFile); //$scope.package.file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined },

            })
              .then(function (response) {
                  $scope.$parent.showLoading = false;
                  $scope.showimage = true;
                  $scope.model.fullimageurl = $scope.serverURL + response.data.filename.path;
                  $scope.model.imageurl = response.data.filename.path;
                  $scope.uploadModel.imageurl = response.data.filename.path;
                  if ($scope.uniqueid){
                      $scope.uploadModel.user_uniqueid = $scope.uniqueid;
                  console.log("uploadModel", $scope.uploadModel);
                  $scope.profile = sessionStorage.getItem("profile");
                  var obj = JSON.parse($scope.profile);

                      artistFactory.userfiles({
                          "userid": obj.id,
                          "artistid": $scope.model.id,
                          "url": $scope.model.imageurl,
                          "filetype": "Image",
                          "filename": $scope.model.imageurl,
                          // "ismainvedio": "",
                          "createdby": "1",
                          "isdefault": "true"

                      }).then(onUploadSuccess, onUploadError);
                    }
                     // artistFactory.createimage($scope.uploadModel).then(onUploadSuccess, onUploadError);
                  else {
                      //   $scope.removeimage = false;
                      //  $scope.popupImage.imagearray = [{ imageurl: response.data.filename.path, fullimageurl: $scope.serverURL + response.data.filename.path }];
                      $scope.image = { id: response.data.filename.path,url:response.data.filename.path, imageurl: response.data.filename.path, fullimageurl: $scope.serverURL + response.data.filename.path };
                      $scope.popupImage.imagearray.push($scope.image);
                      if ($scope.popupImage.imagearray.length > 2) {
                          $scope.showphotosprev = true;
                          $scope.showphotosnext = true;
                      }
                      //$scope.popupImage.initialize();
                  }
              }, function (error) {
                  $scope.$parent.showLoading = false;
                  console.log("error");
              });


        };


    });
    //app.filter('trust', ['$sce', function ($sce, $scope) {
    //    if (typeof (source) != 'undefined') {
    //        return function (source) {
    //                var video_id = source.split('v=')[1].split('&')[0];
    //                return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);


    //        };
    //    }
    //}]);


    app.factory("valueService", function () {


        var savedata = {}

        function set(data) {
            savedata = data;

            // artistUniqueid = model.artistUniqueid;
        }

        function get() {
            return savedata;
        }


        return {

            set: set,
            get: get
        }


    })
    app.directive('afileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.afileModel);
                var modelSetter = model.assign;
                var maxSize = 20000000;
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                        var filesize = scope.audio.size;
                        if (scope.filename) {
                            scope.notemsg = false;
                            if (filesize > maxSize) {
                                scope.message = "Max file size exceeded 20MB";

                            }
                            else {

                                scope.uploadaudio();
                            }
                        } else {
                            scope.notemsg = true;
                        }
                    });
                });
            }
        };
    }]);
    app.directive('hfileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.hfileModel);
                var modelSetter = model.assign;
                var maxSize = 5000000;
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                        var filesize = scope.header.file.size;
                        if (filesize > maxSize) {
                            scope.message = "Max file size exceeded 5MB";

                        }
                        else {

                            var file = element[0].files[0];
                            // Load the image
                            var reader = new FileReader();
                            reader.onload = function (readerEvent) {
                                var image = new Image();
                                image.onload = function (imageEvent) {
                                    debugger;
                                    // Resize the image
                                    var canvas = document.createElement('canvas'),

                                    width = 1350,
                                    height = 760;

                                    canvas.width = width;
                                    canvas.height = height;
                                    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                                    var dataUrl = canvas.toDataURL('image/jpeg');
                                    var resizedImage = dataURLToBlob(dataUrl);
                                    scope.uploadheaderpic(resizedImage);
                                }
                                image.src = readerEvent.target.result;
                            }
                            reader.readAsDataURL(file);

                        }

                    });
                });
            }
        };
    }]);
    app.directive('sfileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.sfileModel);
                var modelSetter = model.assign;
                var maxSize = 5000000;
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                        var filesize = scope.footer.size;
                        if (filesize > maxSize) {
                            scope.message = "Max file size exceeded 5MB";

                        }
                        else {
                            var file = element[0].files[0];
                            // Load the image
                            var reader = new FileReader();
                            reader.onload = function (readerEvent) {
                                var image = new Image();
                                image.onload = function (imageEvent) {
                                    debugger;
                                    // Resize the image
                                    var canvas = document.createElement('canvas'),

                                    width = 1920,
                                    height = 400;

                                    canvas.width = width;
                                    canvas.height = height;
                                    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                                    var dataUrl = canvas.toDataURL('image/jpeg');
                                    var resizedImage = dataURLToBlob(dataUrl);
                                    scope.uploadfooterpic(resizedImage);
                                }
                                image.src = readerEvent.target.result;
                            }
                            reader.readAsDataURL(file);
                        }
                    });
                });
            }
        };
    }]);
    app.directive('vfileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.vfileModel);
                var modelSetter = model.assign;
                var maxSize = 100000000;
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                        var file = scope.myFile;
                        var filesize = scope.myFile.size;
                        if (filesize > maxSize) {
                            scope.message = "Max file size exceeded 100MB";

                        }
                        else {
                            scope.uploadVideoFile();
                        }
                    });
                });
            }
        };
    }]);


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

    app.directive('fileModel', ['$parse', function ($parse) {
        return {

            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                var maxSize = 5000000;
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                        var filesize = scope.package.file.size;
                        if (filesize > maxSize) {
                            scope.message = "Max file size exceeded 5MB";

                        }
                        else {

                            var file = element[0].files[0];
                            // Load the image
                            var reader = new FileReader();
                            reader.onload = function (readerEvent) {
                                var image = new Image();
                                image.onload = function (imageEvent) {
                                    debugger;
                                    // Resize the image
                                    var canvas = document.createElement('canvas'),
                                       // max_size = 500,// TODO : pull max size from a site config
                                        width = 500,
                                        height = 500;
                                    //if (width > height) {
                                    //    if (width > max_size) {
                                    //        height *= max_size / width;
                                    //        width = max_size;
                                    //    }
                                    //} else {
                                    //    if (height > max_size) {
                                    //        width *= max_size / height;
                                    //        height = max_size;
                                    //    }
                                    //}
                                    canvas.width = width;
                                    canvas.height = height;
                                    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                                    var dataUrl = canvas.toDataURL('image/jpeg');
                                    var resizedImage = dataURLToBlob(dataUrl);
                                    scope.uploadFile(resizedImage);
                                }
                                image.src = readerEvent.target.result;
                            }
                            reader.readAsDataURL(file);




                        }
                    });

                });
            }

        };
    }]);


    /* Utility function to convert a canvas to a BLOB */
    var dataURLToBlob = function (dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = parts[1];

            return new Blob([raw], { type: contentType });
        }

        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }
    /* End Utility function to convert a canvas to a BLOB  */
});

