(function(){
    angular
        .module("eMarketApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            //var promise = UserService.findUserByCredentials(username, password);
            var promise = UserService.login(username, password);
            promise
                .success(function(user) {
                    if(user) {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.error = "Something went wrong!";
                    }
                })
                .error(function(error) {
                    vm.error = "Username or Password is incorrect";
                });
        }
    }
})();