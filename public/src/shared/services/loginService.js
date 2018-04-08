angular.module("app")
    .service('loginService', [
        '$http', 
        '$q', 
        function ($http, $q) {
            var vm = this;
            
            vm.login = function (user, callback) {
                var deferred = $q.defer();    

                $http.post('/api/authenticate', user)
                    .then(function(res){
                        deferred.resolve(res);
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
    ]
);