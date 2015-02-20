var app = angular.module('wardrobe');

app.controller('SearchController-top', function(SearchService){
	var searchC = this;

searchC.topStyleChoices = SearchService.topStyleChoices;
searchC.topGenderChoices = SearchService.genderChoices;
searchC.topColorChoices = SearchService.colorChoices;
searchC.topGenderChosen = SearchService.genderChoices[0];


	searchC.searchProducts = function(){
		SearchService.getBrandId(searchC.brandChoiceOne, searchC.brandChoiceTwo, searchC.brandChoiceThree).then(function(brandArray){
			console.log(brandArray)
			SearchService.searchProducts(searchC.topStyleChosen, searchC.topGenderChosen, searchC.topColorChosen, brandArray)
					.then(function(data){
						if(data !== []){
							searchC.products = data;
							console.log(data)
						} else if (data === []){
							searchC.error = "No results found. Please modify your search."
						}
				})
		})	
	}


})//end