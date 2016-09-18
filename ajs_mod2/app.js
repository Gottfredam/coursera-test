(function () {
'use strict';

var initItemList = [
 { name: "Cookies", quantity: 10 }
,{ name: "Bottle of milk", quantity: 2 }
,{ name: "Marshmallow", quantity: 15 }
,{ name: "Cake", quantity: 3 }
,{ name: "Chocolate cake", quantity: 1 }
,{ name: "Brownies", quantity: 5 }
];

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getToBuyItems();

  showList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }

  showList.isEmpty = function () {
    return showList.items.length == 0;
  };
}


AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getBoughtItems();

  showList.toBuyAgainItem = function (itemIndex) {
    ShoppingListCheckOffService.toBuyAgainItem(itemIndex);
  };

  showList.isEmpty = function () {
    return showList.items.length == 0;
  };
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = initItemList;
  var boughtItems = [];

  service.buyItem = function (itemIdex) {
    var removed = toBuyItems.splice(itemIdex, 1);
    boughtItems.push(removed[0]);
  };

  service.toBuyAgainItem = function (itemIdex) {
    var removed = boughtItems.splice(itemIdex, 1);
    toBuyItems.push(removed[0]);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };
  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();

