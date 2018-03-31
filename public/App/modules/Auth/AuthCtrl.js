'use strict';
  
angular.module('Auth')
  
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'Auth',
    function ($scope, $rootScope, $location, AuthService) {
        // reset login status
        AuthService.ClearCredentials();
  
        $scope.login = function (user) {
            AuthService.Login($scope.user, function(response) {
                if(response.success) {
                    Auth.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                }
            });
        };
    }]);