angular.module("app")
    .controller('loginCtrl', [
        'loginService', 
        '$window',
        function(loginService, $window) {
            var vm = this;

            vm.login = function(user) {
                loginService.login(user).then(function(response) {
                    console.log("Hola: ", response.data);
                    if(response.status === 200){
                        sessionStorage.setItem('UserName', response.data.UserName);
                        sessionStorage.setItem('Mail', response.data.Mail);

                        $window.location.href = '/';
                    }
                    else if(response.status === 404){
                        console.log('ERRO');
                    }
                }, function (error) {
                    console.error('Code: ', error.status, ' - Message: ', error.statusText);
                });
            };
        }
    ]);