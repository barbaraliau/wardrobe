var express = require('express'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		session = require('express-session')
		passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
		FacebookStrategy = require('passport-facebook').Strategy

var app = express(),
		port = 7890;

var User = require('./lib/models/userModel')

//---middleware---//
app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//---passport facebook--//
// passport.use(new FacebookStrategy({
// 		clientID: '',
// 		clientSecret: '',
// 		callbackURL: ''
// 	},
// 	function(accessToken, refreshToken, profile, done){
// 		User.findOrCreate(..., function(err, user){
// 			if(err) { return done(err); }
// 			done(null, user);
// 		})
// 	}
// ))

//----passport local----//




//---endpoints on server----//

app.post('/api/user', function(req, res){
	//create user
})
app.get('/api/user/:id', function(req, res){
	//retrieves user
})



//---connections---//
app.listen(port, function(){
	console.log('Listening on port ' + port);
})

mongoose.connect('mongodb://localhost/wardrobe');