(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController)
        .controller("RegisterController",RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location,UserService){
        var vm = this;
        vm.login = login;

        function login(username,password) {
            // var promise = UserService.findUserByCredentials(username,password);
            console.log(username, password);
            var promise = UserService.login(username, password);
            promise
                .success(function(user){
                    if (user!="0"){
                        $location.url("/user/" + user._id);
                    }
                    else{
                        vm.error = "Username or password incorrect";
                    }

                })
                .error(function(){
                    vm.error = "404 not found"

                });
        }
    }

    function RegisterController($location,UserService){
        var vm = this;
        vm.register = register;

        function register(username, password1, password2){
            if(password1 === password2){
                var exists = UserService.findUserByUsername(username);
                exists
                    .success(function(user) {
                        if (user === "0") {
                            var entry = {username: username, password: password1};
                            var promise = UserService.createUser(entry);
                            promise
                                .success(function (user) {
                                    // console.log(user);
                                    $location.url("/user/" + user._id);
                                })
                                .error(function () {
                                    console.log("500 internal server error");
                                });

                        }
                        else {
                            vm.error = "User already exists";
                        }
                    })
                    .error(function(){
                        console.log("500 internal server error");
                    });
            }
            else{
                vm.error = "Passwords do not match";
            }
        }
    }

    function ProfileController($routeParams, UserService, $location){
        var vm = this;
        var id = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        // var promise = UserService.findUserById(id);
        var promise = UserService.findCurrentUser();
        promise
            .success(function(user){
                vm.user = user;
                //console.log(user);
                if(user!= "0") {
                    vm.id = user._id;
                    vm.username = user.username;
                    vm.firstname = user.firstName;
                    vm.lastname = user.lastName;
                    vm.email = user.email;
                }
                else{
                    vm.error = "User not found";
                }
            })
            .error(function(){
                vm.error = "404 not found";
            });






        function logout(){
            UserService
                .logout()
                .success(function(){
                    $location.url("/");
            })
        }

        function updateUser(){
            var user = vm.user;
            user.email = vm.email;
            user.firstName = vm.firstname;
            user.lastName = vm.lastname;
            console.log(user);
            var updatePromise = UserService.updateUser(user);
            updatePromise
                .success(function(id){
                    //$location.url("/user/"+ id);
                })
                .error(function(){
                    console.log("server error");
                });
        }

        function deleteUser(id){
            //console.log(id)
            var deletePromise = UserService.deleteUser(id);
            deletePromise
                .success(function(userId){
                })
                .error(function(userId){
                });
        }
    }
})();