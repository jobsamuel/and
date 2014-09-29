angular.module('and', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state('home', {url: '/', templateUrl: 'views/home.html', controller: 'mainController'})

		.state('add', {url: '/add', templateUrl: 'views/add.html', controller: 'addController'})

		.state('business', {url: '/:biz', templateUrl: 'views/business.html', controller: 'mainController'})

		.state('edit', {url: '/:biz/edit', templateUrl: 'views/edit.html', controller: 'editController'});

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

	factory.editBusiness = function(biz, data) {
		return $http.put('http://127.0.0.1:3000/business/' + biz, data).success(function(callback) {
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
		if (callback.statusText === "OK") {
			$scope.business = callback.data;
			console.log("Business fetched!");
		} else {
			console.log("Something went wrong.");
		}
	});

	$scope.biz = $stateParams.biz;

	$scope.removeBiz = function(biz) {

		var delBiz = confirm("Are your sure?");
		if (delBiz == true) {
			
			database.removeBusiness(biz).then(function(callback) {
				if (callback.statusText === "OK") {
					$state.transitionTo($state.current, $stateParams, {
					    reload: true,
					    inherit: false,
					    notify: true
					});
					console.log("Business deleted!");
				} else {
					console.log("Something went wrong.");
				}	

			});

		} else {
			console.log("Operation cancelled.");
		}
	}

}])

.controller('addController', ['$scope', '$state', 'database', function($scope, $state, database) {

	$scope.addNew = function(_name, _industry, _website, _logo) {

		var newBiz = {name: _name, industry: _industry, website: _website, logo: _logo};
		
		database.addBusiness(newBiz).then(function(callback) {
			if (callback.statusText === "OK") {
				$state.go("home");
				console.log("New business added!");
			} else {
				console.log("Something went wrong.");
			}		
		});
	}
	
}])

.controller('editController', ['$scope', '$state', '$stateParams', 'database', function($scope, $state, $stateParams, database) {

	database.findBusiness().then(function(callback) {
		if (callback.statusText === "OK") {
			$scope.business = callback.data;
			$scope.name = $scope.business[$scope.biz].name;
			$scope.industry = $scope.business[$scope.biz].industry;
			$scope.website = $scope.business[$scope.biz].website;
			$scope.logo = $scope.business[$scope.biz].logo;
			console.log("Business fetched!");
		} else {
			console.log("Something went wrong.");
		}
	});

	$scope.biz = $stateParams.biz;

	$scope.editBiz = function(_name, _industry, _website, _logo) {

		var bizName = $scope.business[$scope.biz].name;
		var updatedBiz = {name: _name, industry: _industry, website: _website, logo: _logo};
		
		database.editBusiness(bizName, updatedBiz).then(function(callback) {
			if (callback.statusText === "OK") {
				$state.go("home");
				console.log("Business updated!");
			} else {
				console.log("Something went wrong.");
			}		
		});
	}
	
}]);