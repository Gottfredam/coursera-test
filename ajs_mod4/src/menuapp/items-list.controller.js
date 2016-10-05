(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsListController', ItemsListController);


ItemsListController.$inject = ['MenuDataService', 'catInfo'];
function ItemsListController(MenuDataService, catInfo) {
  var menuItems = this;
  menuItems.items = catInfo.menu_items;
  menuItems.nb = catInfo.menu_items.length;
  menuItems.name= catInfo.category.name; 
  menuItems.short_name= catInfo.category.short_name; 
  menuItems.special_instructions= catInfo.category.special_instructions;
}

})();
