app.factory("NoLogin",["$location",function(o){return{checkLogin:function(){var e=new Firebase("https://orderfirebase.firebaseio.com/order"),n=e.getAuth();n||(e.unauth(),o.path("/login"))}}}]);