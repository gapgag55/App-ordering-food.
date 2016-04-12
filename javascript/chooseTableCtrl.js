app.controller('chooseTableCtrl', [ '$scope',  'NoLogin', 'saveFood', '$ionicLoading', '$location', '$firebaseObject',
  function($scope,  NoLogin, saveFood, $ionicLoading, $location, $firebaseObject) {

    $ionicLoading.show({
      templateUrl: 'views/loading.html',
    });


    var sets = new Firebase("https://orderfirebase.firebaseio.com/setting");
    var num = $firebaseObject(sets);

    $scope.nums = [];

    num.$loaded().then(function(num) {
      for (var i = 1; i <= num.table; i++) {
        $scope.nums.push(i);
      }
      $ionicLoading.hide();
    });


    // กำหนด table ใน saveFood
    $scope.addTable = function(table) {
      saveFood.setTable(table);
      $location.path('/category');
    }

}]);
