app.controller('NewCtrl', [
  '$timeout',
  '$window',
  '$scope',
  '$state',
  '$ionicPopup',
  '$firebaseArray',
  '$firebaseObject',
  '$location',
  '$ionicPopup',
  'NoLogin',
  'saveFood',
  '$stateParams',
  '$ionicLoading',
  '$ionicHistory',
  function($timeout, $window, $scope, $state, $ionicPopup, $firebaseArray, $firebaseObject, $location,
    $ionicPopup, NoLogin, saveFood, $stateParams, $ionicLoading, $ionicHistory) {

    // checkLogin
    NoLogin.checkLogin();
    var ref = new Firebase("https://orderfirebase.firebaseio.com/order");

    //== Loop Food ===========================================

    $ionicLoading.show({
      templateUrl: 'views/loading.html',
    });

    var foods = new Firebase("https://orderfirebase.firebaseio.com/foods");
    if ($stateParams.cat) {
      $scope.listfoods = $firebaseArray(foods.orderByChild("cat").equalTo($stateParams.cat)); // set for loop and serch
    }


    // GoBack
    $scope.goBack = function() {
      $ionicHistory.goBack();
    }

    var foo = saveFood.getFood();
    console.log(foo);

    if ($scope.listfoods) {
      $scope.listfoods.$loaded().then(function(listfood) {
        angular.forEach(listfood, function(food) {
          angular.forEach(foo, function(data) {
            if (data.name == food.name) {
              food.id = true;
            }
          });
        });
        $ionicLoading.hide();
      });
    }

    //== ORDER ===============================================

    $scope.order = saveFood.getFoods();

    // เก็บอาหารที่ถูก Check ไว้ใน Service
    $scope.addfood = function(check, foodName, foodPrice) {

      if (saveFood.getFood()) {
        $scope.order.food = saveFood.getFood(); // เรียกอาหารที่ save ไว้ออกมา เพื่อเพิ่ม
      } else {
        $scope.order.food = [];
      }

      if (check) {

        $scope.amount = {};
        $scope.amount.count = 1;
        var amount;

        // ให้ user กรอกจำนวนอาหาร A ที่สั่ง
        var myPopup = $ionicPopup.show({
          template: '<input type="number" ng-model="amount.count" class="input">',
          title: 'ระบุจำนวนสั่ง',
          scope: $scope,
          buttons: [{
            text: 'ยกเลิก'
          }, {
            text: '<b>ตกลง</b>',
            type: 'button-positive',
            onTap: function(e) {
              amount = $scope.amount.count;
            }
          }]
        });

        // เมื่อ popup ทำงานเสร็จแล้วให้เพิ่ม Array
        myPopup.then(function(res) {
          $scope.order.food.push({
            name: foodName,
            price: foodPrice,
            amount: amount
          });
        });


      } else {
        // remove when false
        var index = $scope.order.food.indexOf(foodName);
        $scope.order.food.splice(index, 1);
      }

      saveFood.setFood($scope.order.food); // save อาหารไว้
    }

    $scope.add = function() {
      $scope.order.table = saveFood.getTable();

      if ($scope.order.table != 0 && saveFood.getFood().length != 0) {

        $scope.order = saveFood.getFoods(); // เรียก Object ที่ save ไว้ออกมาทั้งหมด
        // แปลง Array เป็น Text
        var text = "";
        var count = 1;

        // รวมเงินทั้งหมด
        var paid = 0;

        angular.forEach($scope.order.food, function(food) {
          text = text + count + ". " + food.name + "<br/>";
          count = count + 1;

          if(food.amount > 1){
            var price  = parseInt(food.price) * parseInt(food.amount);
            paid = paid + price;
          }else{
            paid = paid + parseInt(food.price);
          }

        })

        var confirmPopup = $ionicPopup.confirm({
          title: 'รายการสั่ง',
          subTitle: 'โต๊ะ: ' + $scope.order.table + ' ราคารวม: ' + paid + ' บาท',
          template: text
        });

        confirmPopup.then(function(res) {
          if (res) {
            var mem = new Firebase("https://orderfirebase.firebaseio.com/member");
            var member = $firebaseArray(mem);

            member.$loaded().then(function(member) {
              angular.forEach(member, function(value, key) {

                if (ref.getAuth().password.email == member[key].email) {
                  $scope.order.fullname = member[key].name.toString() + " " + member[key].lastname.toString();

                  var Create = ref.push();
                  var postID = Create.key();
                  $scope.order.id = postID;

                  Create.set($scope.order);
                }
              });
            });


            var alertPopup = $ionicPopup.alert({
              title: 'SUCCESS',
              template: 'สั่งอาหารเรียบร้อย'
            });

            $timeout(function() {

              // Reset All
              $scope.order = {};
              saveFood.setFoods($scope.order);
              saveFood.setFood([]);
              saveFood.setTable(0);

              $location.path('/chooseTable');
            }, 1000);
          } else {
            console.log('ยกเลิก');
            text = "";
          }
        });


      } else if ($scope.order.table == null && $scope.order.food.length == 0) { // ==================== Start add new

        var alertPopup = $ionicPopup.alert({
          title: 'NOTICE',
          template: 'โปรดใส่เลขโต๊ะ และ เลือกอาหาร'
        });

      } else if (saveFood.getFood().length == 0) {
        var alertPopup = $ionicPopup.alert({
          title: 'NOTICE',
          template: 'โปรดเลือกอาหาร'
        });

      } else if (!saveFood.getTable()) {
        var alertPopup = $ionicPopup.alert({
          title: 'NOTICE',
          template: 'โปรดใส่เลขโต๊ะ'
        }); // ===================== Finish add new
      } else {
        console.log("Error");
      }
    }

  }
]);
