var app = angular.module('wardrobe');

app.controller('OutfitsController', function(authenticate, OutfitsService, $q){
	var outfitsC = this;

	outfitsC.userData = authenticate;
	outfitsC.showInfo = false;

	outfitsC.getOutfits = function(){
		var outfitsArray = outfitsC.userData.savedOutfits
		var displayOutfits = [];
			for (var i = 0; i < outfitsArray.length; i++) {
				OutfitsService.getOutfits(outfitsArray[i]).then(function(data){
					displayOutfits.push(data);
				})
			};
			outfitsC.displayAllOutfits = displayOutfits;
		}

	outfitsC.getOutfits()



})//end