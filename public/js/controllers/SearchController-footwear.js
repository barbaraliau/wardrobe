var app = angular.module('wardrobe');

app.controller('SearchController-footwear', function(SearchService){
	var searchF = this;

searchF.footwearStyleChoices = SearchService.footwearStyleChoices;
searchF.footwearGenderChoices = SearchService.genderChoices;
searchF.footwearColorChoices = SearchService.colorChoices;
searchF.footwearGenderChosen = SearchService.genderChoices[0];


	searchF.searchProducts = function(){
		SearchService.getBrandId(searchF.brandChoiceOne, searchF.brandChoiceTwo, searchF.brandChoiceThree).then(function(brandArray){
			console.log(brandArray)
			SearchService.searchProducts(searchF.footwearStyleChosen, searchF.footwearGenderChosen, searchF.footwearColorChosen, brandArray)
					.then(function(data){
						searchF.products = data;
						console.log(data)
				})
		})	
	}


})//end