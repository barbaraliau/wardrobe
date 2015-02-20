var mongoose = require('mongoose')

var brandSchema = mongoose.Schema({
	
		id: {type: Number, unique: true },
		name: {type: String, required: true },
		synonyms: [ String ]
	
})

module.exports = mongoose.model('Brand', brandSchema)

