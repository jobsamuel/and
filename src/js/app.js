angular.module('and', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state('home', {url: '/', templateUrl: 'views/home.html', controller: 'mainController'})

		.state('add', {url: '/add', templateUrl: 'views/add.html', controller: 'addController'})

		.state('business', {url: '/:biz', templateUrl: 'views/business.html', controller: 'mainController'});

	$urlRouterProvider.otherwise('/');

}])

.controller('mainController', ['$rootScope', '$scope', '$stateParams', function($rootScope, $scope, $stateParams) {

	$scope.business = [
		{name: "Facebook", type: "Internet", logo: "https://www.facebook.com/images/fb_icon_325x325.png"},
		{name: "Tesla", type: "Automotive", logo: "http://www.unitonenine.com/assets/images/clients/client-logos-tesla.png"},
		{name: "Samsung", type: "Consumer Electronics", logo: "http://2.bp.blogspot.com/-ur_gt6HXO0A/T3Cgkyz2gtI/AAAAAAAABI8/wABdxgpIYuY/s400/samsung.png"},
		{name: "Apple", type: "Computers", logo: "http://www.logoeps.com/wp-content/uploads/2012/12/apple-classic-logo-vector.png"},
		{name: "Square", type: "Payments", logo: "https://merchantplus-dinkuminteractiv.netdna-ssl.com/wp-content/uploads/2014/04/Square-logo.png"}
	];

	$scope.biz = $stateParams.biz;

}])

.controller('addController', ['$rootScope', '$scope', function($rootScope, $scope) {

	$scope.addNew = function(_name, _type, _logo) {

		var newBiz = {name: _name, type: _type, logo: _logo};
		
		// TODO
	}
	
}]);