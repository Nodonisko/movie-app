app.controller('MoviesGenresCtrl', function ($scope, $rootScope, MoviesGenresService,  $ionicNavBarDelegate) {
    $scope.data = {};
    $rootScope.loadingShow();

    MoviesGenresService.getGenres().then(function (result) {
        $scope.data.genres = result;
        $scope.data.activeGenre = result[0].id;
    }).catch(function (error) {
        $rootScope.showAlert('Cannot load genre list', 'error');
    }).then(function () {
        $rootScope.loadingHide();
    });

    $scope.$watch('data.activeGenre', function(){
        if(typeof $scope.data.activeGenre === 'undefined') return;

        $rootScope.loadingShow();
        MoviesGenresService.getMoviesByGenre($scope.data.activeGenre).then(function (result) {
            $scope.data.movies = result;
            console.log(result);
            $rootScope.loadingHide();
        });
    });
});