app.controller('MoviesDetailCtrl', function ($scope, $rootScope, MoviesService, $ionicModal, $stateParams, $ionicNavBarDelegate, $ionicSlideBoxDelegate, ContactsService, GlobalService) {
    if ($stateParams.id) {
        var movieId = +$stateParams.id;
        $rootScope.loadingShow();
        MoviesService.getMovieById(movieId).then(function (result) {
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

    $scope.share = function (type) {
        console.log("test", type);
        switch (type) {
            case "twitter" :
                window.plugins.socialsharing.shareViaTwitter('I love this movie!!! ' + $scope.movie.title, null, null, function () {
                    console.log('twitter share successful'), function () {
                        console.log('error no twitter app')
                    }
                });
                break;

            case "email":
                console.log('sharing email');
                $rootScope.loadingShow();
                ContactsService.getContacts().then(function (contacts) {
                    $scope.contacts = contacts;
                    $scope.contactsModal.show();
                    $rootScope.loadingHide();
                });
                break;

            default:
                console.warn('wrong type', type);
                break;
        }
    }

    $ionicModal.fromTemplateUrl('./views/movies/contacts-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.contactsModal = modal;
    });

    $scope.shareOnEmail = function (contact) {
        var message = 'Dear ' + contact.name.familyName + ',\nI love this movie!! <3 ' + $scope.movie.title + '';
        window.plugins.socialsharing.shareViaEmail(
            message, // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
            'Subject',
            [contact.emails[0].value], // TO: must be null or an array
            null, // BCC: must be null or an array
            null, // FILES: can be null, a string, or an array
            function () { // Success callback
                $scope.contactsModal.hide();
            }
        );
    }
});