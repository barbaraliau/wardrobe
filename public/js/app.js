var app = angular.module('wardrobe', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: '../templates/home.html',
		controller: 'HomeController',
		controllerAs: 'homeC'
	})
	.state('login', {
		url: '/login',
		templateUrl: '../templates/login.html',
		controller: 'LoginController',
		controllerAs: 'loginC'
	})
	.state('register', {
		url: '/register',
		templateUrl: '../templates/register.html',
		controller: 'RegisterController',
		controllerAs: 'registerC'
	})
	.state('search', {
		url: '/search',
			views: {
				'search-box': {
	        templateUrl: 'templates/search-searchbox.html',
	        controller: 'SearchController',
	        controllerAs: 'searchC'
	      },
	      'tops': {
	        templateUrl: 'templates/search-tops.html',
	        controller: 'SearchController-top',
	        controllerAs: 'searchC'
	      },
	      'bottoms': {
	        templateUrl: 'templates/search-bottoms.html',
	        controller: 'SearchController-bottoms',
	        controllerAs: 'searchCB'
	      },
	      'footwear': {
	        templateUrl: 'templates/search-footwear.html',
	        controller: 'SearchController-footwear',
	        controllerAs: 'searchF'
	    	}
    	}
		})
	.state('profile', {
		url: '/profile',
		templateUrl: '../templates/profile.html',
		controller: 'ProfileController',
		controllerAs: 'profileC'
	})
		 // each of these sections will have their own view
		//url (profile/details)
		.state('profile.details', {
			url: '/details',
			templateUrl: '../templates/profile-details.html'
		})
			// url will be nested (/profile/saved-outfits)
		.state('profile.saved-outfits', {
			url: '/saved-outfits',
			templateUrl: '../templates/profile-saved-outfits.html'
		})
				//url (/profile/saved-outfits/view/:id)
				.state('profile.saved-outfits.view', {
				url: '/view/:id',
				templateUrl: '../templates/profile-saved-outfits-view.html'
				})
		//url (/profile/orders)
		.state('profile.orders', {
			url: '/orders',
			templateUrl: '../templates/profile-orders.html'
		})
	.state('cart', {
		url: '/cart',
		templateUrl: '../templates/cart.html',
		controller: 'CartController',
		controllerAs: 'cartC'
	})
	.state('results', {
		url: '/results',
		templateUrl: '../templates/results.html',
		controller: 'ResultsController',
		controllerAs: 'resultsC'
		
	})



 


})//end