var mongoose = require('mongoose'),
		bcrypt = require('bcrypt'),
		q = require('q');

var userSchema = mongoose.Schema({
		name: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		age: { type: Number, min: 13 },
		bio: String,
		savedOutfits : [
			{ id: { type: Number } },
			{ created_At: { type: Date, default: Date.now }}
		]

})

//encrypt password
userSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')){
		return next();
	}
	//get salt
	bcrypt.genSalt(12, function(err, salt){
		if(err){
			return next(err);
		}
		//hash password
		bcrypt.hash(user.password, salt, function(err, hash){
			user.password = hash;
			return next();
		});
	});
});

//compare inputted password with hashed password. put it on the schema as a method to call later on wherever model is required
userSchema.methods.comparePassword = function(pass){
	var dfd = q.defer();
	bcrypt.compare(pass, this.password, function(err, isMatch){
		if (err) {
			dfd.reject(err);
		}
		else {
			dfd.resolve(isMatch);
		}
	});
	return dfd.promise;
};

module.exports = mongoose.model('User', userSchema);







