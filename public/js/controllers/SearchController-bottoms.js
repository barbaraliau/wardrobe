var app = angular.module('wardrobe');

app.controller('SearchController-bottoms', function(SearchService){
	var searchCB = this;

searchCB.bottomStyleChoices = SearchService.bottomStyleChoices;
searchCB.bottomGenderChoices = SearchService.genderChoices;
searchCB.bottomColorChoices = SearchService.colorChoices;
searchCB.bottomGenderChosen = SearchService.genderChoices[0];


	searchCB.searchProducts = function(){
		SearchService.getBrandId(searchCB.brandChoiceOne, searchCB.brandChoiceTwo, searchCB.brandChoiceThree).then(function(brandArray){
			console.log(brandArray)
			SearchService.searchProducts(searchCB.bottomStyleChosen, searchCB.bottomGenderChosen, searchCB.bottomColorChosen, brandArray)
					.then(function(data){
						searchCB.products = data;
						console.log(data)
				})
		})	
	}


})//end