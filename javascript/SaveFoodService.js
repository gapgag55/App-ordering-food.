app.service('saveFood', [function() {

  var saveFood = this;
  saveFood.order = {};
  saveFood.order.food = [];
  saveFood.order.table = 0;

  saveFood.setTable = function(table) {
    saveFood.order.table = table;
  }

  saveFood.getTable = function(table) {
    return saveFood.order.table;
  }

  saveFood.setFood = function(menu) {
    saveFood.order.food = menu; // $scope.order
  };

  saveFood.getFood = function() {
    return saveFood.order.food;
  }

  // set both object
  saveFood.setFoods = function(order) {
    saveFood.order = order;
  }

  // get both object
  saveFood.getFoods = function() {
    return saveFood.order;
  }



}]);
