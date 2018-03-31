var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider)
{
    $routeProvider.when("/", {
        templateUrl : "templates/home.html",
        controller : "homeCtrl"
    })
    .when("/login", {
        templateUrl : "templates/login.html",
        controller : "loginCtrl"
    })
    .when("/profile", {
    	templateUrl: "templates/profile.html",
    	controller: "profileCtrl"
    })
    .otherwise({ redirectTo : "/" });
})

app.controller('homeCtrl', ['$scope', function($scope)
{
	$scope.saludo = "Hola desde la home";	
}]);

app.controller('loginCtrl', ['$scope', 'loginService', function($scope, loginService)
{
	$scope.login = function(user)
	{
		loginService.login($scope.user, function(response) {
            if(response.success) {
                Auth.SetCredentials($scope.user.username, $scope.user.password);
                $location.path('/');
            } else {
                $scope.error = response.message;
            }
        });
	}
}]);

app.controller('profileCtrl', ['$scope', function($scope)
{
	$scope.saludo = "Hola desde profile";	
}]);

app.service('loginService', ['$http', function($http)
{
    var service = {};
 
    service.login = function (user, callback) {
        debugger;
        $http.post('/api/authenticate', user)
                .success(function (response) {
                callback(response);
            });

    };
    return service;
}]);