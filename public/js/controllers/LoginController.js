var app = angular.module('wardrobe');

app.controller('LoginController', function(LoginService, $location){
	var loginC = this;

	loginC.error = false;

	loginC.login = function(){
		LoginService.login(loginC.username, loginC.password).then(function(){
			$location.path('/search');
		}).catch(function(err){
			console.log(err);
			loginC.error = true;
			loginC.password = "";
		})
	}

})//end