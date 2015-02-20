var app = angular.module('wardrobe');

app.controller('RegisterController', function(RegisterService, $location){
	var registerC = this;

	registerC.signUp = function(){
		RegisterService.register(registerC.name, registerC.username, registerC.email, registerC.password).then(function(){
			$location.path('/profile');
		}).catch(function(err){
			console.log(err);
		})
	}

})