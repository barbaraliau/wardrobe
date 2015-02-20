var app = angular.module('wardrobe');

app.service('RegisterService', function($q, $http){

this.register = function(name, username, email, password){
		var dfd = $q.defer();
		$http({
			method: 'POST',
			url: '/api/register',
			data: {
				name: name,
				username: username,
				email: email,
				password: password
			}
		}).then(function(response){
			dfd.resolve(response.data);
		})
		return dfd.promise;
	}

})