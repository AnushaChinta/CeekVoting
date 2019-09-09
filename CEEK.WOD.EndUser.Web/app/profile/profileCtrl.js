var dependencies = ['main', 'profile/profileFactory'];
define(dependencies, function (app, profileFactory) {
    app.controller("profileCtrl", function ($scope, $stateParams, profileFactory, $location,$http) {
        'use strict';

        $scope.$parent.isArtist = true;
        if (!$scope.$parent.isAuth) {
            $location.path('login');
            return;
        }
        $scope.ceekserverURL = profileFactory.ceekserverURL;
        $scope.inputObj = profileFactory.inputObj;
        $scope.showVoteThanksPopUp = false;
        $scope.msg = false;
        $scope.UpdateUserProfileAPI = function (inputObj) {
            $scope.$parent.showLoading = true;
            $scope.message = "";
            //inputObj = {
            //    avatar: '',
            //    fullName: '',
            //    userName: '',
            //    gender: ''
            ////};
            //$http.post($scope.ceekserverURL + 'tv/user', inputObj,
            //                {
            //                    'Content-Type': 'application/json',
            //                    "Authorization": 'Bearer ' + sessionStorage.getItem('token'),
            //                }).
            //              then(function (data, status, headers, config) {
            //                  console.log('profile save response success' , data);

            //                  //{
            //                  //    "_id": "59e4dd4043d62450245e9c96",
            //                  //    "email": "John_Smith@gmail.com",
            //                  //    "role": 10,
            //                  //    "fullName": "John Smith",
            //                  //    "userName": "New_User",
            //                  //    "gender": 'male'
            //                  //    "avatar": "http://ceekvr.thinkmobiles.com/files/ceekvr-avatars/58a711fc613b09004e1a6c60.jpg",
            //                  //    "coins": 7
            //                  //}
            //              },
            //              function (error) {
            //                  console.log("profile save Error", error);

            //              });
            $http({
                method: "PUT",
                url: $scope.ceekserverURL + 'tv/user',
                data:{avatar:inputObj.avatar,fullName:inputObj.fullName,gender:inputObj.gender},
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(function (response) {
                //debugger;
                $scope.$parent.showLoading = false;
                //console.log(JSON.stringify(response));
                $location.path('artist');
           },
            function (error) {
                $scope.$parent.showLoading = false;
                console.log("profile save Error", error);
                $scope.message = error.data.error;
            });
        }

        $scope.GetUserProfileAPI = function () {
            $scope.message = "";
            $scope.msg = false;
            $scope.$parent.showLoading = true;
            //$http.get($scope.ceekserverURL + 'tv/user', 
            //                {
            //                         "Authorization": 'Bearer ' + sessionStorage.getItem('token')
            //                }).
            //              then(function (data, status, headers, config) {

            //                  //{"_id": "59c8bf7fce64ab511d1a0acf",
            //                  //  "role": 10,
            //                  //  "createdAt": "2017-09-25T08:34:07.210Z",
            //                  //  "coins": 94,
            //                  //  "avatar": "https://ceekvr-avatars.s3.amazonaws.com/5a16cab6bfabcca628e95ae3.png?AWSAccessKeyId=AKIAJG32NC75F62GGALA&Expires=1
            //                  //    "userName": "John_Smith",
            //                  //    "fullName": "John Smith",
            //                  //    "email": "useremail@gmail.com",
            //                  //    "usedITunesGift": true,
            //                  //    "isActiveAccount": true,
            //                  //    "subscribe": false,
            //                  //    "isConfirm": true}
            //                  console.log('profile get response success' , data);
            //              },
            //              function (error) {
            //                  console.log("profile get Error", error);

            //              });

            $http({
                method: "GET",
                url: $scope.ceekserverURL + 'tv/user',
                headers: {
                    "Authorization": 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            .then(function (response) {
                $scope.$parent.showLoading = false;
                //debugger;
              
                $scope.profilemodel = response.data;
                if ($scope.profilemodel.userName == '') {
                    $scope.msg = false;
                }
                else
                    $scope.msg = true;
            },
             function (error) {
                 console.log("profile get Error", error);
                // $scope.message = error.data.error;
                 $scope.$parent.showLoading = false;
                    
                     console.log("Token expired ");

                     $scope.profile = "";
                    
                     $scope.showVoteThanksPopUp = true;
                     sessionStorage.removeItem('token');
                     sessionStorage.removeItem('profile');
                     sessionStorage.removeItem('ceekPoints');
                     sessionStorage.removeItem('totalVotes');
                     sessionStorage.removeItem('username');
                     sessionStorage.removeItem('email');
                     sessionStorage.removeItem('ceek_userid');
                     $scope.isAuth = false;
                     $scope.$parent.isAuth = false;
                     //$location.path("login");
                 
             });
            
        }
        $scope.Logout = function () {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('profile');
            sessionStorage.removeItem('ceekPoints');
            sessionStorage.removeItem('totalVotes');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('ceek_userid');
            $scope.isAuth = false;
            $scope.$parent.isAuth = false;
            $location.path("login");
        };
        $scope.cancel = function () {
            $location.path('artist');
        }
        $scope.GetUserProfileAPI();
    });
});