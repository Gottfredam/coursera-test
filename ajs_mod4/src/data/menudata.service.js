(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('baseUrl', "https://davids-restaurant.herokuapp.com/");


MenuDataService.$inject = ['$http', 'baseUrl'];
function MenuDataService($http, baseUrl) {
  var service = this;

  service.getAllCategories = function() {
    var foundItems = [];
    return $http.get(baseUrl + "categories.json")
    .then(function(response) {
      foundItems=response.data;
     return foundItems;
    }).catch(function (error) {
      console.log("MenuDataService.getAllCategories:"+error);
    })
    ;
  }

  service.getItemsForCategory = function(categoryShortName) {
    //var foundItems = [];
    var menuCat;
    return $http.get(baseUrl + "menu_items.json?category="+categoryShortName)
    .then(function(response) {
      //foundItems=response.data.menu_items;
      //return foundItems;
      menuCat=response.data;
      return menuCat;
    }).catch(function (error) {
      console.log("MenuDataService.getItemsForCategory("+categoryShortName+"):"+error);
    })
    ;
  }
  
  


};


})();
