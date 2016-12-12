/**
 * Created by sandarshsrivastav on 09/11/16.
 */
(function(){
    angular
        .module("MyGarageSale")
        .config(conf);

    function conf($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl : '/project/views/user/landing.view.client.html',
                //controller : "LandingController",
                // controllerAs : "model"
            })
            .when('/user/:username',{
                templateUrl : '/project/views/user/home.view.client.html',
                //controller : "LandingController",
                //controllerAs : "model"
            })
            .when('/login',{
                templateUrl : '/project/views/user/login.view.client.html',
                //controller : "LandingController",
                //controllerAs : "model"
            })
            .when('/user/:username/profile',{
                templateUrl : '/project/views/user/profile.view.client.html',
                //controller : "LandingController",
                //controllerAs : "model"
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();
