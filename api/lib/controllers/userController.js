var User = require('../models/userModel');


module.exports = {
	profile: function(req, res) {
		User.findOne({_id: req.user._id}).exec().then(function(user){
			return res.json(user);
		})
	},

	update: function(req, res) {
		console.log(req.body)
		User.findOneAndUpdate({ _id: req.user._id }, 
			{$push: {savedOutfits: req.body}},
			{safe: true, upsert: true},
			function(err, model){
				if(!err){
					return res.status(200).end();
				}
			})
	}




}//end

// {
// 	"metadata":
// 	{
// 		"label":"Brand",
// 		"pluralLabel":"Brands",
// 		"name":"Brand",
// 		"shortName":"b",
// 		"multiSelect":true,
// 		"type":"All"
// 	},
// 	"brands":[
// 		{
// 		"id":"3",
// 		"name":"7 For All Mankind",
// 		"synonyms":[
// 				"For All Mankind",
// 				"Seven7",
// 				"Seven Jeans",
// 				"7 Jeans",
// 				"Seven7 Jeans"
// 			]
// 		},
// 		{"id":"5",
// 		"name":"ABS by Allen Schwartz",
// 		"synonyms":[
// 				"A.B.S.",
// 				"ABS from Allen Schwartz",
// 				"ABS Allen Schwartz",
// 				"A.B.S Silver Label"
// 				]
// 			}