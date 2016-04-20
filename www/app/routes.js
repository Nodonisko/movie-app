app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, $resourceProvider, APP_CONFIG) {
    $httpProvider.interceptors.push('authInterceptorService');
    $ionicConfigProvider.scrolling.jsScrolling(false);

    $stateProvider
        .state('app', {
            url: '/app',
            templateUrl: "views/menu/menu.html",
            abstract: true
        })
        .state('app.movies', {
            url: '/movies',
            views: {
                'menuContent': {
                    templateUrl: "views/movies/movies-list.html",
                    controller: 'MoviesListCtrl'
                }
            }
        })
        .state('app.movies-detail', {
            url: '/movies/:id',
            views: {
                'menuContent': {
                    templateUrl: "views/movies/movies-detail.html",
                    controller: 'MoviesDetailCtrl'
                }
            }
        })
        .state('app.genres', {
            url: '/genres',
            views: {
                'menuContent': {
                    templateUrl: "views/movies/movies-genres.html",
                    controller: 'MoviesGenresCtrl'
                }
            }
        })
        .state('app.statistics', {
            url: '/statistics',
            views: {
                'menuContent': {
                    templateUrl: "views/movies/movies-statistics.html",
                    controller: 'MoviesStatisticsCtrl'
                }
            }
        })
        .state('app.profile', {
            url: '/profile',
            views: {
                'menuContent': {
                    templateUrl: "views/profile/profile.html",
                    controller: 'ProfileCtrl'
                }
            }
        })


        // states end
    ;

    $urlRouterProvider.otherwise("/app/movies");

});