angular.module("app")
    .controller('homeCtrl', [
        function () {
            var vm = this;
            vm.saludo = sessionStorage.UserName;
        }
    ]);