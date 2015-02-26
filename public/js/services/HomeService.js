var app = angular.module('wardrobe');

app.service('HomeService', function($q, $http){
	
	this.logout = function(){
		var dfd = $q.defer();
		$http({
			method: 'GET',
			url: '/api/logout'
		}).then(function(data, err){
			if(!err){
				dfd.resolve(data)
			} else {
				console.log('Logout did not work')
			}
		})
		return dfd.promise
	}

})//end