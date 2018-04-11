angular.module("app")
    .controller('homeCtrl', [
        '$window',
        function ($window) {
            var vm = this;
            vm.saludo = sessionStorage.UserName;


            vm.toggleAction = function(dropped){
                vm.actionsDropped = dropped;
            }

            vm.isAdmin = sessionStorage.IsAdmin == 'false' ? false : true;

            vm.logout = function(){
                sessionStorage.clear();
                $window.location.href = '#!/login';
            }
        }
    ]);