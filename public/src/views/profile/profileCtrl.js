angular.module("app")
    .controller('profileCtrl', [
        function () {
            var vm = this;
            vm.saludo = "Hola desde profile";	
        }
    ]);