var app = angular.module('wardrobe');

app.controller('SearchController', function(SearchService){
	var searchC = this;

searchC.topStyleChoices = SearchService.topStyleChoices;
searchC.topGenderChoices = SearchService.genderChoices;
searchC.topColorChoices = SearchService.colorChoices;
searchC.topGenderChosen = SearchService.genderChoices[0];


	searchC.searchProducts = function(){
			SearchService.searchProducts(searchC.topStyleChosen, searchC.topGenderChosen, searchC.topColorChosen)
					.then(function(data){
						searchC.products = data;
						console.log(data)
				})
	}

// searchC.brandChoiceOne
// searchC.brandChoiceTwo
// searchC.brandChoiceThree
// searchC.brandChoiceFour
// searchC.brandChoiceFive

})//end