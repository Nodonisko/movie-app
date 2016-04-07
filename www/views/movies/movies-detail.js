app.controller('MoviesDetailCtrl', function ($scope, $rootScope, MoviesService, $stateParams, $ionicNavBarDelegate, $ionicSlideBoxDelegate) {
    if ($stateParams.id) {
        var movieId = +$stateParams.id;
        $rootScope.loadingShow();
        MoviesService.getMovieById(movieId).then(function (result) {
            console.log(result);
            $scope.movie = result;
            $ionicSlideBoxDelegate.update();
            loadCountryChart(result.production_countries);
        }).finally(function () {
            $rootScope.loadingHide();
        });
    }

    $scope.isMovieWatched = function () {
        return MoviesService.isMovieWatched(movieId);
    }

    $scope.toggleWatched = function () {
        MoviesService.toggleWatched(movieId);
    }

    var loadCountryChart = function (chartData) {
        $scope.chartObject = {};

        $scope.chartObject.type = "GeoChart";

        $scope.chartObject.data = [
            ['Locale']
        ];

        var countries = [];
        chartData.forEach(function (item) {
            countries.push([item.name]);
        });

        $scope.chartObject.data = $scope.chartObject.data.concat(countries);

        $scope.chartObject.options = {
            tooltip: {
                isHtml: true,
                trigger: 'both'
            }
        };

    }

    $scope.countrySelected = function (country) {
        console.log(country);
    }
});