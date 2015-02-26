var app = angular.module('wardrobe');

app.controller('SearchController-top', function(SearchService, $scope){

$scope.topStyleChoices = SearchService.topStyleChoices;
$scope.topGenderChoices = SearchService.genderChoices;
$scope.topColorChoices = SearchService.colorChoices;
$scope.topGenderChosen = SearchService.genderChoices[0];

	$scope.searchProducts = function(){
		$scope.searchActive = false;
		SearchService.getBrandId($scope.brandChoiceOne, $scope.brandChoiceTwo, $scope.brandChoiceThree).then(function(brandArray){
			console.log(brandArray)
			SearchService.searchProducts($scope.topStyleChosen, $scope.topGenderChosen, $scope.topColorChosen, brandArray)
					.then(function(data){
						console.log(data);
							$scope.products = data;	
				})
		})	
	}

	$scope.searchActive = false;	


	//get ID 

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