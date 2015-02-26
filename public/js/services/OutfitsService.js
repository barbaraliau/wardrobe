var app = angular.module('wardrobe');

app.service('OutfitsService', function($q, $http){

	this.getOutfits = function(outfitId){
	//get individual ids and make http calls with them
		var dfd = $q.defer();
		$http({
			method: 'POST',
			url: '/api/getOutfits',
			data: outfitId
		}).then(function(res){
			console.log(res.data)
			dfd.resolve(res.data)
		})
		return dfd.promise;
}



})//end