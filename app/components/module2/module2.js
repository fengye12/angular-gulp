angular.module('controller')
	.controller('module2Ctr', ['$scope', '$rootScope', '$http',  function($scope, $rootScope, $http) {
		var vm = $scope.vm = {};
		$rootScope.pageName = 'module2';
	}]);