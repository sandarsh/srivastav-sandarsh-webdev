(function(){
    angular
        .module("eMarketApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(newUser) {
            vm.error = null;
            vm.error2 = null;
            vm.error3 = null;
            //Also handle null condition here
                //i.e. if nthing is entered but register is pressed
            if (newUser.password != newUser.password2) {
                vm.error2 = "Passwords don't match!";
            }
            else {
                UserService
                    .findUsername(newUser.username)
                    .success(function(user) {
                        if (user != "0") {
                            vm.error = "Username already exists!";
                        }
                        else {
                            UserService
                                .createUser(newUser)
                                .success(function(user) {
                                    $location.url("/user/" + user._id);
                                })
                                .error(function(error) {
                                });
                        }
                    })
                    .error(function(error) {
                    });
            }

        }
    }
})();