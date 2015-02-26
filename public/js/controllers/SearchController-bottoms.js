var app = angular.module('wardrobe');

app.controller('SearchController-bottoms', function(SearchService, $scope){

$scope.bottomStyleChoices = SearchService.bottomStyleChoices;
$scope.bottomGenderChoices = SearchService.genderChoices;
$scope.bottomColorChoices = SearchService.colorChoices;
$scope.bottomGenderChosen = SearchService.genderChoices[0];


	$scope.searchProducts = function(){
		$scope.searchActive = false;
		
		SearchService.getBrandId($scope.brandChoiceOne, $scope.brandChoiceTwo, $scope.brandChoiceThree).then(function(brandArray){
			console.log(brandArray)
			SearchService.searchProducts($scope.bottomStyleChosen, $scope.bottomGenderChosen, $scope.bottomColorChosen, brandArray)
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