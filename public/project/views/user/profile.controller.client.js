(function(){
    angular
        .module("eMarketApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;

        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;
        vm.following = "1";
        vm.followers = "2";
        vm.cart = "1";
        vm.history = "2";

        function init() {
            UserService
                //.findUserById(userId)
                .findCurrentUser()
                .success(function(user) {
                    if(user != "0") {
                        vm.user = user;
                        vm.uid = user._id;
                        vm.followersNum = user.followers.length;
                        vm.followingNum = user.following.length;
                        vm.cartNum = user.itemCart.length;
                    }
                })
                .error(function(error) {
                });
        }
        init();

        function logout() {
            UserService
                .logout()
                .success(
                    function () {
                        $location.url("/login");
                    }
                )
                .error(function () {
                });
        }

        function updateUser() {
            UserService
                .updateUser(vm.user, vm.user._id);
        }

        function unregisterUser() {
            UserService
                .unregisterUser(vm.user._id)
                .success(function() {
                    $location.url("/login")
                })
                .error(function(error) {
                });
        }
    }
})();