angular.module("app")
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl : "src/views/home/home.html",
                    controller : "homeCtrl",
                    controllerAs: 'ctrl',
                    bindToController: true
                })
                .when("/login", {
                    templateUrl : "src/views/login/login.html",
                    controller : "loginCtrl",
                    controllerAs: 'ctrl',
                    bindToController: true
                })
                .when("/profile", {
                    templateUrl: "src/views/profile/profile.html",
                    controller: "profileCtrl",
                    controllerAs: 'ctrl',
                    bindToController: true
                })
                .otherwise({ redirectTo : "/login" });
        }
    ]);