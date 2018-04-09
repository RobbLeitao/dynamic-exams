angular.module("app")
    .controller('homeCtrl', [
        '$window',
        function ($window) {
            var vm = this;
            vm.saludo = sessionStorage.UserName;


            vm.toggleAction = function(dropped){
                vm.actionsDropped = dropped;
            }

            vm.isAdmin = true; //true lo muestra -> false no lo muestra
            //Esto lo saco de algun lado


            vm.logout = function(){
                sessionStorage.clear();
                $window.location.href = '#!/login';
            }
        }
    ]);