angular.module('controller')
	.controller('module3Ctr', ['$scope', '$rootScope', '$http',  function($scope, $rootScope, $http) {
		var vm = $scope.vm = {};
		$rootScope.pageName = 'module3';
	}]);