(function (angular) {
	
	'use strict';
	
	angular
	.module('loyalty', [])
	.controller('main', main);
	
	main.$inject = ['$scope', '$http']
	function main ($scope, $http) {
		
		var restAPIPath = '/api/rest';
		
		//allow user to register
		$scope.nameToRegister = '';
		$scope.customer = {};
		
		$scope.register = function () {
			$http.post(restAPIPath + '/customer', {name: $scope.nameToRegister, globalId: '0123456'})
			.then(function (response) {
				$scope.customer._id = response.data._id;
				$scope.customer.name = response.data.name;
				
				$scope.getLoyalty();
			})
			.catch(function (err) {
				
			});
		}
		
		//spend money
		
		//how much to spend
		$scope.amount = 0;
		
		//whether expense is for a ride
		$scope.riding = true;
		
		$scope.spend = function () {
			$http.post(restAPIPath + '/expense', {customerId: $scope.customer._id, amount: $scope.amount, riding: $scope.riding})
			.then(function (response) {
				$scope.getLoyalty();
			})
			.catch(function (err) {
				
			});
		}
		
		//check loyalty status
		$scope.loyalty = {};
		
		$scope.getLoyalty = function () {
			$http.get(restAPIPath + '/customer/' + $scope.customer._id)
			.then(function (response) {
				$scope.customer = response.data.customer;
				$scope.nextStatus = response.data.nextStatus;
			})
			.catch(function (err) {
				
			});
			
			$scope.loyalty = data;
		}
	}
	
})(angular);