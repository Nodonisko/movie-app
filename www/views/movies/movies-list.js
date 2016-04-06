app.controller('MoviesListCtrl', function ($scope, MoviesService, $ionicPopup, $ionicListDelegate, $ionicModal, $rootScope) {
        $scope.data = {};

        $scope.data.movies = null;

        $ionicModal.fromTemplateUrl('./views/movies/slidebox.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.slidebox = modal;
        });
        $scope.openSlidebox = function () {
            $scope.slidebox.show();
        };
        $scope.closeSlidebox = function () {
            $scope.slidebox.hide();
        };

        $scope.hasMoreMovies = true;

        $scope.loadMore = function () {
            MoviesService.getMoreMovies().then(function (result) {
                $scope.data.movies = result;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }).catch(function (err) {
                console.log(err);
                $scope.hasMoreMovies = false;
            });
        };

        $scope.order = '-popularity';
    })
    .directive('colorRate', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var maxRate = 10,
                    rate = attr.colorRate,
                    calcRate = rate;

                if (rate > maxRate / 2) {
                    calcRate = rate - maxRate / 2;
                }

                var red = 255,
                    green = Math.round((255 / (maxRate / 2)) * calcRate);

                if (rate > maxRate / 2) {
                    red = 255 - green;
                    green = 255;
                }

                element.css('border-left', '10px solid rgb(' + red + ', ' + green + ', 0)');
            }
        };
    });