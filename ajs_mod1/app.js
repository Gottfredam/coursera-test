(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope) {
  $scope.checkedLunch = "";

  $scope.checkLunch = function () {
  	$scope.checked=true;
  	var lunch = $scope.lunch;
  	if (typeof lunch !== 'undefined'){
	  	lunch = lunch.trim();
	  	//empty string
	  	if (lunch.length ==0) {
	  		$scope.checkedClass = "red";
	  		$scope.checkedLunch = "Please enter data first";
	  	} else {
		  	var arrayOfStrings = lunch.split(",");
		  	var items=0;
		  	for (var i = 0; i < arrayOfStrings.length; i++) {
		  		//check if the string is empty not emty =1 ortherwise 0
		  		var count = arrayOfStrings[i].trim().length>0 ? 1 : 0;
		  		// add it to the count
		  		items+=count;
		  	}
		  	// check if too much
		  	if ( items<=3){
			  	$scope.checkedLunch = "Enjoy!";
		  	} else {
			  	$scope.checkedLunch = "Too much!";
		  	}
		  	//change color
		  	$scope.checkedClass = "green";
	  	}
	} else{
		//string to define => error
		$scope.checkedClass = "red";
	  	$scope.checkedLunch = "Please enter data first";
  	}
    
  };
}


})();
