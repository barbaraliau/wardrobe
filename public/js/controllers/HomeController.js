var app = angular.module('wardrobe');

app.controller('HomeController', function(HomeService, $scope, $location){

	$scope.logout = function(){
		HomeService.logout().then(function(){
			alert('Successful logout');
			$location.path('/')
		})
	}

})//end