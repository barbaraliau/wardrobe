var express = require('express'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		session = require('express-session'),
		passport = require('passport'),
		request = require('request'),
		q = require('q'),
		LocalStrategy = require('passport-local').Strategy,
		FacebookStrategy = require('passport-facebook').Strategy;

var app = express(),
		port = 7890;

var User = require('./lib/models/userModel'),
		UserController = require('./lib/controllers/userController'),
		Brand = require('./lib/models/brandsModel')

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

app.post('/api/register', function(req, res){
	//create user
	var newUser = new User(req.body);
	newUser.save(function(err, user){
		if(err){
			console.log(err);
			var error = err.code;
			return res.send(error).end();
		} else {
			req.logIn(user, function(err){
				if(!err){
					res.status(200).send(user)
				}
			})
		}
	})
});

app.post('/api/login',
	passport.authenticate('local'),
	function(req, res) {
		var userInfo = { name: req.user.name, username: req.user.username, email: req.user.email };
		res.send(userInfo)
	}      

)

app.get('/api/logout', function(req, res){
	req.logout();
	res.redirect('/')
})


app.get('/api/profile/:username', isAuthed, UserController.profile);

app.put('/api/saveItem', UserController.update);

//------product searches----//

app.post('/api/convert-brand', function(req, res){
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
})

app.post('/api/getOutfits', function(req, res){
	var url = 'http://api.shopstyle.com/api/v2/products/' +
	req.body["id"] + 
	'?pid=uid2500-26740550-52'

	request(url, function(error, response, body){
		console.log(url)
		if(!error && response.statusCode == 200){
			return res.send(body).end();
		}
	})

})

app.post('/api/product', function(req, res){

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
})

//----only need to run when updates are necessary----///
app.post('/api/brands', function(req, res){
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

app.get('/api/colors', function(req, res){
	request('http://api.shopstyle.com/api/v2/colors?pid=uid2500-26740550-52', function(error, response, body){
		if(!error && response.statusCode == 200){
			return res.send(body)
		}
	})
})

//---connections---//
app.listen(port, function(){
	console.log('Listening on port ' + port);
})

mongoose.connect('mongodb://localhost/wardrobe');