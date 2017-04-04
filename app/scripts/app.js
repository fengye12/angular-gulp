'use strict';
var app = angular.module('app', [
	'ui.router',
	'controller',
	'directive',
	'services',
	'templates'
]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider
	.otherwise(function(inject, location) {
		var path = location.$$path || "";
		return '/index';
	})
	$stateProvider.state('index', {
			url: "/index",
			controller: "indexCtr",
			templateUrl: 'components/index/index.html'
	}).state('module2', {
			url: "/module2",
			controller: "module2Ctr",
			templateUrl: 'components/module2/module2.html'
	}).state('module3', {
			url: "/module3",
			controller: "module3Ctr",
			templateUrl: 'components/module3/module3.html'
	}).state('secondBtn', {
			url: "/secondBtn",
			controller: "secondBtnCtrl",
			templateUrl: 'components/secondBtn/secondBtn.html'
	})

}]).run(['$rootScope', '$state', function(rootScope, state) {
	//初始化
}]);

angular.module('controller', []);
angular.module('directive', []);
angular.module('services', []);
angular.module('templates', []);