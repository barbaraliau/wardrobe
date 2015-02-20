var app = angular.module('wardrobe');

app.controller('SearchController', function(SearchService){
	var searchC = this;

searchC.topStyleChoices = SearchService.topStyleChoices;
searchC.topGenderChoices = SearchService.genderChoices;
searchC.topColorChoices = SearchService.colorChoices;
searchC.topGenderChosen = SearchService.genderChoices[0];


	searchC.searchProducts = function(){
		//run getBrandIds. pass into searchProducts
			SearchService.searchProducts(searchC.topStyleChosen, searchC.topGenderChosen, searchC.topColorChosen, searchC.brandChoiceOne)
					.then(function(data){
						searchC.products = data;
						console.log(data)
				})
	}


	searchC.test = function(){
		SearchService.getBrandId("J.Crew", "Polo Ralph Lauren")
	};


})//end