app.controller('categoryCtrl', [
  '$scope',
  'NoLogin',
  '$firebaseArray',
  '$ionicHistory',
  '$ionicLoading',
  function($scope, NoLogin, $firebaseArray, $ionicHistory, $ionicLoading) {

    // checkLogin
    NoLogin.checkLogin();

    $ionicLoading.show({
      templateUrl: 'views/loading.html',
    });

    var setting = new Firebase("https://orderfirebase.firebaseio.com/setting/");
    var getCat = $firebaseArray(setting.child("cat"));


    $scope.listCat = [];
    getCat.$loaded().then(function(objCat) {
      angular.forEach(objCat, function(catArr) {
        $scope.listCat.push(catArr.$value);
      });
      $ionicLoading.hide();
    });

    // GoBack
    $scope.goBack = function() {
      $ionicHistory.goBack();
    }

}]);
