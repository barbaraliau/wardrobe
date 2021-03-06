var app = angular.module('wardrobe');

app.service('SearchService', function($q, $http){

	var searchServ = this;

	searchServ.getBrandId = function(brand1, brand2, brand3) {
		var brandObjArray = { brands: [ brand1, brand2, brand3 ] };
			var dfd = $q.defer()
				$http({
					method: 'POST',
					url: '/api/convert-brand',
					data: brandObjArray
				}).then(function(brandData){
				  console.log(brandData.data.join("&"))
					dfd.resolve(brandData.data.join("&"))
				})
			return dfd.promise	
	}

	searchServ.searchProducts = function(style, gender, color, brands){
		var dfd = $q.defer();
		$http({
			method: 'POST',
			url: '/api/product',
			data: { 
			style: style.name,
			gender: gender,
			color: color.name,
			brand: brands
		}

		}).then(function(data){
			var results = data.data.products;
			dfd.resolve(results);
		})
		return dfd.promise;
	}

	searchServ.saveItem = function(id) {
		var dfd = $q.defer();
		$http({
			method: 'PUT',
			url: '/api/saveItem', 
			data: {
				id: id
			}
		}).then(function(data){
			console.log("Results Saved" + data);
			dfd.resolve();
		}, function(error){
			console.log(error)
			dfd.reject(error)
		})
		return dfd.promise
	}

	searchServ.getBrands = function(val){
		console.log(val)
		return $http({
			method: 'post',
			url: '/api/getBrands',
			data: {
				name: val
			}
		}).then(function(response){
			console.log(response.status)
			return response.status;
		})
	}












	//-----need to get this working. broke it somehow -----//
	//for every product, loop through all the attributes to find description, change it into a string and replace HTML elements.
	// searchServ.replaceHTML = function(data){
		
	// 	for(var key in data){
	// 		// console.log(data[key])
	// 		for(var attribute in data[key]){
	// 			if(attribute === "description"){
	// 				// console.log(data[key][attribute])
	// 				var replaced = data[key][attribute];
	// 				replaced = String(replaced).replace(/<li>/g, "").replace(/<\/li>/g, "").replace(/<ul>/g, "").replace(/<\/ul>/g, "");
	// 				console.log(replaced);
	// 				}
	// 			}
	// 		}
	// 			return data;	
	// }
	


////////////////------drop-down search choices for ng-options------//////////////
	searchServ.topStyleChoices = [[""],
		{ name: "top" },
		{ name: "shirts+tops" },
		{ name: "knits+tees" },
		{ name: "dress+shirt" },
		{ name: "casual+shirt" },
		{ name: "polos" },
		{ name: "suit+jacket"},
		{ name: "blazer" },
		{ name: "jacket" },
		{ name: "sportcoats" },
		{ name: "sweater" },
		{ name: "vest" },
		{ name: "outerwear" },
		{ name: "sleepwear"},
		{ name: "dress" },
		{ name: "cocktail+dress" },
		{ name: "casual+dress" },
	]

	searchServ.bottomStyleChoices = [[""],
		{ name: "jeans" },
		{ name: "pants" },
		{ name: "denim" },
		{ name: "slacks" },
		{ name: "shorts" },
		{ name: "skirt" }
	]

	searchServ.footwearStyleChoices = [[""],
		{ name: "shoes" },
		{ name: "sneakers" },
		{ name: "sandals" },
		{ name: "wedge" },
		{ name: "heels" },
		{ name: "pumps" },
		{ name: "flats" },
		{ name: "loafers"},
		{ name: "oxfords"},
		{ name: "boots" },
		{ name: "flip-flops" },
		{ name: "evening+shoes" }
	]


	searchServ.genderChoices = ["","Women","Men","Unisex"]

	searchServ.colorChoices = [[""],
	{"id":"16","name":"Black"},
	{"id":"15","name":"White"},
	{"id":"14","name":"Gray"},
	{"id":"1","name":"Brown"},
	{"id":"3","name":"Orange"},
	{"id":"4","name":"Yellow"},
	{"id":"7","name":"Red"},
	{"id":"8","name":"Purple"},
	{"id":"10","name":"Blue"},
	{"id":"13","name":"Green"},
	{"id":"17","name":"Pink"},
	{"id":"18","name":"Gold"},
	{"id":"19","name":"Silver"},
	{"id":"20","name":"Beige"}
	]


})