module.exports = {
	profile: function(req, res){
		return res.json(req.user);
	}
};

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