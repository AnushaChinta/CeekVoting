define([
    'angularAMD',
    'master/masterCtrl'
], function (angularAMD, masterCtrl) {
    'use strict';
    return function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('woda',
              angularAMD.route({
                  abstract: true,
                  controller: masterCtrl,
                  templateUrl: 'app/master/master.html',
                  controllerAs: 'vm'
              }))
         .state('woda.login',
            angularAMD.route({
                url: '/login',
                templateUrl: 'app/login/login.html',
                controllerAs: 'vm',
                controllerUrl: 'login/loginCtrl',
                controller: 'loginCtrl'
            }))
            .state('woda.forgotpassword',
            angularAMD.route({
                url: '/forgotpassword',
                templateUrl: 'app/forgotpassword/forgotpassword.html',
                controllerAs: 'vm',
                controllerUrl: 'forgotpassword/forgotpasswordCtrl',
                controller: 'forgotpasswordCtrl'
            }))
            .state('woda.profile',
            angularAMD.route({
                url: '/profile',
                templateUrl: 'app/profile/profile.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/profileCtrl',
                controller: 'profileCtrl'
            }))
              .state('woda.setting',
            angularAMD.route({
                url: '/setting',
                templateUrl: 'app/profile/setting.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/settingCtrl',
                controller: 'settingCtrl'
            }))
              .state('woda.dashboard',
            angularAMD.route({
                url: '/dashboard',
                templateUrl: 'app/profile/transactionDashboard.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/transactionDashboardCtrl',
                controller: 'transactionDashboardCtrl'
            }))
            .state('woda.blockchain',
            angularAMD.route({
                url: '/blockchaintranscation',
                templateUrl: 'app/profile/blockchainTranscation.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/blockchainTranscationCtrl',
                controller: 'blockchainTranscationCtrl'
            }))
             .state('woda.eventdashboard',
            angularAMD.route({
                url: '/eventdashboard',
                templateUrl: 'app/profile/eventDashboard.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/eventDashboardCtrl',
                controller: 'eventDashboardCtrl'
            }))
            .state('woda.event',
            angularAMD.route({
                url: '/event',
                templateUrl: 'app/events/event.html',
                controllerAs: 'vm',
                controllerUrl: 'events/eventCtrl',
                controller: 'eventCtrl'
            }))
            .state('woda.eventInfo',
            angularAMD.route({
                url: '/eventInfo/:id',
                templateUrl: 'app/events/eventInfo.html',
                controllerAs: 'vm',
                controllerUrl: 'events/eventInfoCtrl',
                controller: 'eventInfoCtrl'
            }))
             .state('woda.eventInfocreate',
            angularAMD.route({
                url: '/eventInfo',
                templateUrl: 'app/events/eventInfo.html',
                controllerAs: 'vm',
                controllerUrl: 'events/eventInfoCtrl',
                controller: 'eventInfoCtrl'
            }))
        .state('woda.artist',
            angularAMD.route({
                url: '/artist',
                templateUrl: 'app/artist/artist.html',
                controllerAs: 'vm',
                controllerUrl: 'artist/artistCtrl',
                controller: 'artistCtrl'
            }))
            .state('woda.nomination',
            angularAMD.route({
                url: '/nomination',
                templateUrl: 'app/artist/artistNominations.html',
                controllerAs: 'vm',
                controllerUrl: 'artist/artistNominationsCtrl',
                controller: 'artistNominationsCtrl'
            }))
            .state('woda.nominationInfo',
            angularAMD.route({
                url: '/nomination/:id',
                templateUrl: 'app/artist/artistInfo.html',
                controllerAs: 'vm',
                controllerUrl: 'artist/artistInfoCtrl',
                controller: 'artistInfoCtrl'
            }))
            .state('woda.artistInfo',
            angularAMD.route({
                url: '/artistInfo/:id',
                templateUrl: 'app/artist/artistInfo.html',
                controllerAs: 'vm',
                controllerUrl: 'artist/artistInfoCtrl',
                controller: 'artistInfoCtrl'
            }))
             .state('woda.artistInfocreate',
            angularAMD.route({
                url: '/artistInfo',
                templateUrl: 'app/artist/artistInfo.html',
                controllerAs: 'vm',
                controllerUrl: 'artist/artistInfoCtrl',
                controller: 'artistInfoCtrl'
            }))
         .state('woda.votes',
            angularAMD.route({
                url: '/votes',
                templateUrl: 'app/votes/votes.html',
                controllerAs: 'vm',
                controllerUrl: 'votes/votesCtrl',
                controller: 'votesCtrl'
            }))
            .state('woda.cryptoshop',
            angularAMD.route({
                url: '/cryptoshop',
                templateUrl: 'app/cryptoshop/cryptoshop.html',
                controllerAs: 'vm',
                controllerUrl: 'cryptoshop/cryptoshopCtrl',
                controller: 'cryptoshopCtrl'
            }))
        .state('woda.cryptoInfo',
            angularAMD.route({
                url: '/cryptoInfo/:id',
                templateUrl: 'app/cryptoshop/cryptoInfo.html',
                controllerAs: 'vm',
                controllerUrl: 'cryptoshop/cryptoInfoCtrl',
                controller: 'cryptoInfoCtrl'
            }))
         .state('woda.cryptoInfoCreate',
            angularAMD.route({
                url: '/cryptoInfo',
                templateUrl: 'app/cryptoshop/cryptoInfo.html',
                controllerAs: 'vm',
                controllerUrl: 'cryptoshop/cryptoInfoCtrl',
                controller: 'cryptoInfoCtrl'
            }))
         .state('woda.user',
            angularAMD.route({
                url: '/user',
                templateUrl: 'app/user/user.html',
                controllerAs: 'vm',
                controllerUrl: 'user/userCtrl',
                controller: 'userCtrl'
            }))
            .state('woda.userInfo',
            angularAMD.route({
                url: '/userInfo/:id',
                templateUrl: 'app/user/userInfo.html',
                controllerAs: 'vm',
                controllerUrl: 'user/userInfoCtrl',
                controller: 'userInfoCtrl'
            }))
             .state('woda.userInfocreate',
            angularAMD.route({
                url: '/userInfo',
                templateUrl: 'app/user/userInfo.html',
                controllerAs: 'vm',
                controllerUrl: 'user/userInfoCtrl',
                controller: 'userInfoCtrl'
            }))
           .state('woda.pageContent',
            angularAMD.route({
                url: '/pageContent',
                templateUrl: 'app/profile/pageContent.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/pageContentCtrl',
                controller: 'pageContentCtrl'
            }))
        .state('woda.qrcode',
            angularAMD.route({
                url: '/qrcode',
                templateUrl: 'app/profile/qrcode.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/qrcodeCtrl',
                controller: 'qrcodeCtrl'
            }))
         .state('woda.changePassword',
            angularAMD.route({
                url: '/changepassword',
                templateUrl: 'app/profile/changePassword.html',
                controllerAs: 'vm',
                controllerUrl: 'profile/changePasswordCtrl',
                controller: 'changePasswordCtrl'
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




