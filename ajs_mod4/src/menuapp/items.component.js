(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuapp/templates/menu-items.template.html',
  bindings: { cat: '@', menuitems: '<' }
});

})();
