var app = angular.module('wardrobe', ['ui.router', 'ui.bootstrap', 'infinite-scroll']);


app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: '../templates/home.html',
		controller: 'HomeController',
		controllerAs: 'homeC'
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
	      'tops': {
	        templateUrl: 'templates/search-tops.html',
	        controller: 'SearchController-top'
	      },
	      'bottoms': {
	        templateUrl: 'templates/search-bottoms.html',
	        controller: 'SearchController-bottoms'
	      },
	      'footwear': {
	        templateUrl: 'templates/search-footwear.html',
	        controller: 'SearchController-footwear'
	    	}
    	}
		})
	.state('my-outfits', {
		url: '/my-outfits/:username',
		templateUrl: '../templates/my-outfits.html',
		controller: 'OutfitsController',
		controllerAs: 'outfitsC',
		resolve: {
			authenticate: function($stateParams, LoginService){
				return LoginService.getUserInfo($stateParams)
				}
			}
	})
		//url (profile/:username/profile)
		.state('my-outfits.profile', {
			url: '/profile',
			templateUrl: '../templates/my-outfits-profile.html',
			controller: 'ProfileController',
			controllerAs: 'profileC',
			resolve: {
				authenticate: function($stateParams, LoginService) {
					return LoginService.getUserInfo($stateParams.current)
				}
			}
		})


})//end

app.factory('myHttpInterceptor', function($q, $location){
	return {
		responseError: function(rejection) {
			if (rejection.status === 401) {
				$location.path('/login');
				return;
			}
			return $q.reject(rejection);
		}
	}
})


