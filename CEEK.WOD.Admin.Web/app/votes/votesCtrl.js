var dependencies = ['main', 'votes/votesFactory'];
define(dependencies, function (app, votesFactory) {
    app.controller("votesCtrl", function ($scope, $stateParams, votesFactory, $location) {
        'use strict';

        $scope.$parent.isArtist = false;

        $scope.model = votesFactory.mockData();

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

    });
});