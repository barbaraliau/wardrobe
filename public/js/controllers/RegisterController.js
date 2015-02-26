var app = angular.module('wardrobe');

app.controller('RegisterController', function(RegisterService, $location){
	var registerC = this;

	registerC.signUp = function(){
		RegisterService.register(registerC.name, registerC.username, registerC.email, registerC.password).then(function(data){
			$location.path('my-outfits/' + data.username);
		}).catch(function(err){
			console.log(err);
		})
	}

})