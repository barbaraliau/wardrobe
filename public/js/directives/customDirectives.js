var app = angular.module('wardrobe');

app.directive('displaySearchResults', function(){
	return {
		restrict: 'E',
		templateUrl: '../js/directives/search-results.html'	
}


app.directive('hideSearchForm', function(){
	return {
		restrict: 'EA',
		template: '<i class="fa fa-search" ng-click="searchActive = !searchActive" ng-class="{ active: searchActive }"></i>'
	}
})





})//end