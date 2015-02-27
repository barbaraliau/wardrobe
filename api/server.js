var express = require('express'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		session = require('express-session'),
		passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
		FacebookStrategy = require('passport-facebook').Strategy;

var app = express(),
		port = 7890;

var User = require('./lib/models/userModel'),
		UserController = require('./lib/controllers/userController'),
		AuthController = require('./lib/controllers/authController'),
		ProductController = require('./lib/controllers/productController')

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
passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({ username: username }, function(err, user) {
		if(err) { return done(err); }
		if (!user) {
			return done(null, false, { message: 'Incorrect username' }); 
		}
		user.comparePassword(password).then(function(isMatch){
				if(!isMatch){
					return done(null, false, {message: 'Incorrect password'});
				}
				return done(null, user);
			})
		})
}));


passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user);
	});
});

//---middleware---//
app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
	resave: false,
	saveUninitialized: true,
	secret: '312Rfasjk!@(#fjd2390jkdzzxneALaNGH{+~|'}));
app.use(passport.initialize());
app.use(passport.session());

//--isAuthed--//
var isAuthed = function(req, res, next){
	if(!req.isAuthenticated()){
		return res.status(403).end();
	}
		return next();
		res.redirect('/home')
}

var currentUser = function(req, res){
	return res.status(200).json(req.user);
}


//---endpoints on server----//

//authenticates with LocalStrategy
//creates a user
app.post('/api/auth/register', AuthController.register);

app.post('/api/login',
	passport.authenticate('local'), AuthController.login);

app.get('/api/logout', AuthController.logout);

app.get('/api/profile/:username', isAuthed, UserController.profile);

app.put('/api/saveItem', UserController.update);

//------product searches----//
app.post('/api/getBrands', ProductController.getBrands);

app.post('/api/convert-brand', ProductController.convertBrand);

app.post('/api/getOutfits', ProductController.getOutfits);

app.post('/api/product', ProductController.searchProducts)

//----only need to run when updates are necessary----///
app.post('/api/brands', ProductController.updateAllBrands)
app.get('/api/colors', ProductController.getColors);

//---connections---//
app.listen(port, function(){
	console.log('Listening on port ' + port);
})

mongoose.connect('mongodb://localhost/wardrobe');