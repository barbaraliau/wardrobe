
var app = angular.module('wardrobe');

app.service('LoginService', function($q, $http, $location, $stateParams){

	var userinfo;

	this.login = function(username, password){
		return $http({
			method: 'POST',
			url: '/api/login',
			data: {
				username: username,
				password: password
			}
		}).success(function(data, status){
			console.log(data)
			console.log('Successful login');
			console.log('status = ' + status);
			$location.path('/my-outfits/' + data.username);

		})
		.error(function(error){
			console.log('Error: ' + error);
		})
	};	

	this.getUserInfo = function(username) {
		var dfd = $q.defer();
		$http({
			method: 'GET',
			url: '/api/profile/' + username
		}).then(function(data){
			console.log(data.data);
				dfd.resolve(data.data)
		}).catch(function(err){
			console.log('unauthorized')
			alert('You must be logged in to view your outfits')
			dfd.reject(err);
		})
		return dfd.promise
	}



})//end