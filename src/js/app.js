angular.module('and', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state('home', {url: '/', templateUrl: 'views/home.html', controller: 'mainController'})

		.state('add', {url: '/add', templateUrl: 'views/add.html', controller: 'addController'})

		.state('business', {url: '/:biz', templateUrl: 'views/business.html', controller: 'mainController'});

	$urlRouterProvider.otherwise('/');

}])

.factory('database', ['$http', function($http) {

	var factory = {};

	factory.findBusiness = function() {
		return $http.get('http://127.0.0.1:3000/business').success(function(callback) {
			return callback;
		}).error(function(callback) {
			return callback;
		});
	}

	factory.addBusiness = function(data) {
		return $http.post('http://127.0.0.1:3000/business', data).success(function(callback) {
			return callback;
		}).error(function(callback) {
			return callback;
		});
	}

	factory.removeBusiness = function(biz) {
		return $http.delete('http://127.0.0.1:3000/business/' + biz).success(function(callback) {
			return callback;
		}).error(function(callback) {
			return callback;
		});
	}

	return factory; 

}])

.controller('mainController', ['$scope', '$state', '$stateParams', 'database', function($scope, $state, $stateParams, database) {

	database.findBusiness().then(function(callback) {
		console.log(callback);
		$scope.business = callback.data;
	});

	$scope.biz = $stateParams.biz;

	$scope.removeBiz = function(biz) {
	
		var delBiz = confirm("Are your sure?");
		if (delBiz == true) {
			
			database.removeBusiness(biz).then(function(callback) {
				console.log(callback);
				console.log("Business deleted!");
			});

			$state.go("home");

		} else {
			console.log("Cancelled.");
		}
	}

}])

.controller('addController', ['$scope', 'database', function($scope, database) {

	$scope.addNew = function(_name, _industry, _website, _logo) {

		var newBiz = {name: _name, industry: _industry, website: _website, logo: _logo};
		
		database.addBusiness(newBiz).then(function(callback) {
			console.log(callback);
			if (callback.statusText === "OK") {
				console.log("New business added!");
			} else {
				console.log("Something went wrong.");
			}		
		});
	}
	
}]);