/**
 * Created by sandarshsrivastav on 16/10/16.
 */
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
            var user = UserService.findUserByCredentials(username,password);
            if (user){
                $location.url("/user/" + user._id);
            }
            else{
                vm.error = "Username or password incorrect";
            }
        }
    }

    function RegisterController($location,UserService){
        var vm = this;
        vm.register = register;

        function register(username, password1, password2){
            if(password1 === password2){
                var exists = UserService.findUserByUsername(username);
                //console.log(exists);
                if(exists === null) {
                    var entry = {_id: "111", username: username, password: password1,};
                    UserService.createUser(entry);
                    $location.url("/user/111");
                }
                else{
                    vm.error = "User already exists";
                }
            }
            else{
                vm.error = "Passwords do not match";
            }
        }
    }

    function ProfileController($routeParams, UserService){
        var vm = this;
        var id = $routeParams.uid;
        vm.updateUser = updateUser;
        //console.log("Id is: " + id);
        var user = UserService.findUserById(id);
        vm.user = user;
        //console.log(user);
        if(user!= null) {
            vm.id = user._id;
            vm.username = user.username;
            vm.firstname = user.firstName;
            vm.lastname = user.lastName;
            vm.email = user.email;
        }
        else{
            vm.error = "User not found";
        }
        function updateUser(id, username, email, firstname, lastname){
            var user = UserService.findUserById(id);
            user.username = username;
            user.email = email;
            user.firstName = firstname;
            user.lastName = lastname;
            //console.log(user);
            UserService.updateUser(id, user);
        }


    }
})();