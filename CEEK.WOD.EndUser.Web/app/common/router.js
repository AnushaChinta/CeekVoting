define([
    'angularAMD',
    'master/masterCtrl'
], function (angularAMD, masterCtrl) {
    'use strict';
    return function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('wod',
              angularAMD.route({
                  abstract: true,
                  controller: masterCtrl,
                  templateUrl: 'app/master/master.html',
                  controllerAs: 'vm'
              }))
         .state('wod.login',
            angularAMD.route({
                url: '/login',
                templateUrl: 'app/login/login.html',
                controllerAs: 'vm',
                controllerUrl: 'login/loginCtrl',
                controller: 'loginCtrl'
            }))
             .state('wod.signup',
            angularAMD.route({
                url: '/signup',
                templateUrl: 'app/signup/signup.html',
                controllerAs: 'vm',
                controllerUrl: 'signup/signupCtrl',
                controller: 'signupCtrl'
            }))

            .state('wod.forgotpassword',
            angularAMD.route({
                url: '/forgotpassword',
                templateUrl: 'app/forgotpassword/forgotpassword.html',
                controllerAs: 'vm',
                controllerUrl: 'forgotpassword/forgotpasswordCtrl',
                controller: 'forgotpasswordCtrl'
            }))
            .state('wod.profile',
            angularAMD.route({
                url: '/profile',
                templateUrl: 'app/profile/profile.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/profileCtrl',
                controller: 'profileCtrl'
            }))
             .state('wod.account',
            angularAMD.route({
                url: '/account',
                templateUrl: 'app/profile/accountInfo.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/accountInfoCtrl',
                controller: 'accountInfoCtrl'
            }))
             .state('wod.accountHistory',
            angularAMD.route({
                url: '/accountHistory',
                templateUrl: 'app/profile/accountHistory.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/accountHistoryCtrl',
                controller: 'accountHistoryCtrl'
            }))
             .state('wod.myvotes',
            angularAMD.route({
                url: '/myvote',
                templateUrl: 'app/profile/myvotes.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/myvotesCtrl',
                controller: 'myvotesCtrl'
            }))
            .state('wod.myfavourite',
            angularAMD.route({
                url: '/myfavourites',
                templateUrl: 'app/profile/myFavourite.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/myFavouriteCtrl',
                controller: 'myFavouriteCtrl'
            }))
        .state('wod.artist',
            angularAMD.route({
                url: '/artist',
                templateUrl: 'app/artist/artist.html',
                controllerAs: 'vm',
                controllerUrl: 'artist/artistCtrl',
                controller: 'artistCtrl'
            }))
             .state('wod.artistInfo',
            angularAMD.route({
                url: '/artist/:id',
                templateUrl: 'app/artist/artistInfo.html',
                controllerAs: 'vm',
                controllerUrl: 'artist/artistInfoCtrl',
                controller: 'artistInfoCtrl'
            }))
             .state('wod.artistnomination',
            angularAMD.route({
                url: '/nominate',
                templateUrl: 'app/artist/artistNominations.html',
                controllerAs: 'vm',
                controllerUrl: 'artist/artistNominationsCtrl',
                controller: 'artistNominationsCtrl'
            }))
         .state('wod.votes',
            angularAMD.route({
                url: '/votes',
                templateUrl: 'app/votes/votes.html',
                controllerAs: 'vm',
                controllerUrl: 'votes/votesCtrl',
                controller: 'votesCtrl'
            }))
            .state('wod.cryptoshop',
            angularAMD.route({
                url: '/buyceekcoins',
                templateUrl: 'app/cryptoshop/cryptoshop.html',
                controllerAs: 'vm',
                controllerUrl: 'cryptoshop/cryptoshopCtrl',
                controller: 'cryptoshopCtrl'
            }))
         .state('wod.home',
            angularAMD.route({
                url: '/home',
                templateUrl: 'app/home/home.html',
                controllerAs: 'vm',
                controllerUrl: 'home/homeCtrl',
                controller: 'homeCtrl'
            }))

           
        //.state("otherwise", {
        //    url: '',
        //    templateUrl: 'app/login/login.html',
        //    controllerAs: 'vm',
        //    controllerUrl: 'login/loginCtrl',
        //    controller: 'loginCtrl'
        //})

        ;

        $urlRouterProvider.when('', '/artist');
        $urlRouterProvider.when('/', '/artist');
    };
});




