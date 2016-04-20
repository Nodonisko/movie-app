app.controller('ProfileCtrl', function ($scope, $rootScope, ProfileService) {
    $scope.profile = ProfileService.getProfile();

    $scope.saveProfile = function (profile) {
        console.log(profile);
        ProfileService.setProfile(profile);
    }

    $scope.takeImage = function () {
        navigator.camera.getPicture(function (imageData) {
            $scope.profile.image = "data:image/jpeg;base64," + imageData;
        }, function () {
            console.log('camera error');
        }, {
            quality: 25,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }
});