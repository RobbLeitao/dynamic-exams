var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider)
{
    $routeProvider.when("/", {
        templateUrl : "templates/home.html",
        controller : "homeCtrl"
    })
    .when("/login", {
        templateUrl : "templates/login.html",
        controller : "loginCtrl",
        controllerAs: 'ctrl',
        bindToController: true
    })
    .when("/profile", {
    	templateUrl: "templates/profile.html",
    	controller: "profileCtrl"
    })
    .otherwise({ redirectTo : "/login" });
})

//Controllers
app.controller('homeCtrl', ['$scope', function($scope)
{
	$scope.saludo = "Hola desde la home";	
}]);

app.controller('loginCtrl', [
    'loginService', 
    function(loginService) {
        var vm = this;

        vm.login = function(user) {
            loginService.login(user).then(function(response) {
                console.log("Hola");
            }, function (error) {
                console.error('Code: ', error.status, ' - Message: ', error.statusText);
            });
        };
    }
]);

app.controller('profileCtrl', ['$scope', function($scope)
{
	$scope.saludo = "Hola desde profile";	
}]);

//Services
app.service('loginService', [
    '$http', 
    '$q', 
    function ($http, $q) {
        var vm = this;
        
        vm.login = function (user, callback) {
            var deferred = $q.defer();    

            $http.post('/api/authenticate', user)
                .then(function(res){
                    deferred.resolve(res.data.result);
                }, function(error) {
                    deferred.reject(error);
                });
            
            return deferred.promise;
        };

        vm.SetCredentials = function (username, password) {
            var authdata = Base64.encode(username + ':' + password);
            debugger;
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            }
        };

        return vm;
    }
]);