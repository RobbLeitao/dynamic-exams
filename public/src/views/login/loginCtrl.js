angular.module("app")
    .controller('loginCtrl', [
        'loginService', 
        '$window',
        function(loginService, $window) {
            var vm = this;

            vm.login = function(user) {
                loginService.login(user).then(function(response) {
                    if(response.status === 200){
                        sessionStorage.setItem('UserName', response.data.UserName);
                        sessionStorage.setItem('Mail', response.data.Mail);
                        sessionStorage.setItem('IsAdmin', response.data.IsAdmin);

                        $window.location.href = '/';
                    }
                    else if(response.status === 404){
                        console.log('ERRO');
                    }
                }, function (error) {
                    console.log('ERROR: ', error);
                    console.error('Code: ', error.status, ' - Message: ', error.data);
                    vm.error = error.data
                });
            };
        }
    ]);