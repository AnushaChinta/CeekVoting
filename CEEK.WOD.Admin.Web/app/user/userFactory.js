var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('userFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';

        //var profile = JSON.parse(sessionStorage.getItem("profile"));

        var model = function () {
            return {

                //   "artistUniqueKey": "",
                //"lastname": "",
                //"firstname": "",
                //"description": "",
                //"imageurl": "",
                //  "user_type": "voter",
                // "artistVotes": 0,
                //"event_id": 1,
                //"password": "",
                //"createdby": 24,
                //"modifiedby": 24,
                //"fullimageurl": ""

                "userUniqueKey": "",
                "firstname": "",
                "lastname": "",
                "middlename": "",
                "emailid": "",
                "mobile_number": "",
                "password": "",
                "loginthru": "",
                "login_token": "",
                "user_type": "admin",
                "country_name": "",
                "state_name": "",
                "address": "",
                "status": "",
                "event_id": 1,
                "fullname": "",
                "imageurl": "",
                "description": "",
                "createdby": 24,
                "modifiedby": 24,
                "userid": ""

            }


        };

        var uploadModel = function () {
            return {

                //  "user_uniqueid": profile.uniqueid,
                "imageurl": "",
                "createdby": ""
            }
        }




        var insert = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/RegisterUser", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var update = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/UpdateUser", input)
                       .then(function (response) {
                           return response;
                       });
        };



        var softdelete = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/BlockUser", input)
                       .then(function (response) {
                           return response;
                       });
        };
   

        var getallusers = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/getallAdmins", input)
            .then(function (response) {
                return response;
            });
        };

        var getuser = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/getuserbyid", input)
                       .then(function (response) {
                           return response;
                       });
        };

        var createimage = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/CreateUserImage", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var removeimage = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/RemoveUserImage", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var getallimages = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/GetallUserImages", input)
                       .then(function (response) {
                           return response;
                       });
        };
        var defaultimage = function (input) {
            return apiFactory.httpPost(apiFactory.baseURL() + "USER/SetdefaultImage", input)
                       .then(function (response) {
                           return response;
                       });
        };



        var serverURL = apiFactory.serverURL;
        var fileserverURL = apiFactory.fileserverURL;


        var mockData = function () {
            return {
                artistList:
                     [

                    {
                        "artistUniqueKey": "",
                        "artistSNo": 1,
                        "artistName": "Allahrakka123",
                        "artistDesc": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi. Quae ab illo inventore veritatis et quasi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque.",
                        "artistImageUrl": "img/video11.png",
                        "artistVotes": 1
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 2,
                        "artistName": "Katy Perry",
                        "artistDesc": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
                        "artistImageUrl": "img/video22.png",
                        "artistVotes": 2
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 3,
                        "artistName": "Taylor Swift",
                        "artistDesc": "Sed  natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
                        "artistImageUrl": "img/video33.png",
                        "artistVotes": 2.5
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 4,
                        "artistName": "Drake",
                        "artistDesc": " sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.",
                        "artistImageUrl": "img/video44.png",
                        "artistVotes": 0
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 5,
                        "artistName": "NAS",
                        "artistDesc": " sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.",
                        "artistImageUrl": "img/video55.png",
                        "artistVotes": 0
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 6,
                        "artistName": "Lady Gaga",
                        "artistDesc": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi. Quae ab illo inventore veritatis et quasi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque.",
                        "artistImageUrl": "img/video66.png",
                        "artistVotes": 1
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 7,
                        "artistName": "Rihanna",
                        "artistDesc": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
                        "artistImageUrl": "img/video77.png",
                        "artistVotes": 2
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 8,
                        "artistName": "Kaiser Chiefs",
                        "artistDesc": "Sed  natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
                        "artistImageUrl": "img/video88.png",
                        "artistVotes": 2.5
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 9,
                        "artistName": "The Killers",
                        "artistDesc": " sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.",
                        "artistImageUrl": "img/video99.png",
                        "artistVotes": 3
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 10,
                        "artistName": "Megadeth",
                        "artistDesc": " sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.",
                        "artistImageUrl": "img/video10.png",
                        "artistVotes": 4
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 11,
                        "artistName": "Allahrakka",
                        "artistDesc": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi. Quae ab illo inventore veritatis et quasi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque.",
                        "artistImageUrl": "img/video11.png",
                        "artistVotes": 1
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 12,
                        "artistName": "Katy Perry",
                        "artistDesc": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
                        "artistImageUrl": "img/video22.png",
                        "artistVotes": 2
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 13,
                        "artistName": "Taylor Swift",
                        "artistDesc": "Sed  natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
                        "artistImageUrl": "img/video33.png",
                        "artistVotes": 2.5
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 14,
                        "artistName": "Drake",
                        "artistDesc": " sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.",
                        "artistImageUrl": "img/video44.png",
                        "artistVotes": 3.6
                    },
                    {
                        "artistUniqueKey": "",
                        "artistSNo": 15,
                        "artistName": "NAS",
                        "artistDesc": " sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.",
                        "artistImageUrl": "img/video55.png",
                        "artistVotes": 5
                    }

                     ]
            }


        };


        return {
            model: model,
            uploadModel: uploadModel,
            mockData: mockData,
            insert: insert,
            update: update,
            getallusers: getallusers,
            getuser: getuser,
            serverURL: serverURL,
            softdelete: softdelete,
            createimage: createimage,
            removeimage: removeimage,
            getallimages: getallimages,
            defaultimage: defaultimage,
            fileserverURL: fileserverURL

        };

    });
});