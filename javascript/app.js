var app = angular.module('starter', ['ionic', 'firebase'])

app.run(function($ionicPlatform, $ionicPopup, $timeout) {

  $ionicPlatform.ready(function() {
    if (window.Connection) {
      if (navigator.connection.type == Connection.NONE) {
        var alertPopup = $ionicPopup.alert({
          title: 'ผิดพลาด',
          template: 'ไม่ได้เชื่อมต่ออินเตอร์เน็ต'
        });

        $timeout(function() {
          ionic.Platform.exitApp();
        }, 2000);
      }
    }
  //  ionic.Platform.isFullScreen = true;

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.disableScroll(true);
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
  });
});

app.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

  //$ionicConfigProvider.views.transition("none");

  $stateProvider
    .state('login', {
      cache: false,
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .state('chooseTable', {
      cache: false,
      url: '/chooseTable',
      templateUrl: 'views/chooseTable.html',
      controller: 'chooseTableCtrl'
    })
    .state('category', {
      cache: false,
      url: '/category',
      templateUrl: 'views/category.html',
      controller: 'categoryCtrl',
    })
    .state('order', {
      cache: false,
      url: '/order/:cat',
      templateUrl: 'views/order.html',
      controller: 'NewCtrl',
    })

  $urlRouterProvider.otherwise('/login');
});
