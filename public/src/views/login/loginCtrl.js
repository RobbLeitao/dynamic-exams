angular.module("app")
    .controller('loginCtrl', [
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