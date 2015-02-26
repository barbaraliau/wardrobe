var app = angular.module('wardrobe');

app.controller('SearchController-footwear', function(SearchService, $scope){

$scope.footwearStyleChoices = SearchService.footwearStyleChoices;
$scope.footwearGenderChoices = SearchService.genderChoices;
$scope.footwearColorChoices = SearchService.colorChoices;
$scope.footwearGenderChosen = SearchService.genderChoices[0];


	$scope.searchProducts = function(){
		$scope.searchActive = false;
		
		SearchService.getBrandId($scope.brandChoiceOne, $scope.brandChoiceTwo, $scope.brandChoiceThree).then(function(brandArray){
			console.log(brandArray)
			SearchService.searchProducts($scope.footwearStyleChosen, $scope.footwearGenderChosen, $scope.footwearColorChosen, brandArray)
					.then(function(data){
						$scope.products = data;
						console.log(data)
				})
		})	
	}
		$scope.searchActive = false;

$scope.saveItem = function(product) {
		var id = product.id;
		SearchService.saveItem(id)
			.then(function(){
				alert("Item Saved!")
		}).catch(function(error){
			alert('Please login to save')
		})
	
	}

})//end