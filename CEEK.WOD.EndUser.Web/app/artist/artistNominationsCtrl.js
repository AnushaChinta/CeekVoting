var dependencies = ['main', 'artist/artistFactory', 'multi-select'];
define(dependencies, function (app, artistFactory) {
    app.controller("artistNominationsCtrl", function ($sce, $scope, $stateParams, $window, artistFactory, $location, $http) {
        'use strict';

        //check for auth status  -  redirect if not 
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }

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

        //#region Initilization

        //define the page model
        $scope.model = {
            artistName: "",
            artistBio: "",
            selectedEvents: null,
            bannerPic: null,
            footerPic: null,
            otherPics: [],
            videoAttachments: [],
            audioAttachments: []
        }

        //get user profile
        $scope.profile = JSON.parse(sessionStorage.getItem("profile"));

        //get fileserver url
        $scope.serverURL = artistFactory.fileserverURL;

        //get nomination creation model
        $scope.nominationmodel = artistFactory.nominationmodel();

        //get file upload model 
        $scope.uploadModel = artistFactory.uploadModel();

        //get user file creation model
        $scope.userfilesmodel = artistFactory.userfilesmodel();
        $scope.uploadModel.createdby = $scope.profile.id;

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

        //Initialize variable for status messages
        $scope.message = "";
        $scope.createmessage = "";

        $scope.mevent_id = [];
        $scope.shownominationPopUp = false;


        $scope.youtubelink = false;

        $scope.header = {};
        $scope.footer = {};
        $scope.showvideo = false;
        $scope.showvideo1 = false;
        $scope.showaudio = false;


        $scope.fullfooterimageurl = "";
        $scope.fullheaderimageurl = "";



        $scope.showphotosprev = false;
        $scope.showphotosnext = false;
        $scope.showaudioprev = false;
        $scope.showaudionext = false;
        $scope.showvideoprev = false;
        $scope.showvideonext = false;
        $scope.notemsg = false;
        //#endregion


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


        // #region Get & Set Events

        var ongetalleventssuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {

                $scope.eventList = response.data.message[0].cvr_getallevents;
                $('#people').multiSelect();
                //     $('div .multi-select-container').hover(
                // function () {
                // var value = $(this).find('span.multi-select-button').text();
                //      $('#select_val').text(value).show();
                //  $('.arrow-left').show();
                //  }, function () {
                //$('#select_val').hide();
                //   $('.arrow-left').hide();
                // });

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

        $scope.loadevents();

        // #endregion

        //#region Upload Header Pic

        var onupdateheadersuccess = function (response) {
            console.log(JSON.stringify(response));
        }

        var onupdateheadererror = function (response) {
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

            }, function (error) {
                $scope.$parent.showLoading = false;
            });


        };



        // #endregion

        //#region Upload Footer Pic

        var onupdatefootersuccess = function (response) {
            console.log(JSON.stringify(response));
        }
        var onupdatefootererror = function (response) {
            console.log(JSON.stringify(response));
        }

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
            }, function (error) {
                $scope.$parent.showLoading = false;
            });


        };



        // #endregion

        //#region Upload Pic Attachments

        var onUploadSuccess = function (response) {
            console.log(JSON.stringify(response));
        };

        var onUploadError = function (response) {
            console.log(JSON.stringify(response));
            $scope.message = "Failed to upload image"
        };

        //File Upload
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
                  $scope.fullimageurl = $scope.serverURL + response.data.filename.path;
                  $scope.nominationmodel.imageurl = response.data.filename.path;
                  $scope.uploadModel.imageurl = response.data.filename.path;
                  if ($scope.uniqueid)
                      $scope.uploadModel.user_uniqueid = $scope.uniqueid;
                  console.log("uploadModel", $scope.uploadModel);
                  if ($scope.isEdit)
                      artistFactory.createimage($scope.uploadModel).then(onUploadSuccess, onUploadError);
                  else {

                      //$scope.popupImage.imagearray = [{ imageurl: response.data.filename.path, fullimageurl: $scope.serverURL + response.data.filename.path }];
                      $scope.image = { imageurl: response.data.filename.path, fullimageurl: $scope.serverURL + response.data.filename.path };
                      $scope.model.otherPics.push($scope.image);
                      if ($scope.model.otherPics.length > 2) {
                          $scope.showphotosprev = true;
                          $scope.showphotosnext = true;
                      }
                      // $scope.popupImage.initialize();
                  }
              }, function (error) {
                  $scope.$parent.showLoading = false;
                  console.log("error");
              });


        };



        // #endregion

        //#region Delete Pic

        var onremoveISuccess = function (response) {
            console.log(JSON.stringify(response));
            // ngToast.success('Artist Created successfuly');
            //  $location.path('artist');
            artistFactory.getallimages($scope.input).then(onGetimagesSuccess, onGetimagesError);

        };

        var onremoveIError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to remove image";
        };

        $scope.removeImage = function (popupImage) {
            $scope.show = false;
            for (var i = 0; i < $scope.model.otherPics.length; i++) {
                if ($scope.model.otherPics[i].imageurl === popupImage) {
                    $scope.model.otherPics.splice(i, 1);
                }
            }
            if ($scope.model.otherPics.length > 2) {
                $scope.showphotosprev = true;
                $scope.showphotosnext = true;
            }
            else {
                $scope.showphotosprev = false;
                $scope.showphotosnext = false;
                }
            // $scope.popupImage.initialize();
            //$scope.$parent.showLoading = true;
            //$scope.profile = sessionStorage.getItem("profile");
            //var obj = JSON.parse($scope.profile);
            //$scope.id = obj.id;

            //artistFactory.removeimage({ userid: $scope.id, imageurl: popupImage }).then(onremoveISuccess, onremoveIError)
        }

        // #endregion

        //#region Upload Video
        // $scope.popupvideo.index = 0;
        $scope.popupvideo = {};
        $scope.popupvideo.initialize = function () {
            $scope.popupvideo.Process(0);
        }

        $scope.popupvideo.Process = function (index) {
            $scope.$parent.showLoading = true;
            index = 0;
            if ($scope.model.videoAttachments[index] !== void 0) {
                if ($scope.model.videoAttachments.length > index) {
                    for (var i = 0; i < $scope.model.videoAttachments.length; i++) {
                        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                        var match = $scope.model.videoAttachments[i].id.match(regExp);
                        if ($scope.model.videoAttachments[i].id.match(regExp)) {
                            
                            var video_id = match[2];
                            $scope.model.videoAttachments[i].fullvideourl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);
                            $scope.model.videoAttachments[i].isyoutubelink = true;
                        } else {
                           
                            $scope.model.videoAttachments[i].fullvideourl = $scope.model.videoAttachments[i].fullvideourl;
                            $scope.model.videoAttachments[i].isyoutubelink = false;
                        }
                    }

                    if ($scope.model.videoAttachments.length > 2) {
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
                $scope.showvideo = false;

            }
            
            $scope.$parent.showLoading = false;
            $scope.youtube = "";
        }
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
                  //$scope.popupvideo.fullvideourl = $sce.trustAsResourceUrl($scope.serverURL + response.data.filename.path);
                  //$scope.popupvideo.fullvideourl1 = "";
                  //$scope.popupvideo.fullvideourl2 = "";

                  $scope.videopath = response.data.filename.path;
                  $scope.videoname = response.data.filename.originalname;
                  $scope.showvideo1 = true;

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
                      $scope.video = { id: response.data.filename.originalname, fullvideourl: $scope.serverURL + response.data.filename.path };
                      $scope.model.videoAttachments.push($scope.video);
                      //for (var i = 0; i < $scope.model.videoAttachments.length; i++) {
                      //    if ($scope.model.videoAttachments[i].fullvideourl) {
                      //        $scope.model.videoAttachments[i].fullvideourl = $scope.model.videoAttachments[i].fullvideourl
                      //    }
                      //}
                      $scope.popupvideo.initialize();
                  }
              }, function (error) {
                  $scope.$parent.showLoading = false;
                  console.log("error");
              });


        };



        // #endregion

        //#region Upload Youtube Video
        var onyoutubeuploadsucess = function (response) {

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

            var url = $scope.youtube;
            if (url != undefined || url != '') {
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                var match = url.match(regExp);
                if (match && match[2].length == 11) {
                    $scope.$parent.showLoading = true;
                    $scope.showmsg = "";
                    $scope.url = $scope.youtube;
                    $scope.video = { id: $scope.url, fullvideourl: $scope.url };
                    $scope.model.videoAttachments.push($scope.video);
                    $scope.showvideo1 = true;
                    $scope.popupvideo.initialize();
                }
                else {
                    $scope.showmsg = "Please Enter Valid Youtube url"
                    $scope.youtube = '';
                }
            }


        }

        // #endregion

        //#region Delete Video

        var onremovevideoSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.popupvideo.videoarray = [];
            artistFactory.getartistfiles($scope.model.id).then(getartistfilesbyidSuccess, getartistfilesbyidError);

        }
        var onremovevideoError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
        }

        $scope.removevideo = function (popupvideo) {
            $scope.$parent.showLoading = true;
            for (var i = 0; i < $scope.model.videoAttachments.length; i++) {
                if ($scope.model.videoAttachments[i].id === popupvideo) {
                    $scope.model.videoAttachments.splice(i, 1);
                }
            }
            $scope.popupvideo.initialize();
            //$scope.profile = sessionStorage.getItem("profile");
            //var obj = JSON.parse($scope.profile);

            //artistFactory.removefiles({
            //    "userid": obj.id,
            //    "id": popupvideo,
            //    "status": "false"
            //}).then(onremovevideoSuccess, onremovevideoError)
        }

        // #endregion

        //#region Upload Audio
        $scope.audiotitle = function () {
            $scope.notemsg = false;
        }
        $scope.popupaudio = {};
        $scope.popupaudio.initialize = function () {
            $scope.popupaudio.Process(0);
        }

        $scope.popupaudio.Process = function (index) {
            $scope.$parent.showLoading = true;
            index = 0;
            if ($scope.model.audioAttachments[index] !== void 0) {
                if ($scope.model.audioAttachments.length > index) {
                    for (var i = 0; i < $scope.model.audioAttachments.length; i++) {

                        $(".audioplayer-tobe").attr("data-source", $scope.model.audioAttachments[i].fullaudiourl)
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

                if ($scope.model.audioAttachments.length > 2) {
                    $scope.showaudioprev = true;
                    $scope.showaudionext = true;
                }
            }

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
                  $scope.fullaudiourl = $scope.serverURL + response.data.filename.path;
                  $scope.audiopath = response.data.filename.path;
                  $scope.audioname = response.data.filename.originalname;
                 
                  $scope.showaudio = true;

                  $scope.audio = {filename:$scope.filename, id: response.data.filename.originalname, fullaudiourl: $scope.serverURL + response.data.filename.path, guid: uuidv4() };
                  $scope.model.audioAttachments.push($scope.audio);
                  $scope.filename = "";
                  if ($scope.model.audioAttachments.length > 2) {
                      $scope.showaudioprev = true;
                      $scope.showaudionext = true;
                  }
                  //var settings_ap = {
                  //    disable_volume: 'off'
                  //     , disable_scrub: 'default'
                  //     , design_skin: 'skin-wave'
                  //     , skinwave_dynamicwaves: 'on'

                  //};
                  //dzsag_init('#ag1', {
                  //    'transition': 'fade'
                  //, 'autoplay': 'off'

                  //, 'settings_ap': settings_ap

                  //});

                  //$("#" + $scope.audio.id).attr("data-source", $scope.fullaudiourl)
                  //var settings_ap = {
                  //    disable_volume: 'off'
                  //, disable_scrub: 'default'
                  //, design_skin: 'skin-wave'
                  //, skinwave_dynamicwaves: 'on'
                  //};

                  //$scope.popupaudio.initialize();

              }, function (error) {
                  $scope.$parent.showLoading = false;
                  console.log("error");
              });


        };

       

        // #endregion

        //#region Delete Audio

        var onremoveaudioSuccess = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.popupaudio.audioarray = [];
            artistFactory.getartistfiles($scope.model.id).then(getartistfilesbyidSuccess, getartistfilesbyidError);

        }

        var onremoveaudioError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
        }

        $scope.removeaudio = function (popupaudio) {
            $scope.$parent.showLoading = true;
            for (var i = 0; i < $scope.model.audioAttachments.length; i++) {
                if ($scope.model.audioAttachments[i].id === popupaudio) {
                    $scope.model.audioAttachments.splice(i, 1);

                }
            }
            if ($scope.model.audioAttachments.length > 2) {
                $scope.showaudioprev = true;
                $scope.showaudionext = true;
            }
            else {
                $scope.showaudioprev = false;
                $scope.showaudionext = false;
                 }
            $scope.$parent.showLoading = false;
            //$scope.popupaudio.initialize();
            //$scope.$parent.showLoading = false;
            //$scope.profile = sessionStorage.getItem("profile");
            //var obj = JSON.parse($scope.profile);

            //artistFactory.removefiles({
            //    "userid": obj.id,
            //    "id": popupaudio,
            //    "status": "false"
            //}).then(onremoveaudioSuccess, onremoveaudioError)
        }

        // #endregion

        //#region Create Nomination

        var onInsertSuccess = function (response) {
            console.log('INSERT SUCCESS')
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
            $scope.message = "Nomination created successfully"
            // $location.path('artist');
            $scope.shownominationPopUp = true;
            //$location.path('artist');
        };

        var onInsertError = function (response) {
            console.log(JSON.stringify(response));
            $scope.showError = true;
            $scope.$parent.showLoading = false;

            $scope.createmessage = "Failed to create Nomination"
        };
       
   
        $scope.save = function (form) {
            $('.fade').show();
            var a = tinyMCE.get('desc').getContent();
            if (a === "" || a === null) {
                $("#questionValid").html("<b>Bio required</b>");

            }
            else {
                //a = a.replace(/^\<p\>/, "").replace(/\<\/p\>$/, "");
                $scope.nominationmodel.bio = a;
            }
            if (form.$valid && $scope.nominationmodel.bio) {
                    
                    $scope.$parent.showLoading = true;
                    console.log("nominationmodel", $scope.nominationmodel);
                    console.log("event", $scope.event);
                    for (var i = 0; i < $scope.event.length; i++) {
                        $scope.mevent_id.push($scope.event[i].id);
                    }
                    var myVar = $scope.mevent_id.join(',');
                    $scope.nominationmodel.mevent_id = myVar;
                    //$scope.nominationmodel.password = "1234";

                    $scope.nominationmodel.nominatedby = sessionStorage.getItem('ceek_userid');;



                    artistFactory.createnomination($scope.nominationmodel).then(onInsertSuccess, onInsertError);

                }
            
            else {
                $('#myModal').hide();
                $('.fade').remove();
               // $('.modal-backdrop').remove();
            }
        }

        var oncreateaudiofilesSuccess = function (response) {

            console.log(JSON.stringify(response));
        };
        var oncreateaudiofilesError = function (response) {

            console.log(JSON.stringify(response));
        };
        var oncreatevideofilesSuccess = function (response) {

            console.log(JSON.stringify(response));
        };
        var oncreatevideofilesError = function (response) {

            console.log(JSON.stringify(response));
        };
        var oncreatefooterfilesSuccess = function (response) {
            console.log(JSON.stringify(response));

        };
        var oncreatefooterfilesError = function (response) {

            console.log(JSON.stringify(response));
        };
        var oncreateheaderfilesSuccess = function (response) {
            console.log(JSON.stringify(response));

        };
        var oncreateheaderfilesError = function (response) {

            console.log(JSON.stringify(response));
        };

        var oncreateimagefilesSuccess = function (response) {
            console.log(JSON.stringify(response));

        };
        var oncreateimagefilesError = function (response) {

            console.log(JSON.stringify(response));
        };
        $scope.createheaderfiles = function () {


            $scope.userfilesmodel.ceek_userid = sessionStorage.getItem('ceek_userid');

            $scope.userfilesmodel.artistid = $scope.artistid;
            if ($scope.headerpicpath) {
                $scope.userfilesmodel.url = $scope.headerpicpath;
                $scope.userfilesmodel.filename = $scope.headerpicname;
                $scope.userfilesmodel.filetype = "headerpic";
                artistFactory.userfiles($scope.userfilesmodel).then(oncreateheaderfilesSuccess, oncreateheaderfilesError);

            } else
                $scope.$parent.showLoading = false;


        }
        $scope.createfooterfiles = function () {


            $scope.footerfilesmodel = {
                "ceek_userid": sessionStorage.getItem('ceek_userid'),
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

            } else
                $scope.$parent.showLoading = false;



        }

        $scope.createimagefiles = function () {


            
            if ($scope.model.otherPics.length > 0) {
                for (var i = 0; i < $scope.model.otherPics.length; i++) {

                    var imagefilesmodel = {
                    "ceek_userid": sessionStorage.getItem('ceek_userid'),
                    "artistid" : $scope.artistid,
                    "url": "",
                    "filetype": "",
                    "filename": "",
                    // "ismainvedio": "",
                    "createdby": "1",
                    "isdefault": "true"
                    }
                    imagefilesmodel.url = $scope.model.otherPics[i].imageurl;
                    imagefilesmodel.filename = $scope.model.otherPics[i].imageurl;
                    imagefilesmodel.filetype = "Image";
                    artistFactory.userfiles(imagefilesmodel).then(oncreateimagefilesSuccess, oncreateimagefilesError);

                }
            } else
                $scope.$parent.showLoading = false;



        }

        $scope.createvideofiles = function () {



            if ($scope.model.videoAttachments.length > 0) {
                for (var i = 0; i < $scope.model.videoAttachments.length; i++) {

                    var videofilesmodel = {
                        "ceek_userid": sessionStorage.getItem('ceek_userid'),
                        "artistid": $scope.artistid,
                        "url": "",
                        "filetype": "",
                        "filename": "",
                            // "ismainvedio": "",
                        "createdby": "1",
                        "isdefault": "true"
                        }
                    videofilesmodel.url = $scope.model.videoAttachments[i].fullvideourl;
                    videofilesmodel.filename = $scope.model.videoAttachments[i].id;
                    videofilesmodel.filetype = "video";
                    artistFactory.userfiles(videofilesmodel).then(oncreatevideofilesSuccess, oncreatevideofilesError);

                }
            } else
            $scope.$parent.showLoading = false;


        }
        $scope.createaudiofiles = function () {



            if($scope.model.audioAttachments.length > 0) {
                for (var i = 0; i < $scope.model.audioAttachments.length; i++) {
                    var audiofilesmodel = {
                        "ceek_userid": sessionStorage.getItem('ceek_userid'),
                        "artistid": $scope.artistid,
                        "url": "",
                        "filetype": "",
                        "filename": "",
                            // "ismainvedio": "",
                        "createdby": "1",
                        "isdefault": "true"
                        }
                    audiofilesmodel.url = $scope.model.audioAttachments[i].fullaudiourl;
                    audiofilesmodel.filename = $scope.model.audioAttachments[i].filename;
                    audiofilesmodel.filetype = "audio";

                    artistFactory.userfiles(audiofilesmodel).then(oncreateaudiofilesSuccess, oncreateaudiofilesError);

                }
            } else
                $scope.$parent.showLoading = false;



        }

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
            artistFactory.getartistfiles($scope.model.id).then(getartistfilesbyidSuccess, getartistfilesbyidError);


        };
        var onmultiaudioError = function (response) {
            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;

        };

        //#endregion

        //#region Button Events

        $scope.ok = function () {
            $scope.shownominationPopUp = false;
            $('#myModal').hide();
            $('.modal-backdrop').remove();
            $location.path('artist');
        }

        $scope.closepopup = function () {
            $('#myModal').hide();
            $('.modal-backdrop').remove();
        }



        $scope.Cancel = function () {

            $window.location.reload();
        }

        // #endregion

    });

    app.directive('hfileModel', ['$parse', function ($parse) {
        return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model = $parse(attrs.hfileModel);
                    var modelSetter = model.assign;
                    var maxSize = 5000000;
                    element.bind('change', function () {
                        scope.$apply(function() {
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
                        scope.$apply(function() {
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
                        scope.$apply(function() {
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

    app.directive('afileModel', ['$parse', function ($parse) {
        return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model = $parse(attrs.afileModel);
                    var modelSetter = model.assign;
                    var maxSize = 20000000;
                    element.bind('change', function () {
                        scope.$apply(function() {
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

    app.directive('fileModel', ['$parse', function ($parse) {
        return {

    restrict: 'A',
    link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        var maxSize = 5000000;
        element.bind('change', function () {
            scope.$apply(function() {
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

    app.directive('onFinishRender', function ($timeout) {
        return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    if(scope.$last === true) {
                        $timeout(function() {
                            scope.$emit('ngRepeatFinished');
                        });
                    }
                }
            }
    });

    //#region Upload Utilities

    /* Utility function to convert a canvas to a BLOB */
    var dataURLToBlob = function (dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == - 1) {
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
            uInt8Array[i]= raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }
    /* End Utility function to convert a canvas to a BLOB  */

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

});

