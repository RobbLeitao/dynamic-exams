angular.module("app")
    .controller('loginCtrl', [
        'loginService', 
        function(loginService) {
            var vm = this;

            vm.login = function(user) {
                loginService.login(user).then(function(response) {
                    console.log("Hola: ", response);
                    if(response.status === 200){
                        console.log("estamos bien, hay q ir a home y cargar la session")
                        //Aca!
                    }
                }, function (error) {
                    console.error('Code: ', error.status, ' - Message: ', error.statusText);
                });
            };
        }
    ]);