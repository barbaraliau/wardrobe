var app = angular.module('wardrobe');

app.controller('LoginController', function(LoginService, $location, $scope){
	var loginC = this;

	loginC.errorUser= false;
	loginC.errorPassword = false;

	loginC.login = function(){
		LoginService.login(loginC.username, loginC.password).then(function(){
			console.log('logged in')
		}).catch(function(err){
			if(err.status === 401) {
				loginC.errorUser = true;
				loginC.username = "";
				loginC.password = "";
			}		
		})
	}

})//end