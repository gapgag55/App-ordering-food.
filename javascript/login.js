app.controller('LoginCtrl', ['$scope', '$ionicPopup', '$location', '$ionicLoading',
function($scope, $ionicPopup, $location, $ionicLoading) {

    var ref = new Firebase("https://orderfirebase.firebaseio.com");
    if (ref.getAuth()) {
        $location.path('/chooseTable');
    }

    $scope.login = function() {
        var ref = new Firebase("https://orderfirebase.firebaseio.com");

        if ($scope.email == null || $scope.password == null) {
            var alertPopup = $ionicPopup.alert({
                title: 'NOTICE',
                template: 'กรอกข้อมูลให้ครบ'
            });
        } else {
            ref.authWithPassword({
                email: $scope.email,
                password: $scope.password
            }, function(error, authData) {
                if (error) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'NOTICE',
                        template: 'เข้าสู่ระบบไม่สำเร็จ'
                    });
                } else {
                    $ionicLoading.show({
                      templateUrl: 'views/loading.html',
                      duration: 2500
                    });
                    $location.path('/chooseTable');
                }
            });
        }
    }


}]);
