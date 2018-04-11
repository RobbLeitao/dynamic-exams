angular.module("app")
    .run(function ($rootScope, $location) {  
        $rootScope.$on("$locationChangeStart", function (event, next, current) {  
            var user = sessionStorage.getItem("UserName");
            if (!user) {    
                $location.path("/login");  
            } 
            else if(user && window.location.hash == "#!/login"){
                $location.path("/");
            }
        });  
    });