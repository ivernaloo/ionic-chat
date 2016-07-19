angular.module('ionic-chat-app',
    [
        'ionic',
        'ionic-chat-app-services',
        'ionic-chat-app-controllers',
        'ionic-chat-app-directives'
    ])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        })
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Configure the routing
        $stateProvider

            // Each tab has its own nav history stack:
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            .state('app.node', {
                url: '/node',
                views: {
                    'node-view': {
                        templateUrl: 'templates/app-chat.html',
                        controller: 'ChatController',
                        resolve: {
                            chatRoom: function () {
                                return 'node';
                            }
                        }
                    }
                }
            })

            .state('app.javascript', {
                url: '/javascript',
                views: {
                    'javascript-view': {
                        templateUrl: 'templates/app-chat.html',
                        controller: 'ChatController',
                        resolve: {
                            chatRoom: function () {
                                return 'javascript';
                            }
                        }
                    }
                }
            })

            .state('app.haskell', {
                url: '/haskell',
                views: {
                    'haskell-view': {
                        templateUrl: 'templates/app-chat.html',
                        controller: 'ChatController',
                        resolve: {
                            chatRoom: function () {
                                return 'haskell';
                            }
                        }
                    }
                }
            })

            .state('app.erlang', {
                url: '/erlang',
                views: {
                    'erlang-view': {
                        templateUrl: 'templates/app-chat.html',
                        controller: 'ChatController',
                        resolve: {
                            chatRoom: function () {
                                return 'erlang';
                            }
                        }
                    }
                }
            })

            .state('app.scala', {
                url: '/scala',
                views: {
                    'scala-view': {
                        templateUrl: 'templates/app-chat.html',
                        controller: 'ChatController',
                        resolve: {
                            chatRoom: function () {
                                return 'scala';
                            }
                        }
                    }
                }
            });

        $urlRouterProvider.otherwise('/app/node');
    });
