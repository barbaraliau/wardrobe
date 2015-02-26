var mongoose = require('mongoose');

var savedItemSchema = mongoose.Schema({

	username: { type: mongoose.Schema.Types.ObjectId, required: true},
	id: { type: String, required: true },

})

module.exports = mongoose.model('SaveItem', savedItemSchema);