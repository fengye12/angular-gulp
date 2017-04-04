angular.module('controller')
	.controller('indexCtr', ['$scope', '$rootScope', '$http',  function($scope, $rootScope, $http) {
		var vm = $scope.vm = {};
		$rootScope.pageName = 'index';
	}]);