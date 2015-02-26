var app = angular.module('wardrobe');

app.controller('ProfileController', function(authenticate){
	var profileC = this;

	profileC.userData = authenticate;
})