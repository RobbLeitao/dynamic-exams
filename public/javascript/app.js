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
    .otherwise({ redirectTo : "/login" });
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
                console.log("Hola");
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
        $http.post('/api/authenticate', user);
    };

    service.SetCredentials = function (username, password) {
        var authdata = Base64.encode(username + ':' + password);
        debugger;
        $rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata
            }
        }
    };

    return service;
}]);