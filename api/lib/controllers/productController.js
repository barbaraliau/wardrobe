var Brand = require('../models/brandsModel'),
		request = require('request'),
		q = require('q')

module.exports = {

	convertBrand: function(req, res){
		Brand.find({name: { $in: req.body.brands}}, function(err, response){
			var brandArray = [];
			if(!err){
				for (var i = 0; i < response.length; i++) {
					brandArray.push("fl=b"+response[i].id)
				};
			}
			// console.log(brandArray);
			res.status(200).json(brandArray)
		})
	},

	getOutfits: function(req, res){
		var url = 'http://api.shopstyle.com/api/v2/products/' +
		req.body["id"] + 
		'?pid=uid2500-26740550-52'

		request(url, function(error, response, body){
			console.log(url)
			if(!error && response.statusCode == 200){
				return res.send(body).end();
			}
		})

	},

	searchProducts: function(req, res){
		var urlRequest = 'http://api.shopstyle.com/api/v2/products?pid=uid2500-26740550-52&fts=' 
		+ req.body.style + '+' 
		+ req.body.gender + '+' 
		+ req.body.color + '&' 
		+ req.body.brand 
		+'&offset=0';
		console.log(urlRequest);

		request(urlRequest, function(error, response, body){
			if(!error && response.statusCode == 200){
				return res.send(body).end();
			}
		})
	},

	updateAllBrands: function(req, res){
		getAllBrands().then(function(results){
			var brands = (JSON.parse(results).brands)
			for(var i = 0; i < brands.length; i++){
					var newBrand = new Brand(brands[i]);
					newBrand.save(function(err, brand){
						if(err){
							return res.status(500).end();
						}
						return res.status(200);
					})
				}
			})

				var getAllBrands = function(){
				var dfd = q.defer()
				request('http://api.shopstyle.com/api/v2/brands?pid=uid2500-26740550-52', function(error, response, body){
					if(!error && response.statusCode == 200){
						dfd.resolve(body)
					}
				})
				return dfd.promise
			}
		},

	getColors: function(req, res){
		request('http://api.shopstyle.com/api/v2/colors?pid=uid2500-26740550-52', function(error, response, body){
			if(!error && response.statusCode == 200){
				return res.send(body)
			}
		})
	}


};
