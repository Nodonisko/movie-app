app.controller('MoviesDetailCtrl', function($scope, $rootScope, MoviesService, $stateParams, $ionicNavBarDelegate, $ionicSlideBoxDelegate) {
   if($stateParams.id) {
       var movieId = +$stateParams.id;
       $rootScope.loadingShow();
       MoviesService.getMovieById(movieId).then(function (result) {
           $scope.movie = result;
           $ionicSlideBoxDelegate.update();
           $ionicNavBarDelegate.title($scope.movie.title);
           $rootScope.loadingHide();
       });
   }

    $scope.dump = function(variable) {
        $ionicNavBarDelegate.title($scope.movie.title);
    };

    $scope.isMovieWatched = function() {
        return MoviesService.isMovieWatched(movieId);
    }

    $scope.toggleWatched = function() {
        MoviesService.toggleWatched(movieId);
    }
});