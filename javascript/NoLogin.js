app.factory('NoLogin', ['$location', function($location) {

  return {
    checkLogin: function() {
      var ref = new Firebase("https://orderfirebase.firebaseio.com/order");
      var auth = ref.getAuth(); // check user login or not

      if (!auth) {
        ref.unauth();
        $location.path('/login');
      }
    }
  }
}]);
