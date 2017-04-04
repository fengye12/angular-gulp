angular.module('controller')
	.controller('firstBtnCtrl', ['$scope', '$rootScope', '$http',  function($scope, $rootScope, $http) {
        console.log($scope.vm)
		var vm = $scope.vm = {};
		$rootScope.pageName = 'index';
	}]);