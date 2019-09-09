var dependencies = ['main', 'common/apiFactory'];
define(dependencies, function (app) {
    app.factory('votesFactory', function ($http, $httpParamSerializerJQLike, apiFactory) {
        'use strict';

        var model = function () {
            return {
                "artistUniqueKey": "",
                "artistName": "",
                "artistImageUrl": "",
                "artistVotes": 0,
                "artistRanking": 0,
                "artistVotePerc": 0
            }

        };


        var mockData = function () {
            return {
                artistList:
                [

               {
                   "artistUniqueKey": "",
                   "artistName": "Allahrakka",
                   "artistImageUrl": "img/video11.png",
                   "artistVotes": 1,
                   "artistRanking": 1,
                   "artistRelativeVotes": 100
               },
               {
                   "artistUniqueKey": "",
                   "artistName": "Katy Perry",
                   "artistImageUrl": "img/video22.png",
                   "artistVotes": 2,
                   "artistRanking": 2,
                   "artistRelativeVotes": 80
               },
               {
                   "artistUniqueKey": "",
                   "artistName": "Taylor Swift",
                   "artistImageUrl": "img/video33.png",
                   "artistVotes": 2.5,
                   "artistRanking": 3,
                   "artistRelativeVotes": 70
               },
               {
                   "artistUniqueKey": "",
                   "artistName": "Drake",
                   "artistImageUrl": "img/video44.png",
                   "artistVotes": 0,
                   "artistRanking": 4,
                   "artistRelativeVotes": 60
               },
               {
                   "artistUniqueKey": "",
                   "artistName": "NAS",
                   "artistImageUrl": "img/video55.png",
                   "artistVotes": 0,
                   "artistRanking": 5,
                   "artistRelativeVotes": 55
               },
               {
                   "artistUniqueKey": "",
                   "artistName": "Lady Gaga",
                   "artistImageUrl": "img/video66.png",
                   "artistVotes": 1,
                   "artistRanking": 6,
                   "artistRelativeVotes": 50
               },
               {
                   "artistUniqueKey": "",
                   "artistName": "Rihanna",
                   "artistImageUrl": "img/video77.png",
                   "artistVotes": 2,
                   "artistRanking": 7,
                   "artistRelativeVotes": 30
               },
               {
                   "artistUniqueKey": "",
                   "artistName": "Kaiser Chiefs",
                   "artistImageUrl": "img/video88.png",
                   "artistVotes": 2.5,
                   "artistRanking": 8,
                   "artistRelativeVotes": 30
               },
               {
                   "artistUniqueKey": "",
                   "artistName": "The Killers",
                   "artistImageUrl": "img/video99.png",
                   "artistVotes": 3,
                   "artistRanking": 9,
                   "artistRelativeVotes": 5
               },
               {
                   "artistUniqueKey": "",
                   "artistName": "Megadeth",
                   "artistImageUrl": "img/video10.png",
                   "artistVotes": 4,
                   "artistRanking": 10,
                   "artistRelativeVotes": 5
               }

                ]
            }


        };

        return {
            model: model,
            mockData: mockData
        };

    });
});