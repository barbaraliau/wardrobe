var app = angular.module('wardrobe');

app.service('RegisterService', function($q, $http){

this.register = function(name, username, email, password){
		var dfd = $q.defer();
		$http({
			method: 'POST',
			url: '/api/auth/register',
			data: {
				name: name,
				username: username,
				email: email,
				password: password
			}
		}).then(function(response){
			dfd.resolve(response.data);
		}).catch(function(err){
			console.log(err)
			if(err.status === 11000) {
				alert('That username is already taken. Please choose another')
			}
		})
		return dfd.promise;
	}

})