var dependencies = ['main', 'profile/profileFactory'];
define(dependencies, function (app, profileFactory) {
    app.controller("pageContentCtrl", function ($scope, $stateParams, profileFactory, $location) {
        'use strict';

        $scope.$parent.isArtist = false;
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        $scope.model = profileFactory.model();


        var ongetdeletemessagessuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
          

        };
        var ongetdeletemessageserror = function (response) {

            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to delete message";

        };

       

        $scope.showVoteThanksPopUp = false;
      

        $scope.back = function () {
            $scope.showVoteThanksPopUp = false;
        }

        $scope.close = function () {
            $scope.showVoteThanksPopUp = false;
        }

        var ongetGetUimessagessuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
            if (response.data.message) {
                $scope.UImessageModel = response.data.message[0].cvr_getalluimessages;

                for (var i = 0; i < $scope.UImessageModel.length; i++) {
                   
                    $scope.UImessageModel[i].field_name =  $scope.UImessageModel[i].field_name;
                    
                }
            
            
            }

        };
        var ongetGetUimessageserror = function (response) {

            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to get UImessages";

        };


        var ongetGetUpdatemessagessuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));
           

        };
        var ongetGetUpdatemessageserror = function (response) {

            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to Update message";
        };


        var ongetGetinsertmessagessuccess = function (response) {
            $scope.$parent.showLoading = false;
            console.log(JSON.stringify(response));


        };
        var ongetGetinsertmessageserror = function (response) {

            console.log(JSON.stringify(response));
            $scope.$parent.showLoading = false;
            $scope.message = "Failed to insert message";
        };

        $scope.messageUpdate = function (x) {
            $scope.$parent.showLoading = true;
            console.log(x);
            $scope.selectedMessage= x;
            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);

            console.log("model", $scope.messagesModel);
            $scope.id = obj.id;


            $scope.input = {
                "id": x.id,
                "screen_name": "artist",
                "field_name": x.field_name,
                "field_message": x.field_message,
                "userid": $scope.id
            };

         
                profileFactory.updateUimessages($scope.input).then(ongetGetUpdatemessagessuccess, ongetGetUpdatemessageserror);

        }

        $scope.insertMessage = function () {
            $scope.$parent.showLoading = true;
            // $scope.profile = sessionStorage.getItem("profile");

         
            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);

            $scope.id = obj.id;

            $scope.messageModel.userid = $scope.id;

            profileFactory.insertUimessages($scope.messageModel).then(ongetGetinsertmessagessuccess, ongetGetinsertmessageserror);
        }


        $scope.deleteMessage = function (x) {
            $scope.$parent.showLoading = true;
            // $scope.profile = sessionStorage.getItem("profile");

            console.log(x);
            $scope.selectedMessage = x;
            $scope.profile = sessionStorage.getItem("profile");
            var obj = JSON.parse($scope.profile);
          
            $scope.id = obj.id;

            $scope.input = {
                "id": x.id,

                "userid": $scope.id
            };

            profileFactory.deleteUimessages($scope.input).then(ongetdeletemessagessuccess, ongetdeletemessageserror);
        }





        $scope.getUImessages = function () {
            $scope.$parent.showLoading = true;

            profileFactory.GetUimessages().then(ongetGetUimessagessuccess, ongetGetUimessageserror);
        }


        if (sessionStorage.getItem("profile") != null) {
          //  $scope.CeekPointSettings();
            $scope.getUImessages();
        }
    });
});