var app = angular.module('wardrobe');

app.controller('SearchController-bottoms', function(SearchService, $scope){

$scope.bottomStyleChoices = SearchService.bottomStyleChoices;
$scope.bottomGenderChoices = SearchService.genderChoices;
$scope.bottomColorChoices = SearchService.colorChoices;
$scope.bottomGenderChosen = SearchService.genderChoices[0];


	$scope.searchProducts = function(){
		$scope.searchActive = false;
		$scope.spinningWait = true;
		SearchService.getBrandId($scope.brandChoiceOne, $scope.brandChoiceTwo, $scope.brandChoiceThree).then(function(brandArray){
			console.log(brandArray)
			SearchService.searchProducts($scope.bottomStyleChosen, $scope.bottomGenderChosen, $scope.bottomColorChosen, brandArray)
					.then(function(data){
						console.log(data)
						$scope.spinningWait = false;
						$scope.products = data;
						noResults();
				})
		})	
	}
		$scope.searchActive = false;
		$scope.spinningWait = false;

$scope.saveItem = function(product) {
		var id = product.id;
		SearchService.saveItem(id)
			.then(function(){
				alert("Item Saved!")
		}).catch(function(error){
			alert('Please login to save')
		})
	
	}

$scope.getBrands = function(val){
		$scope.foundBrand = false;
		if(val.length > 0) {
			SearchService.getBrands(val).then(function(res){
				//console.log(res)
				if(res === 404) {
					$scope.foundBrand = false;
				} 
				else if (res === 200) {
					$scope.foundBrand = true;
				}
			})
		}
		else if (val.length === 0) 
			{ $scope.foundBrand = false; }
	
	}

	var noResults = function() {
			$scope.noResults = false;
		if($scope.products.length === 0) {
			$scope.noResults = true;
			$timeout(function(){
				$scope.noResults = false;
			}, 3000);
		}
	}

})//end