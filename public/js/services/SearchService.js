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
			dfd.resolve(results)
		})
		return dfd.promise;
	}
	
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
	// 			return replaced;	
	// }
	


	searchServ.topStyleChoices = [
		{ name: "dress" },
		{ name: "cocktail+dress" },
		{ name: "casual+dress" },
		{ name: "jacket" },
		{ name: "top" },
		{ name: "suit+jacket"},
		{ name: "blazer" },
		{ name: "shirts+tops" },
		{ name: "knits+tees" },
		{ name: "dress+shirt" },
		{ name: "casual+shirt" },
		{ name: "polos" },
		{ name: "sportcoats" },
		{ name: "sweatshirt" },
		{ name: "vest" },
		{ name: "outerwear" },
		{ name: "sleepwear"}
	]

	searchServ.bottomStyleChoices = [
		{ name: "jeans" },
		{ name: "pants" },
		{ name: "denim" },
		{ name: "slacks" },
		{ name: "shorts" },
		{ name: "skirt" }
	]

	searchServ.footwearStyleChoices = [
		{ name: "shoes" },
		{ name: "sneakers" },
		{ name: "sandals" },
		{ name: "wedges" },
		{ name: "pumps+heels" },
		{ name: "flats" },
		{ name: "loafers+oxfords" },
		{ name: "boots" },
		{ name: "flip-flops" },
		{ name: "evening+shoes" },
	]


	searchServ.genderChoices = ["","Women","Men","Unisex"]

	searchServ.colorChoices = [
	{"id":"1","name":"Brown"},
	{"id":"3","name":"Orange"},
	{"id":"4","name":"Yellow"},
	{"id":"7","name":"Red"},
	{"id":"8","name":"Purple"},
	{"id":"10","name":"Blue"},
	{"id":"13","name":"Green"},
	{"id":"14","name":"Gray"},
	{"id":"15","name":"White"},
	{"id":"16","name":"Black"},
	{"id":"17","name":"Pink"},
	{"id":"18","name":"Gold"},
	{"id":"19","name":"Silver"},
	{"id":"20","name":"Beige"}
	]


})