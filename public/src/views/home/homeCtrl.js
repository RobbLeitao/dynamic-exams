angular.module("app")
    .controller('homeCtrl', [
        '$window',
        function ($window) {
            var vm = this;
            vm.saludo = sessionStorage.UserName;

            vm.logout = function(){
                sessionStorage.clear();
                $window.location.href = '#!/login';
            }
        }
    ]);