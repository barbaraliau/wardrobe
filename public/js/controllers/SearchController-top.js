var app = angular.module('wardrobe');

app.controller('SearchController-top', function(SearchService, $scope, $timeout){

$scope.topStyleChoices = SearchService.topStyleChoices;
$scope.topGenderChoices = SearchService.genderChoices;
$scope.topColorChoices = SearchService.colorChoices;
$scope.topGenderChosen = SearchService.genderChoices[0];
$scope.topStyleChosen = SearchService.topStyleChoices[0];
$scope.topColorChosen = SearchService.colorChoices[0];

	$scope.searchProducts = function(){
		$scope.searchActive = false;
		$scope.arrow = true;
		$scope.spinningWait = true;
		SearchService.getBrandId($scope.brandChoiceOne, $scope.brandChoiceTwo, $scope.brandChoiceThree).then(function(brandArray){
			console.log(brandArray)
			SearchService.searchProducts($scope.topStyleChosen, $scope.topGenderChosen, $scope.topColorChosen, brandArray)
					.then(function(data){
						console.log(data);
						$scope.spinningWait = false;
							$scope.products = data;	
							noResults();
				})
		})	
	}

	$scope.searchActive = false;	
	$scope.arrow = false;
	$scope.spinningWait = false;


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