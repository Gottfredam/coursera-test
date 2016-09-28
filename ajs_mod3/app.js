(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var list = this;

  list.emptyList = function () {
    return list.items.length===0;
  };

  list.countList = function () {
    return list.items.length;
  };
}



NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var nidCtrl = this;
  nidCtrl.searchTerm = "";
  nidCtrl.found = [];
  ctrl.error = false;
  nidCtrl.title = "Found " + nidCtrl.found.length + " matches for your tastes";

 
  nidCtrl.narrow = function () {
    var searchTerm= nidCtrl.searchTerm;
    console.log("search for "+searchTerm );
    if (searchTerm.length==0){
      console.log("no search ");
      ctrl.error = true;
      nidCtrl.found = [];
      return;
    }
    ctrl.error = false;
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (result) {
      nidCtrl.found = [];
      var list = result.data.menu_items;
      for (var i = 0; i < list.length; i++) {
        var item =list[i];
        if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
          console.log(item);
          nidCtrl.found.push(item);
        }
  
      }
      nidCtrl.title = "Found " + nidCtrl.found.length + " matches for your tastes";
    }).catch(function (error) {
      console.log(error);
    })
    ;
  };

  nidCtrl.removeItem = function (itemIndex) {
    nidCtrl.found.splice(itemIndex, 1);
    nidCtrl.title = "Found " + nidCtrl.found.length + " matches for your tastes";
  };
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
 var service = this;

 service.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    })
    return response;
  };

  service.getItems = function () {
    return foundItems;
  };
}






})();

