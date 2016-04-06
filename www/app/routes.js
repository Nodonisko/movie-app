app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, $resourceProvider, APP_CONFIG) {
    $httpProvider.interceptors.push('authInterceptorService');

    $stateProvider
        .state('movies', {
            url: '/movies',
            templateUrl: "views/movies/movies-list.html",
            controller: 'MoviesListCtrl'
        })
        .state('movies-detail', {
            url: '/movies/:id',
            templateUrl: "views/movies/movies-detail.html",
            controller: 'MoviesDetailCtrl'
        })
        .state('genres', {
            url: '/genres',
            templateUrl: "views/movies/movies-genres.html",
            controller: 'MoviesGenresCtrl'
        })
        .state('statistics', {
            url: '/statistics',
            templateUrl: "views/movies/movies-statistics.html",
            controller: 'MoviesStatisticsCtrl'
        })

    // states end
    ;

    $urlRouterProvider.otherwise("/movies");

});