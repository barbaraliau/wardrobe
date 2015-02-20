var app = angular.module('wardrobe');

app.service('LoginService', function($q, $http){

	this.login = function(username, password){
		var dfd = $q.defer();
		$http({
			method: 'POST',
			url: '/api/login',
			data: {
				username: username,
				password: password
			}
		}).then(function(response){
			dfd.resolve(response.data);
		}).catch(function(err){
			console.log("Error Logging In");
			dfd.reject(err);
		})
		return dfd.promise;
	};	



})//end